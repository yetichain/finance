import { useTranslation } from 'react-i18next'

// const audit1_image='/images/audits/01_Certificate_Aliumswap.png'
const aliumswap = '/images/audits/01_Certificate_Aliumswap.png'
const securityAssesmentImage = '/images/audits/02_Certificate_Aliumswap.png'
const jun_cert1 = '/images/audits/1jun_cert.png'
const cert08 = '/images/audits/certificate_08.jpg'
const cert15 = '/images/audits/certificate_15.jpg'
const quilAuditsCert = '/images/audits/cyberscope.png'
const quillhashImage = '/images/audits/cyberscope_report.png'
const smartContract = '/images/audits/smart_contract_code.jpg'

export interface AuditType {
  id: number
  headline: string
  date: string
  distribution?: string
  gitHubCertificate?: string[]
  detailedReport?: string
  gitHubCerificatePDF?: string
  bscScan?: string
  headImg: string
  image: string
}

const useGetCardList = () => {
  const { t } = useTranslation()
  const audits = [
    {
      headline: t('YETI Finance Smart Contracts Audit'),
      date: 'Feb, 2023',
      gitHubCertificate: ['https://github.com/yetichain/yetichain/blob/main/contracts/yeti.sol'],
      detailedReport: 'https://github.com/yetichain/yetichain/blob/main/audit.pdf',
      image: quilAuditsCert,
      headImg: quillhashImage,
      distribution: 'cyberscope',
    },
  ].map((item, i) => ({ ...item, id: i })) as Array<AuditType>

  return {
    audits,
  }
}

export default useGetCardList
