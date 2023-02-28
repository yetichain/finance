import { StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { Contract, utils } from 'ethers'
import { logError } from 'utils/bridge/helpers'
import { NOT_ENOUGH_COLLECTED_SIGNATURES } from './message'

export const TOKENS_CLAIMED = 'Tokens already claimed'

export const fetchConfirmations = async (address: string, ethersProvider: Web3Provider) => {
  const abi = ['function requiredBlockConfirmations() view returns (uint256)']

  const ambContract = new Contract(address, abi, ethersProvider)
  const requiredConfirmations = await ambContract
    .requiredBlockConfirmations()
    .catch((blockConfirmationsError) => logError({ blockConfirmationsError }))
  return parseInt(requiredConfirmations, 10)
}

export const fetchAmbVersion = async (address: string, ethersProvider: StaticJsonRpcProvider) => {
  if (!ethersProvider) {
    return { major: 0, minor: 0, patch: 0 }
  }
  const abi = ['function getBridgeInterfacesVersion() external pure returns (uint64, uint64, uint64)']
  const ambContract = new Contract(address, abi, ethersProvider)
  const ambVersion = await ambContract.getBridgeInterfacesVersion().catch((versionError) => logError({ versionError }))
  return ambVersion.map((v) => v.toNumber()).join('.')
}

function strip0x(input: string) {
  return input.replace(/^0x/, '')
}

function signatureToVRS(rawSignature) {
  const signature = strip0x(rawSignature)
  const v = signature.substr(64 * 2)
  const r = signature.substr(0, 32 * 2)
  const s = signature.substr(32 * 2, 32 * 2)
  return { v, r, s }
}

function packSignatures(array) {
  const length = strip0x(utils.hexValue(array.length))
  const msgLength = length.length === 1 ? `0${length}` : length
  let v = ''
  let r = ''
  let s = ''
  array.forEach((e) => {
    v = v.concat(e.v)
    r = r.concat(e.r)
    s = s.concat(e.s)
  })
  return `0x${msgLength}${v}${r}${s}`
}

const REVERT_ERROR_CODES = ['-32000', '-32016', 'UNPREDICTABLE_GAS_LIMIT', 'CALL_EXCEPTION']
interface RevertedError extends Error {
  code?: string
  error?: {
    code?: string
  }
}
export const isRevertedError = (error: RevertedError) =>
  REVERT_ERROR_CODES.includes(error?.code && error?.code.toString()) ||
  REVERT_ERROR_CODES.includes(error?.error?.code && error?.error?.code.toString())

export const executeSignatures = async (
  ethersProvider: Web3Provider,
  address: string,
  version: string,
  { messageData, signatures },
) => {
  const abi = [
    'function executeSignatures(bytes messageData, bytes signatures) external',
    'function safeExecuteSignaturesWithAutoGasLimit(bytes _data, bytes _signatures) external',
  ]
  const ambContract = new Contract(address, abi, ethersProvider.getSigner())

  let executeSignaturesFunc = ambContract.executeSignatures
  if (version > '5.6.0') {
    executeSignaturesFunc = ambContract.safeExecuteSignaturesWithAutoGasLimit
  }

  if (!signatures || signatures.length === 0) {
    throw new Error(NOT_ENOUGH_COLLECTED_SIGNATURES)
  }

  try {
    const signs = packSignatures(signatures.map((s) => signatureToVRS(s)))
    const tx = await executeSignaturesFunc(messageData, signs)
    return tx
  } catch (error) {
    if (isRevertedError(error)) {
      throw new Error(TOKENS_CLAIMED)
    } else {
      throw error
    }
  }
}
