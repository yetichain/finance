import { ChainId } from '@alium-official/sdk'

export interface INetworkTokensLPMigrationVampiringItem {
  tokenA: { symbol: string; address: string }
  tokenB: { symbol: string; address: string }
  tokenLP: { address: string }
  exchange:
    | 'Uniswap'
    | 'Sushiswap'
    | 'Pancakeswap'
    | 'Quickswap'
    | 'Dfyn Exchange'
    | 'MDEX'
    | 'Biswap'
    | 'Bakeryswap'
    | 'Pantherswap'
    | 'Ape'
    | 'Honey'
    | 'FireBird'
    | 'Polycat'
}

const BSC_CAKE = { symbol: 'cake', address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82' }
const BSC_WBNB = { symbol: 'wbnb', address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' }
const BSC_USDT = { symbol: 'usdt', address: '0x55d398326f99059ff775485246999027b3197955' }
const BSC_ETH = { symbol: 'eth', address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8' }
const BSC_USDC = { symbol: 'usdc', address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d' }
const BSC_BTCB = { symbol: 'btcb', address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c' }
const BSC_BUSD = { symbol: 'busd', address: '0xe9e7cea3dedca5984780bafc599bd69add087d56' }

// prettier-ignore
const BSC: INetworkTokensLPMigrationVampiringItem[] = [
  // Bakeryswap
  { tokenA: BSC_CAKE, tokenB: BSC_WBNB, tokenLP: { address: '0x65E9CfDBC579856B6354d369AFBFbA2B2a3C7856' }, exchange: 'Bakeryswap' },
  { tokenA: BSC_WBNB, tokenB: BSC_BUSD, tokenLP: { address: '0x559e3D9611E9cB8a77c11335Bdac49621382188B' }, exchange: 'Bakeryswap' },
  { tokenA: BSC_USDT, tokenB: BSC_BUSD, tokenLP: { address: '0xbcF3278098417E23d941613ce36a7cE9428724A5' }, exchange: 'Bakeryswap' },
  { tokenA: BSC_USDT, tokenB: BSC_WBNB, tokenLP: { address: '0x9Ec271C041a18aA7beF070A1F196eea1D06Ab7cb' }, exchange: 'Bakeryswap' },
  { tokenA: BSC_ETH, tokenB: BSC_WBNB, tokenLP: { address: '0xa50b9c5DB61C855D5939aa1a66B26Df77745809b' }, exchange: 'Bakeryswap' },
  { tokenA: BSC_USDC, tokenB: BSC_BUSD, tokenLP: { address: '0x56CDE265aaD310e623C8f8994a5143582659aBfC' }, exchange: 'Bakeryswap' },
  // { tokenA: BSC_ETH, tokenB: BSC_BTCB, tokenLP: { address: '-' }, exchange: 'Bakeryswap' },
  // { tokenA: BSC_BTCB, tokenB: BSC_BUSD, tokenLP: { address: '-' }, exchange: 'Bakeryswap' },
  { tokenA: BSC_BTCB, tokenB: BSC_WBNB, tokenLP: { address: '0x58521373474810915b02FE968D1BCBe35Fc61E09' }, exchange: 'Bakeryswap' },
  { tokenA: BSC_USDT, tokenB: BSC_USDC, tokenLP: { address: '0x087a49F79CAB8cc13F8A44f9d6E0B2487a9D28e3' }, exchange: 'Bakeryswap' },		
  // Pancakeswap
  { tokenA: BSC_CAKE, tokenB: BSC_WBNB, tokenLP: { address: '0x0ed7e52944161450477ee417de9cd3a859b14fd0' }, exchange: 'Pancakeswap' },
  { tokenA: BSC_WBNB, tokenB: BSC_BUSD, tokenLP: { address: '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16' }, exchange: 'Pancakeswap' },
  { tokenA: BSC_USDT, tokenB: BSC_BUSD, tokenLP: { address: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00' }, exchange: 'Pancakeswap' },
  { tokenA: BSC_USDT, tokenB: BSC_WBNB, tokenLP: { address: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE' }, exchange: 'Pancakeswap' },
  { tokenA: BSC_ETH, tokenB: BSC_WBNB, tokenLP: { address: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc' }, exchange: 'Pancakeswap' },
  { tokenA: BSC_USDC, tokenB: BSC_BUSD, tokenLP: { address: '0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1' }, exchange: 'Pancakeswap' },
  { tokenA: BSC_ETH, tokenB: BSC_BTCB, tokenLP: { address: '0xD171B26E4484402de70e3Ea256bE5A2630d7e88D' }, exchange: 'Pancakeswap' },
  { tokenA: BSC_BTCB, tokenB: BSC_BUSD, tokenLP: { address: '0xF45cd219aEF8618A92BAa7aD848364a158a24F33' }, exchange: 'Pancakeswap' },
  { tokenA: BSC_BTCB, tokenB: BSC_WBNB, tokenLP: { address: '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082' }, exchange: 'Pancakeswap' },
  { tokenA: BSC_USDT, tokenB: BSC_USDC, tokenLP: { address: '0xEc6557348085Aa57C72514D67070dC863C0a5A8c' }, exchange: 'Pancakeswap' },
  // Biswap
  { tokenA: BSC_CAKE, tokenB: BSC_WBNB, tokenLP: { address: '0x3d94d03eb9ea2D4726886aB8Ac9fc0F18355Fd13' }, exchange: 'Biswap' },
  { tokenA: BSC_WBNB, tokenB: BSC_BUSD, tokenLP: { address: '0xaCAac9311b0096E04Dfe96b6D87dec867d3883Dc' }, exchange: 'Biswap' },
  { tokenA: BSC_USDT, tokenB: BSC_BUSD, tokenLP: { address: '0xDA8ceb724A06819c0A5cDb4304ea0cB27F8304cF' }, exchange: 'Biswap' },
  { tokenA: BSC_USDT, tokenB: BSC_WBNB, tokenLP: { address: '0x8840C6252e2e86e545deFb6da98B2a0E26d8C1BA' }, exchange: 'Biswap' },
  { tokenA: BSC_ETH, tokenB: BSC_WBNB, tokenLP: { address: '0x5bf6941f029424674bb93A43b79fc46bF4A67c21' }, exchange: 'Biswap' },
  { tokenA: BSC_USDC, tokenB: BSC_BUSD, tokenLP: { address: '0x6f2829B3061211C24a34583647e222f72Ff2e962' }, exchange: 'Biswap' },
  { tokenA: BSC_ETH, tokenB: BSC_BTCB, tokenLP: { address: '0x6216E04cd40DB2c6FBEd64f1B5830A98D3A91740' }, exchange: 'Biswap' },
  { tokenA: BSC_BTCB, tokenB: BSC_BUSD, tokenLP: { address: '0x15B868fB4b0358F26ACfdb11f20309593bf2fE72' }, exchange: 'Biswap' },
  { tokenA: BSC_BTCB, tokenB: BSC_WBNB, tokenLP: { address: '0xC7e9d76ba11099AF3F330ff829c5F442d571e057' }, exchange: 'Biswap' },
  { tokenA: BSC_USDT, tokenB: BSC_USDC, tokenLP: { address: '0x1483767E665B3591677Fd49F724bf7430C18Bf83' }, exchange: 'Biswap' },
  // MDEX
  { tokenA: BSC_CAKE, tokenB: BSC_WBNB, tokenLP: { address: '0xA13aFe2DF0fA0bb11F2aeAAAF98aC1D591E108d1' }, exchange: 'MDEX' },
  { tokenA: BSC_WBNB, tokenB: BSC_BUSD, tokenLP: { address: '0x340192D37d95fB609874B1db6145ED26d1e47744' }, exchange: 'MDEX' },
  { tokenA: BSC_USDT, tokenB: BSC_BUSD, tokenLP: { address: '0x62c1dEC1fF328DCdC157Ae0068Bb21aF3967aCd9' }, exchange: 'MDEX' },
  { tokenA: BSC_USDT, tokenB: BSC_WBNB, tokenLP: { address: '0x09CB618bf5eF305FadfD2C8fc0C26EeCf8c6D5fd' }, exchange: 'MDEX' },
  { tokenA: BSC_ETH, tokenB: BSC_WBNB, tokenLP: { address: '0x82E8F9e7624fA038DfF4a39960F5197A43fa76aa' }, exchange: 'MDEX' },
  { tokenA: BSC_USDC, tokenB: BSC_BUSD, tokenLP: { address: '0x2045c12aa02b7551E430a1fE47b4b795Bf84e72F' }, exchange: 'MDEX' },
  { tokenA: BSC_ETH, tokenB: BSC_BTCB, tokenLP: { address: '0x577d005912C49B1679B4c21E334FdB650E92C077' }, exchange: 'MDEX' },
  { tokenA: BSC_BTCB, tokenB: BSC_BUSD, tokenLP: { address: '0x4fb8253432FB3e92109c91E3Ff2b85FfA0f6A1F4' }, exchange: 'MDEX' },
  { tokenA: BSC_BTCB, tokenB: BSC_WBNB, tokenLP: { address: '0x969f2556F786a576F32AeF6c1D6618f0221Ec70e' }, exchange: 'MDEX' },
  { tokenA: BSC_USDT, tokenB: BSC_USDC, tokenLP: { address: '0x9f4Da89774570E27170873BefD139a79CB1A3da2' }, exchange: 'MDEX' },
  // Pantherswap
  { tokenA: BSC_CAKE, tokenB: BSC_WBNB, tokenLP: { address: '0xBe63F8cdcF2c7CC509EBb18742d3866F0C3bc2b4' }, exchange: 'Pantherswap' },
  { tokenA: BSC_WBNB, tokenB: BSC_BUSD, tokenLP: { address: '0x6AF4C4433474B2F8BA385AD62B23299c82846783' }, exchange: 'Pantherswap' },
  { tokenA: BSC_USDT, tokenB: BSC_BUSD, tokenLP: { address: '0x7EC7702d1e65C84470720563175A20c2fc03a72d' }, exchange: 'Pantherswap' },
  { tokenA: BSC_USDT, tokenB: BSC_WBNB, tokenLP: { address: '0x26782a2669d32bE87C892AdA10Aa630d0834B3c4' }, exchange: 'Pantherswap' },
  { tokenA: BSC_ETH, tokenB: BSC_WBNB, tokenLP: { address: '0x542B077f6a06b488A31B8C8b31E456F2B3984989' }, exchange: 'Pantherswap' },
  { tokenA: BSC_USDC, tokenB: BSC_BUSD, tokenLP: { address: '0x9C58fdabd7E41E1A2bfC5b7b8b8B6fF248D8aa66' }, exchange: 'Pantherswap' },
  // { tokenA: BSC_ETH, tokenB: BSC_BTCB, tokenLP: { address: '-' }, exchange: 'Pantherswap' },
  { tokenA: BSC_BTCB, tokenB: BSC_BUSD, tokenLP: { address: '0x1ffd9f2190B82537E4e0e0C5AC55588e24485889' }, exchange: 'Pantherswap' },
  { tokenA: BSC_BTCB, tokenB: BSC_WBNB, tokenLP: { address: '0x9E78cEa62cD4DF80520912A137C0778Fe8a34186' }, exchange: 'Pantherswap' },
  { tokenA: BSC_USDT, tokenB: BSC_USDC, tokenLP: { address: '0xb69C2518b9c4433f82EEa0D61bCE97875575BE22' }, exchange: 'Pantherswap' },
  // Ape
  { tokenA: BSC_CAKE, tokenB: BSC_WBNB, tokenLP: { address: '0x60593Abea55e9Ea9d31c1b6473191cD2475a720D' }, exchange: 'Ape' },
  { tokenA: BSC_WBNB, tokenB: BSC_BUSD, tokenLP: { address: '0x51e6D27FA57373d8d4C256231241053a70Cb1d93' }, exchange: 'Ape' },
  { tokenA: BSC_USDT, tokenB: BSC_BUSD, tokenLP: { address: '0x2e707261d086687470B515B320478Eb1C88D49bb' }, exchange: 'Ape' },
  { tokenA: BSC_USDT, tokenB: BSC_WBNB, tokenLP: { address: '0x83C5b5b309EE8E232Fe9dB217d394e262a71bCC0' }, exchange: 'Ape' },
  { tokenA: BSC_ETH, tokenB: BSC_WBNB, tokenLP: { address: '0xA0C3Ef24414ED9C9B456740128d8E63D016A9e11' }, exchange: 'Ape' },
  { tokenA: BSC_USDC, tokenB: BSC_BUSD, tokenLP: { address: '0xC087C78AbaC4A0E900a327444193dBF9BA69058E' }, exchange: 'Ape' },
  { tokenA: BSC_ETH, tokenB: BSC_BTCB, tokenLP: { address: '0xc6EA23E8aDAf03E700be3AA50bE30ECd39B7bF49' }, exchange: 'Ape' },
  { tokenA: BSC_BTCB, tokenB: BSC_BUSD, tokenLP: { address: '0xd296aF3aeF3aB6C599065e7c0b564C176bF0816C' }, exchange: 'Ape' },
  { tokenA: BSC_BTCB, tokenB: BSC_WBNB, tokenLP: { address: '0x1E1aFE9D9c5f290d8F6996dDB190bd111908A43D' }, exchange: 'Ape' },
  { tokenA: BSC_USDT, tokenB: BSC_USDC, tokenLP: { address: '0xcd1e0B85B72EA3Ecdf8A4B79c7bf9bCFf5113829' }, exchange: 'Ape' },
]

// prettier-ignore
const BSC_TESTNET: INetworkTokensLPMigrationVampiringItem[] = [
  { tokenA: { symbol: 'eth'   , address: '0xC5482471187240f38F71CeB8f9AFC2156A0d8f15' }, tokenB: { symbol: 'usdt'       , address: '0x76130226b1411Ca5511Ff3e58ea81Ec8Bb234C7A' }, tokenLP: { address: '0x9cfd6f19c06880e38c4fc6cb2c1d3af54c88372b' }, exchange: 'Pancakeswap' },
  { tokenA: { symbol: 'eth'   , address: '0xC5482471187240f38F71CeB8f9AFC2156A0d8f15' }, tokenB: { symbol: 'usdt'       , address: '0x76130226b1411Ca5511Ff3e58ea81Ec8Bb234C7A' }, tokenLP: { address: '0x17e0f07be0fe740408a5780d5aac636a2868896f' }, exchange: 'Biswap' },
  { tokenA: { symbol: 'eth'   , address: '0xC5482471187240f38F71CeB8f9AFC2156A0d8f15' }, tokenB: { symbol: 'usdt'       , address: '0x76130226b1411Ca5511Ff3e58ea81Ec8Bb234C7A' }, tokenLP: { address: '0x7f222F999e39F85079732D728034F93F3a5757a4' }, exchange: 'Uniswap' },
]

// prettier-ignore
const HECO: INetworkTokensLPMigrationVampiringItem[] = [
  { tokenA: { symbol: 'WHT'   , address: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f' }, tokenB: { symbol: 'usdc'    , address: '0x9362bbef4b8313a8aa9f0c9808b80577aa26b73b' }, tokenLP: { address: '0x85c5316C7C7D88dA9337fCcdEEF4A9891fCD5e6F' }, exchange: 'MDEX' },
  { tokenA: { symbol: 'USDC'  , address: '0x9362bbef4b8313a8aa9f0c9808b80577aa26b73b' }, tokenB: { symbol: 'usdt'    , address: '0xa71edc38d189767582c38a3145b5873052c3e47a' }, tokenLP: { address: '0xf37DE9f4E1a0A58F839DbA868e76B5779109c2a4' }, exchange: 'MDEX' },
  { tokenA: { symbol: 'WHT'   , address: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f' }, tokenB: { symbol: 'weth'    , address: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd' }, tokenLP: { address: '0x53E458aD1CFEB9582736db6BdE9aF89948e3bc3d' }, exchange: 'MDEX' },
  { tokenA: { symbol: 'USDC'  , address: '0x9362bbef4b8313a8aa9f0c9808b80577aa26b73b' }, tokenB: { symbol: 'dai'     , address: '0x3d760a45d0887dfd89a2f5385a236b29cb46ed2a' }, tokenLP: { address: '0x2d6884276dAD0d20755Df8857eBfBb30726488ee' }, exchange: 'MDEX' },
  { tokenA: { symbol: 'WHT'   , address: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f' }, tokenB: { symbol: 'usdt'    , address: '0xa71edc38d189767582c38a3145b5873052c3e47a' }, tokenLP: { address: '0x499B6E03749B4bAF95F9E70EeD5355b138EA6C31' }, exchange: 'MDEX' },
]

// prettier-ignore
const ETHER: INetworkTokensLPMigrationVampiringItem[] = [
  { tokenA: { symbol: 'usdc'  , address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }, tokenB: {	symbol: 'eth'    , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'usdc'  , address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }, tokenB: {	symbol: 'usdt'   , address: '0xdac17f958d2ee523a2206206994597c13d831ec7' }, tokenLP: { address: '0x3041CbD36888bECc7bbCBc0045E3B1f144466f5f' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'wbtc'  , address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' }, tokenB: {	symbol: 'eth'    , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xBb2b8038a1640196FbE3e38816F3e67Cba72D940' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'dai'   , address: '0x6b175474e89094c44da98b954eedeac495271d0f' }, tokenB: {	symbol: 'usdc'   , address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }, tokenLP: { address: '0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'eth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenB: {	symbol: 'usdt'   , address: '0xdac17f958d2ee523a2206206994597c13d831ec7' }, tokenLP: { address: '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'usdc'  , address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }, tokenB: {	symbol: 'eth'    , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'uni'   , address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984' }, tokenB: {	symbol: 'eth'    , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xd3d2E2692501A5c9Ca623199D38826e513033a17' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'mkr'   , address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2' }, tokenB: {	symbol: 'eth'    , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xC2aDdA861F89bBB333c90c492cB837741916A225' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'wbtc'  , address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' }, tokenB: {	symbol: 'usdc'   , address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }, tokenLP: { address: '0x004375Dff511095CC5A197A54140a24eFEF3A416' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'dai'   , address: '0x6b175474e89094c44da98b954eedeac495271d0f' }, tokenB: {	symbol: 'usdt'   , address: '0xdac17f958d2ee523a2206206994597c13d831ec7' }, tokenLP: { address: '0xB20bd5D04BE54f870D5C0d3cA85d82b34B836405' }, exchange: 'Uniswap' },

  { tokenA: { symbol: 'wbtc'  , address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xCEfF51756c56CeFFCA006cD410B03FFC46dd3a58' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'usdc'  , address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0x397FF1542f962076d0BFE58eA045FfA2d347ACa0' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'sushi' , address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0x795065dCc9f64b5614C407a6EFDC400DA6221FB0' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'eth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenB: {	symbol: 'usdt'   , address: '0xdac17f958d2ee523a2206206994597c13d831ec7' }, tokenLP: { address: '0x06da0fd433C1A5d7a4faa01111c044910A184553' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'dai'   , address: '0x6b175474e89094c44da98b954eedeac495271d0f' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xC3D03e4F041Fd4cD388c549Ee2A29a9E5075882f' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'yfi'   , address: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0x088ee5007C98a9677165D78dD2109AE4a3D04d0C' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'aave'  , address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xD75EA151a61d06868E31F8988D28DFE5E9df57B4' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'link'  , address: '0x514910771af9ca656af840dff83e8264ecf986ca' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xC40D16476380e4037e6b1A2594cAF6a6cc8Da967' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'wbtc'  , address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' }, tokenB: {	symbol: 'ibbtc'  , address: '0xc4e15973e6ff2a35cc804c2cf9d2a1b817a8b40f' }, tokenLP: { address: '0x18d98D452072Ac2EB7b74ce3DB723374360539f1' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'mkr'   , address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xBa13afEcda9beB75De5c56BbAF696b880a5A50dD' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'sushi' , address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0x795065dCc9f64b5614C407a6EFDC400DA6221FB0' }, exchange: 'Sushiswap' },
]

const MATIC_USDC = { symbol: 'usdc', address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' }
const MATIC_MIMATIC = { symbol: 'mimatic', address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1' }
const MATIC_WETH = { symbol: 'weth', address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619' }
const MAITC_WBTC = { symbol: 'wbtc', address: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6' }
const MATIC_USDT = { symbol: 'usdt', address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f' }
const MATIC_WMATIC = { symbol: 'wmatic', address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' }
const MATIC_DAI = { symbol: 'dai', address: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063' }
const MATIC_LINK = { symbol: 'link', address: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39' }
const MATIC_AAVE = { symbol: 'aave', address: '0xd6df932a45c0f255f85145f286ea0b292b21c90b' }
// External
const MATIC_UNI = { symbol: 'uni', address: '0xb33eaad8d922b1083446dc23f610c2567fb5180f' }
const MATIC_FISH = { symbol: 'fish', address: '0x3a3df212b7aa91aa0402b9035b098891d276572b' }

// prettier-ignore
const MATIC: INetworkTokensLPMigrationVampiringItem[] = [
  // Honey______
  // { tokenA: MATIC_USDC, tokenB: MATIC_MIMATIC, tokenLP: { address: '-' }, exchange: 'Honey' },
  { tokenA: MATIC_USDC, tokenB: MATIC_WETH, tokenLP: { address: '0xD862dB749534d539713B2c392421Fe5a8e43E19E' }, exchange: 'Honey' },
  { tokenA: MAITC_WBTC, tokenB: MATIC_WETH, tokenLP: { address: '0x6D3842ab227A0436A6e8c459E93c74bD8c16fb34' }, exchange: 'Honey' },
  { tokenA: MATIC_USDC, tokenB: MATIC_USDT, tokenLP: { address: '0x3F24E142FBF05D16AB1cf79e6df3473f515b16E0' }, exchange: 'Honey' },
  { tokenA: MATIC_WMATIC, tokenB: MATIC_WETH, tokenLP: { address: '0xEAE495187472B8DB83cF9dC738ba3869FDe5b1D3' }, exchange: 'Honey' },
  { tokenA: MATIC_WETH, tokenB: MATIC_USDT, tokenLP: { address: '0x1013ba833071Fd8AcA8Bf2AC83E5515c5fB9E76F' }, exchange: 'Honey' },
  { tokenA: MATIC_USDC, tokenB: MATIC_DAI, tokenLP: { address: '0xE49fea624d480A5233b5dfC4969a27319873e6f0' }, exchange: 'Honey' },
  { tokenA: MATIC_WETH, tokenB: MATIC_AAVE, tokenLP: { address: '0x0c787944946d22922C9f41C477CC539700d35bB2' }, exchange: 'Honey' },
  { tokenA: MATIC_LINK, tokenB: MATIC_WETH, tokenLP: { address: '0xcF863d14b6C3551Cad42E4B7F0a2b4B6A72ce122' }, exchange: 'Honey' },
  { tokenA: MATIC_WMATIC, tokenB: MATIC_USDC, tokenLP: { address: '0x86b7249272fabb82Ef36550eF898Ea539225E7F0' }, exchange: 'Honey' },
  // FireBird_______
  // { tokenA: MATIC_USDC, tokenB: MATIC_MIMATIC, tokenLP: { address: '-' }, exchange: 'FireBird' },
  { tokenA: MATIC_USDC, tokenB: MATIC_WETH, tokenLP: { address: '0x39D736D2b254eE30796f43Ec665143010b558F82' }, exchange: 'FireBird' },
  { tokenA: MAITC_WBTC, tokenB: MATIC_WETH, tokenLP: { address: '0x10F525CFbCe668815Da5142460af0fCfb5163C81' }, exchange: 'FireBird' },
  // { tokenA: MATIC_USDC, tokenB: MATIC_USDT, tokenLP: { address: '-' }, exchange: 'FireBird' },
  { tokenA: MATIC_WMATIC, tokenB: MATIC_WETH, tokenLP: { address: '0x7887a048a2E5995CcFC3B1F2E9c23Ab2EcA40BCF' }, exchange: 'FireBird' },
  // { tokenA: MATIC_WETH, tokenB: MATIC_USDT, tokenLP: { address: '-' }, exchange: 'FireBird' },
  // { tokenA: MATIC_USDC, tokenB: MATIC_DAI, tokenLP: { address: '-' }, exchange: 'FireBird' },
  // { tokenA: MATIC_WETH, tokenB: MATIC_AAVE, tokenLP: { address: '-' }, exchange: 'FireBird' },
  // { tokenA: MATIC_LINK, tokenB: MATIC_WETH, tokenLP: { address: '-' }, exchange: 'FireBird' },
  { tokenA: MATIC_WMATIC, tokenB: MATIC_USDC, tokenLP: { address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' }, exchange: 'FireBird' },
  // Cat_____
  // { tokenA: MATIC_USDC, tokenB: MATIC_MIMATIC, tokenLP: { address: '-' }, exchange: 'Polycat' },
  { tokenA: MATIC_USDC, tokenB: MATIC_WETH, tokenLP: { address: '0x273c39ebd4e0c49f8Cc6E5A2B3c0e4ca355B5352' }, exchange: 'Polycat' },
  { tokenA: MAITC_WBTC, tokenB: MATIC_WETH, tokenLP: { address: '0xbbBd54c1CD649288d2e584917778eEccD8D8254d' }, exchange: 'Polycat' },
  { tokenA: MATIC_USDC, tokenB: MATIC_USDT, tokenLP: { address: '0x97B4f2797cC903D76F9b8ff41A94286F0B16198e' }, exchange: 'Polycat' },
  { tokenA: MATIC_WMATIC, tokenB: MATIC_WETH, tokenLP: { address: '0xC4e90AE0298E0e7BE0102Cce64089231e1E2D67C' }, exchange: 'Polycat' },
  // { tokenA: MATIC_WETH, tokenB: MATIC_USDT, tokenLP: { address: '-' }, exchange: 'Polycat' },
  { tokenA: MATIC_USDC, tokenB: MATIC_DAI, tokenLP: { address: '0xC8174d091c288FF78De98303c2973140Cbcf3B23' }, exchange: 'Polycat' },
  // { tokenA: MATIC_WETH, tokenB: MATIC_AAVE, tokenLP: { address: '-' }, exchange: 'Polycat' },
  // { tokenA: MATIC_LINK, tokenB: MATIC_WETH, tokenLP: { address: '-' }, exchange: 'Polycat' },
  { tokenA: MATIC_WMATIC, tokenB: MATIC_USDC, tokenLP: { address: '0x8A4CEb4DffA238539C5d62Ce424980e8fdb21EBc' }, exchange: 'Polycat' },
  // ----------------- Old config
  // Quickswap
  { tokenA: MATIC_USDC, tokenB: MATIC_MIMATIC, tokenLP: { address: '0x160532D2536175d65C03B97b0630A9802c274daD' }, exchange: 'Quickswap' },
  { tokenA: MATIC_USDC, tokenB: MATIC_WETH, tokenLP: { address: '0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d' }, exchange: 'Quickswap' },
  { tokenA: MAITC_WBTC, tokenB: MATIC_WETH, tokenLP: { address: '0xdC9232E2Df177d7a12FdFf6EcBAb114E2231198D' }, exchange: 'Quickswap' },
  { tokenA: MATIC_USDC, tokenB: MATIC_USDT, tokenLP: { address: '0x2cF7252e74036d1Da831d11089D326296e64a728' }, exchange: 'Quickswap' },
  { tokenA: MATIC_WMATIC, tokenB: MATIC_WETH, tokenLP: { address: '0xadbF1854e5883eB8aa7BAf50705338739e558E5b' }, exchange: 'Quickswap' },
  { tokenA: MATIC_WETH, tokenB: MATIC_USDT, tokenLP: { address: '0xF6422B997c7F54D1c6a6e103bcb1499EeA0a7046' }, exchange: 'Quickswap' },
  { tokenA: MATIC_USDC, tokenB: MATIC_DAI, tokenLP: { address: '0xf04adBF75cDFc5eD26eeA4bbbb991DB002036Bdd' }, exchange: 'Quickswap' },
  { tokenA: MATIC_WETH, tokenB: MATIC_AAVE, tokenLP: { address: '0x90bc3E68Ba8393a3Bf2D79309365089975341a43' }, exchange: 'Quickswap' },
  { tokenA: MATIC_LINK, tokenB: MATIC_WETH, tokenLP: { address: '0x5cA6CA6c3709E1E6CFe74a50Cf6B2B6BA2Dadd67' }, exchange: 'Quickswap' },
  { tokenA: MATIC_WMATIC, tokenB: MATIC_USDC, tokenLP: { address: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827' }, exchange: 'Quickswap' },
  // Dfyn
  { tokenA: MATIC_USDC, tokenB: MATIC_USDT, tokenLP: { address: '0xBe40F7Fff5A2235aF9a8cb79A17373162eFeFA9C' }, exchange: 'Dfyn Exchange' },
  { tokenA: MATIC_USDC, tokenB: MATIC_DAI, tokenLP: { address: '0xb7bd6d48C9b1aF7E126d0389C6970F157D974f33' }, exchange: 'Dfyn Exchange' },
  { tokenA: MATIC_DAI, tokenB: MATIC_USDT, tokenLP: { address: '0xdd228fdC8A41A02BDEa72060F53C1f88A2FD48B6' }, exchange: 'Dfyn Exchange' },
  { tokenA: MAITC_WBTC, tokenB: MATIC_WETH, tokenLP: { address: '0x39eAA90a70E8FdC04E1f63Db04e1c62c9aCe0641' }, exchange: 'Dfyn Exchange' },
  { tokenA: MATIC_USDC, tokenB: MATIC_WETH, tokenLP: { address: '0x7D51bAd48d253dae37cC82cad07f73849286Deec' }, exchange: 'Dfyn Exchange' },
// {tokenA: { symbol: 'ust'   , address: '                                          ' }, tokenB: MATIC_USDT, tokenLP: { address: '                                          ' }, exchange: 'Dfyn Exchange' },
  { tokenA: MATIC_WMATIC, tokenB: MATIC_WETH, tokenLP: { address: '0x2FE46369b1C261Be62F9fD327ff5A9B17Ab0F451' }, exchange: 'Dfyn Exchange' },
  { tokenA: MATIC_WETH, tokenB: MATIC_UNI, tokenLP: { address: '0xb5E1a07c9b6aB3BEe8d9Bf4066D324c5da89C07F' }, exchange: 'Dfyn Exchange' },
  { tokenA: MATIC_FISH, tokenB: MATIC_WMATIC, tokenLP: { address: '0xB1Eda2fbCb02da970C1aAcd26eCF434BfeE5B674' }, exchange: 'Dfyn Exchange' },
  { tokenA: MATIC_WETH, tokenB: MATIC_AAVE, tokenLP: { address: '0x7162c0AcF32820920a741D8fA466b8e6D60D530D' }, exchange: 'Dfyn Exchange' },
]

export const networkTokensLPMigrationVampiring: { [chainId in ChainId]: INetworkTokensLPMigrationVampiringItem[] } = {
  [ChainId.MAINNET]: BSC,
  [ChainId.BSCTESTNET]: BSC_TESTNET,
  [ChainId.HECOMAINNET]: HECO,
  [ChainId.HECOTESTNET]: [],
  [ChainId.ETHER_MAINNET]: ETHER,
  [ChainId.ETHER_TESTNET]: [],
  [ChainId.MATIC_MAINNET]: MATIC,
  [ChainId.MATIC_TESTNET]: [],
}
