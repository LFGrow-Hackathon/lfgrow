import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMoralis } from "react-moralis";

export default function CommunityPage() {

  //@Tomas: the id is the unique identifier of a community (tokenId from the object below), we get it from the url. 
  //It means that when a user navigate to communities/aave, we will get aave as the id and then make a query to moralis to get aave's information. 
  //Therefore you also need to design a simple error page if someone tries to go on a community that doesn't exist like "communities/dsrfgvd"

  let { id } = useParams();
  const { Moralis } = useMoralis();

  useEffect(() => {
    //Query Moralis, I'll continue it
    // const Community = Moralis.Object.extend("Community");
    // const query = new Moralis.Query(Community);
    // query.equalTo();
  }, []);

  return (
    <div className="flex w-4/5">
      <div className="w-full mt-10 px-4 sm:px-4 lg:px-4">
        <div className="w-full flex mr-4 justify-between">
          <img
            className="inline-block h-20 w-20 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="w-full h-full pl-5 pr-5 mt-10 bg-white border-2 border-[#e1e8f7] rounded-md place-content-center">
          <div className="mt-5 p-3 rounded-md border-[#355DA8] border-2 font-bold bg-[#e2effa] min-h-10 opacity-75">
            Communities
          </div>

        </div>
      </div>
    </div>
  );
}
//@Tomas:
//Here are examples of what I get from Moralis. The unique identifier of the community is tokenId, it should be used in the url as "/communities/tokenId". Name, description, categories needs to be display (consider the case where its empty!!)
//Links like twitter, website, discord needs to be added. 
//Don't display for now the snapshot data (followerCount, proposalCount, space_id, membersSnapshot)
//We don't care about the market rank
const dataExample =
  [
    {
      "categories": [
        "Non-Fungible Tokens (NFT)",
        "Governance"
      ],
      "tokenId": "ethereum-name-service",
      "name": "Ethereum Name Service",
      "symbol": "ens",
      "eth_address": "0xc18360217d8f7ab5e7c516566761ea12ce7f9d72",
      "description": "The Ethereum Name Service (ENS) is a distributed, open, and extensible naming system based on the Ethereum blockchain.\r\n\r\nENS’s job is to map human-readable names like ‘alice.eth’ to machine-readable identifiers such as Ethereum addresses, other cryptocurrency addresses, content hashes, and metadata. ENS also supports ‘reverse resolution’, making it possible to associate metadata such as canonical names or interface descriptions with Ethereum addresses.\r\n\r\nENS has similar goals to DNS, the Internet’s Domain Name Service, but has significantly different architecture due to the capabilities and constraints provided by the Ethereum blockchain. Like DNS, ENS operates on a system of dot-separated hierarchical names called domains, with the owner of a domain having full control over subdomains.\r\n\r\nTop-level domains, like ‘.eth’ and ‘.test’, are owned by smart contracts called registrars, which specify rules governing the allocation of their subdomains. Anyone may, by following the rules imposed by these registrar contracts, obtain ownership of a domain for their own use. ENS also supports importing in DNS names already owned by the user for use on ENS.\r\n\r\nBecause of the hierarchal nature of ENS, anyone who owns a domain at any level may configure subdomains - for themselves or others - as desired. For instance, if Alice owns 'alice.eth', she can create 'pay.alice.eth' and configure it as she wishes.\r\n\r\nENS is deployed on the Ethereum main network and on several test networks. If you use a library such as the ensjs Javascript library, or an end-user application, it will automatically detect the network you are interacting with and use the ENS deployment on that network.",
      "homepage": "https://ens.domains/",
      "discord": "https://chat.ens.domains/",
      "twitter_name": "ensdomains",
      "logo": "https://assets.coingecko.com/coins/images/19785/large/acatxTm8_400x400.jpg?1635850140",
      "imarket_rankd": 184,
      "createdAt": "2022-03-02T18:57:25.871Z",
      "updatedAt": "2022-03-25T06:35:51.951Z",
      "followersCount": 45791,
      "proposalsCount": 22,
      "space_id": [
        "nominations.ens.eth",
        "ens.eth"
      ],
      "membersSnapshot": [
        "0x5A384227B65FA093DEC03Ec34e111Db80A040615",
        "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
        "0x983110309620D911731Ac0932219af06091b6744",
        "0x866B3c4994e1416B7C738B9818b31dC246b95eEE",
        "0x0904Dac3347eA47d208F3Fd67402D039a3b99859",
        "0x9297A132AF2A1481441AB8dc1Ce6e243d879eaFD",
        "0x75cac0CEb8A39DdB4942A83AD2aAfaF0C2A3e13f"
      ],
      "objectId": "ATIk4wv7QtExEeO0N8ZObuqu"
    },
    {
      "categories": [],
      "tokenId": "gitcoin",
      "name": "Gitcoin",
      "symbol": "gtc",
      "eth_address": "0xde30da39c46104798bb5aa3fe8b9e0e1f348163f",
      "description": "Gitcoin is a platform to fund builders looking for meaningful, open source work.",
      "homepage": "https://gitcoin.co/",
      "discord": "https://discord.com/invite/gitcoin",
      "twitter_name": "gitcoin",
      "logo": "https://assets.coingecko.com/coins/images/15810/large/gitcoin.png?1621992929",
      "imarket_rankd": 426,
      "createdAt": "2022-03-02T19:04:07.499Z",
      "updatedAt": "2022-03-25T06:35:30.560Z",
      "followersCount": 33255,
      "membersSnapshot": [
        "0xeF8305E140ac520225DAf050e2f71d5fBcC543e7"
      ],
      "proposalsCount": 49,
      "space_id": [
        "gitcoindao.eth"
      ],
      "objectId": "y8Yn5ViayJMZgje6xCrzGsmK"
    },
    {
      "categories": [
        "Avalanche Ecosystem",
        "Polygon Ecosystem",
        "Near Protocol Ecosystem",
        "Lending/Borrowing",
        "Governance",
        "Yield Farming",
        "Decentralized Finance (DeFi)"
      ],
      "tokenId": "aave",
      "name": "Aave",
      "symbol": "aave",
      "eth_address": "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
      "description": "Aave is a decentralized money market protocol where users can lend and borrow cryptocurrency across 20 different assets as collateral. The protocol has a native token called AAVE, which is also a governance token that lets the community decide the direction of the protocol in a collective manner. Lenders can earn interest by providing liquidity to the market, while borrowers can borrow by collateralizing their cryptoassets to take out loans from the liquidity pools.\r\n\r\n",
      "homepage": "https://app.aave.com/?referral=93",
      "discord": "https://aave.com/discord",
      "twitter_name": "aaveaave",
      "github": "https://github.com/aave/aave-protocol",
      "logo": "https://assets.coingecko.com/coins/images/12645/large/AAVE.png?1601374110",
      "imarket_rankd": 61,
      "createdAt": "2022-03-02T17:49:28.437Z",
      "updatedAt": "2022-03-25T06:35:23.464Z",
      "followersCount": 29791,
      "membersSnapshot": [
        "0xc8E0345596D7196941E61D3aB607E57Fe61F85E7"
      ],
      "proposalsCount": 96,
      "space_id": [
        "aave.eth"
      ],
      "objectId": "2IMWXbbZDAaaJyPfoDBSBluK"
    },
    {
      "categories": [
        "Arbitrum Ecosystem",
        null,
        "Solana Ecosystem",
        "Avalanche Ecosystem",
        "Binance Smart Chain Ecosystem",
        "xDAI Ecosystem",
        "Polygon Ecosystem",
        "Yearn Ecosystem",
        "Automated Market Maker (AMM)",
        "Governance",
        "Exchange-based Tokens",
        "Decentralized Exchange Token (DEX)",
        "Decentralized Finance (DeFi)",
        "Yield Farming"
      ],
      "tokenId": "sushi",
      "name": "Sushi",
      "symbol": "sushi",
      "eth_address": "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
      "description": "Sushi is a DeFi protocol that is completely community-driven, serving up delicious interest for your held crypto assets.\r\n\r\nOn Sushi, you can take advantage of passive-income providing DeFi tools such as liquidity providing, yield farming and staking. Furthermore, due to the decentralized nature of being an AMM (Automated Market Maker), Sushi has fewer hurdles to execute your cryptocurrency trades and all fees are paid to the users who provided liquidity, just as it should be!",
      "homepage": "https://sushi.com/",
      "discord": "https://discord.gg/MsVBwEc",
      "twitter_name": "sushiswap",
      "logo": "https://assets.coingecko.com/coins/images/12271/large/512x512_Logo_no_chop.png?1606986688",
      "imarket_rankd": 119,
      "createdAt": "2022-03-02T20:24:33.711Z",
      "updatedAt": "2022-03-25T06:35:26.585Z",
      "followersCount": 24270,
      "membersSnapshot": [
        "0x4bb4c1B0745ef7B4642fEECcd0740deC417ca0a0",
        "0x1C0Aa8cCD568d90d61659F060D1bFb1e6f855A20",
        "0x19B3Eb3Af5D93b77a5619b047De0EED7115A19e7"
      ],
      "proposalsCount": 254,
      "space_id": [
        "sushigov.eth"
      ],
      "objectId": "fBICYYFhVqO24mfg6GkObqcZ"
    },
    {
      "categories": [
        "Arbitrum Ecosystem",
        "Avalanche Ecosystem",
        "Polygon Ecosystem",
        "Binance Smart Chain Ecosystem",
        "xDAI Ecosystem",
        "Automated Market Maker (AMM)",
        "Exchange-based Tokens",
        "Governance",
        "Decentralized Exchange Token (DEX)",
        "Yield Farming",
        "Decentralized Finance (DeFi)"
      ],
      "tokenId": "uniswap",
      "name": "Uniswap",
      "symbol": "uni",
      "eth_address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      "description": "UNI is the governance token for Uniswap, an Automated Market Market DEX on the Ethereum blockchain. The UNI token allows token holders to participate in the governance of the protocol. Key decisions such as usage of the treasury or future upgrades can be decided through a governance vote.",
      "homepage": "https://uniswap.org/",
      "discord": "https://discord.gg/FCfyBSbCU5",
      "twitter_name": "uniswap",
      "logo": "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png?1600306604",
      "imarket_rankd": 33,
      "createdAt": "2022-03-02T20:31:58.850Z",
      "updatedAt": "2022-03-25T06:35:35.750Z",
      "followersCount": 22711,
      "proposalsCount": 52,
      "space_id": [
        "uniswap"
      ],
      "objectId": "OfKJp7ZrqVTKOzAdhKOaU3Yc"
    },
    {
      "categories": [
        "Rebase Tokens",
        "Decentralized Finance (DeFi)",
        "Asset-backed Tokens"
      ],
      "tokenId": "olympus",
      "name": "Olympus",
      "symbol": "ohm",
      "eth_address": "0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5",
      "description": "",
      "homepage": "https://olympusdao.finance/",
      "discord": "https://discord.gg/bzFn5nstFB",
      "twitter_name": "olympusdao",
      "github": "https://github.com/olympusdao",
      "logo": "https://assets.coingecko.com/coins/images/14483/large/token_OHM_%281%29.png?1628311611",
      "imarket_rankd": 153,
      "createdAt": "2022-03-02T19:29:09.377Z",
      "updatedAt": "2022-03-25T16:24:28.750Z",
      "followersCount": 14737,
      "membersSnapshot": [
        "0x2E34c96c51cFf6F5bEA0CCCF0c886902843b5EdA",
        "0xdaa30fe7e3e7a721ab7de665066a6fef0b19d5c9",
        "0x389b11C4fA4b95bCc252A2B20Bb62310Fbc36746",
        "0x5Ce7D83f7Aaac17a0Ad40540B37fC7a0b688FF44",
        "0x6216e2067457Db699bef940b4e1Ec6316B68dA20",
        "0xef475153e00c58b5011136e3f22c3fd761e7570e",
        "0xE3Ad1a936EB7C86617BCE4b370F8674258f79c79",
        "0x131bd1A2827ccEb2945B2e3B91Ee1Bf736cCbf80",
        "0xaFC762CFf667e56F3D698e16698C92C24009d0e4",
        "0xB936Ab7902A5d8083915c03f60eb0033678dA815"
      ],
      "proposalsCount": 189,
      "space_id": [
        "olympusdao.eth"
      ],
      "objectId": "qliYwsk6T4kgzF5GGscpB5aj"
    },
    {
      "categories": [
        "Polygon Ecosystem",
        "Olympus Pro"
      ],
      "tokenId": "bankless-dao",
      "name": "Bankless DAO",
      "symbol": "bank",
      "eth_address": "0x2d94aa3e47d9d5024503ca8491fce9a2fb4da198",
      "description": "BANK is the DAO’s native governance token which coordinates activity and gets distributed to community members for active participation in this movement.",
      "homepage": "https://bankless.community/",
      "discord": "https://discord.gg/bjPz2w9Zts",
      "twitter_name": "banklessdao",
      "logo": "https://assets.coingecko.com/coins/images/15227/large/j4WEJrwU.png?1622615796",
      "imarket_rankd": 1151,
      "createdAt": "2022-03-02T18:03:01.061Z",
      "updatedAt": "2022-03-25T06:35:51.058Z",
      "followersCount": 13274,
      "membersSnapshot": [
        "0x47f882a155209F55D280EB36577c100A74DD32a1",
        "0x23dB246031fd6F4e81B0814E9C1DC0901a18Da2D",
        "0x4f8c2d5397262653Cd8956CB977A0bA3660210c7",
        "0xE4067ED66738dBDC7b8917703C8c380d898033F8",
        "0xE71eFd5865A42Cb0f23146Dc8E056dBA4E67e9b7",
        "0xb6ac0341Fcf3FB507A8208D34a97f13779e1393D",
        "0x35EA12472d6fb21A9dB24B397AA2775D332C14B7"
      ],
      "proposalsCount": 32,
      "space_id": [
        "banklessvault.eth"
      ],
      "objectId": "c3SXgWlrckCqKEA5oITiCCRW"
    },
    {
      "categories": [
        "Metaverse",
        "Polygon Ecosystem",
        "Play To Earn",
        "Entertainment",
        "Non-Fungible Tokens (NFT)"
      ],
      "tokenId": "decentraland",
      "name": "Decentraland",
      "symbol": "mana",
      "eth_address": "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
      "description": "Decentraland is an Ethereum-powered virtual reality platform. In this virtual world, you purchase plots of land that you can later traverse, build upon, and monetize. There’s no limit to what you can do. It’s the first digital platform that’s completely owned by its users. Similar to games like Skyrim and Fallout, Decentraland is an all-immersive virtual universe. However, instead of playing on a 2-dimensional screen, you participate in a 3-dimensional world. It seems to be the logical next step before creating full-blown AI-based games in the physical space à la Westworld. Similar groupings on LAND comprise Districts. Districts are basically communities that revolve around a shared theme. For example, there may be a District just for crypto enthusiasts with cryptocurrency apps and services.\r\n\r\nThe Decentraland team is led by Ari Meilich (Project Lead) and Esteban Ordano (Tech Lead). Ordano previously worked at <a href=\"https://bitpay.com/\">Bitpay</a> as a software engineer and founded Smart Contract Solutions, Inc. Both founders have also worked together in creating Stremium and <a href=\"https://www.coingecko.com/en/coins/bitcore\">Bitcore</a>. Decentraland has been around for longer than you may think. The team hit their first development milestone, Stone Age, in June 2015. This was a simple, pixelated grid that allocated pixels to users through a proof-of-work algorithm. Most recently, they held a Terraform Event in which they sold LAND in the new, 3D world. The team has also partnered with <a href=\"https://www.coingecko.com/en/coins/district0x\">district0x</a>, <a href=\"https://www.coingecko.com/en/coins/aragon\">Aragon</a>, and imToken to provide some of their services. \r\n\r\nMANA is the token used to buy lands in Decentraland. The Blockchain platform can be incorporated in order to buy or sell the various digital assets available in the virtual world. An unclaimed land would have the same market pricing on every exchange possible and precisely the developers are on a hunt for such since as they can build on top of it, and attract lot of popularity. However, one must keep in mind that the land parcels are different from them and each one of them varies according to the various market conditions of that time. Mana can be a great investment and can be bought by trading and with other <a href=\"https://www.coingecko.com/en/coins/bitcoin\">Bitcoin</a>, <a href\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a>, or any other prominent cryptocurrency and on some of the most notable cryptocurrency exchanges. Specifically, <a href=\"https://www.coingecko.com/en/exchanges/binance\">Binance</a> and <a href=\"https://www.coingecko.com/en/exchanges/huobi\">Huobi</a> are two of the best cryptocurrency exchanges that one can suggest for trading Mana tokens.\r\n\r\nThe Decentraland coin isn’t a minable cryptocurrency as it is issued on the Ethereum blockchain, unlike Bitcoin and other similar currencies. So users looking to engage in some Decentraland mining will be disappointed. Instead, it was sold during token sales and is now being traded on exchanges.",
      "homepage": "https://decentraland.org/",
      "discord": "",
      "twitter_name": "decentraland",
      "github": "https://github.com/decentraland/marketplace",
      "logo": "https://assets.coingecko.com/coins/images/878/large/decentraland-mana.png?1550108745",
      "imarket_rankd": 35,
      "createdAt": "2022-03-02T18:49:15.771Z",
      "updatedAt": "2022-03-25T11:51:25.194Z",
      "followersCount": 11788,
      "membersSnapshot": [
        "0x3323B7264F7D5e8f98e6aFCcec73b6bA1116AE19",
        "0x8Cff6832174091DAe86F0244e3Fd92d4CeD2Fe07",
        "0xF081eDa01d8D3b10F6F93fF1459339b9eD174D3C",
        "0x5E23D08324f017d5425e59A2782C9ae27aCE0958"
      ],
      "proposalsCount": 957,
      "space_id": [
        "snapshot.dcl.eth"
      ],
      "objectId": "8N34tmHmQeJdAjwmFCP3RHH7"
    },
    {
      "space_id": [
        "poh.eth"
      ],
      "membersSnapshot": [
        "0x9d9E26932d012b2Ab21B974fE1552F4025b1e1Cc",
        "0x2A52309eDF998799C4A8b89324CCAd91848c8676",
        "0xfd1Af514B8b2bf00d1999497668BFF26Ccdf4C8a",
        "0x77E851A926297fff2E6BC8FDbB5bB6087a617eC5",
        "0x3BE28A28B85c36FB74e513898bC11260Ee541AAC",
        "0xDA35c8e464889bA2Cb91d2E85C608a99D262d5db",
        "0x521aacB43d89E1b8FFD64d9eF76B0a1074dEdaF8",
        "0xbeeb01a1E47450479c99b7Eb545D090cDdD78776",
        "0x7Bd0faFe34a8B64AfAf16166d644CDbB2B950aaB",
        "0x2B1C66f6d779B6da734d67255be2C54dB2E18977",
        "0x6Ed3755141cecB387FCB2Ad18b537bc7F2bD524b",
        "0x31331EC182777B3E3CF127F4709A8AAa8F76E549",
        "0x31452B884F5269eD21e2BAB44CC6A9d48eAac85f",
        "0x6E9A88971e957Abb41bAe4E2677caE258F0c1e76",
        "0xc0e2324817EaefD075aF9f9fAF52FFaef45d0c04",
        "0x30C7F4F7504D6366916f669cd8E731ED4dF6C702",
        "0xe724C1D534284f2837F3ab310eF8329BBD7c045E",
        "0xae55D42e157E35a075BA38De7E871178648D2d30",
        "0x342f5be7578CA67506a31214D93a99e5504256CC",
        "0x5886f65425cad457776d7a89a399907c97e608e5",
        "0x85c2043C36be1b84A789E92c29ee3e918ddF50f4",
        "0x275203A89ACEEdee0D07aF626830baE536b36eD1",
        "0xBC5eC594509eD050F4A53eEe85D92aF6d2529b56",
        "0xcBCA1f03D67472A7bEe257798Fc93c7eC6c5BE77",
        "0x96925d8E33AE06F6fC9F185F106C6F026d36B352",
        "0xBfF6800aF73a36a7b1821Cc9f18DB00cA4Aa4b3d",
        "0xb0CC32190a06f4bA13027E7D6C516217b49E8eb0",
        "0xe17aE4Ee9f37524d2a25177C8a6C95e51DD85262",
        "0x6bFadF56F24583A777020F6B6EEb11591D79270c",
        "0xcdf2bc5eAE545953A840457eCDCd5a5Bd4466f66",
        "0xb8F6b7dfCA935D1aDB58ab18177F5B72a939Ba70",
        "0x87EE3c1Fb15eae5b9965493C2020dbd3AdACdAfA",
        "0xcb68A8138c1e57691574670f435A36dB5eCC8E2a",
        "0x39Df2B98daDA52248309770B530c2D2ED0908Cd3",
        "0x670F6eFC8DBA20BBb1BF49bad31845e47216BFF9",
        "0x6c97785edAf8f949a353fcc1629d48759B12F323",
        "0xc0086412BA221bd43e69852c9eA38336D6310885",
        "0x7b694B2a461E58b0673565fB8B1D83E962Ed70f3",
        "0xf28AB805D6Edee246443AC25E3C4aA4A2B56c586",
        "0x58805f572924b83b8c224184d2Cf60ad3302DBDF",
        "0xC17671afEc156398D65ffCBD37ea2B3C12225684",
        "0xE7f13052Fe2bA7D038dac18De5e730542e3979bC",
        "0xA72ef9BB82d59464eAA63f461C273f8028b20f5c",
        "0xa697c106f153ba7Fa3801bA2afd6273559c7b105",
        "0x364144a07f23EF285DF585D3E4239Ca7B1102535",
        "0xcd3c6214dd023eEA574410FfF03d3c065dc560F3",
        "0x17a91203A9E9C3519c2F76210497eF7F4BE2352F",
        "0xE30827AE68533e7a01Fb8369d5219f18D5f70e87",
        "0x6D8b0d39053cC84F072E39eF2Aa353Ceef26c295",
        "0xC97C5931C53223B434b64B44d03f4d5B404126b1",
        "0x8BF7Cd4aE85F765a06006802e21bbCC968f45421",
        "0x14f284988198bBD305C44b7BEA8748323fBB8419",
        "0x0827ED3a46c9793005e4D68E838DE577Cd8DD752",
        "0xb3ca2de6af06BF736c609F3e4dD1307570a37732",
        "0x5CfA0c362DADEa86478d05767ed800dd1B026749",
        "0x26D06ec9a2dd19cb33398a58f75d9Aa61dda11cD",
        "0x6986E8C8Da33753443959690c240B03931Bd1Edc",
        "0x61E067aF897a0a9130e5Fbb9bF089223FCa10820",
        "0x6F772F596bB0e9e534Ac99D782eE36578dd15B14",
        "0x816384B4E6644f3A1Cb683E1CB83409A464532eA",
        "0x504E7620069a0a8354434dED3150ed7E2ECF5153",
        "0x482C96b007EA453cb55A3DC11ceB8830e18F0639",
        "0x2ad91063e489CC4009DF7feE45C25c8BE684Cf6a",
        "0x6687c671980E65ebD722b9146Fc61e2471558dd6"
      ],
      "categories": [],
      "tokenId": "poh",
      "name": "Proof Of Humanity",
      "description": "",
      "symbol": "vote",
      "twitter_name": "proofofhumanity",
      "homepage": null,
      "proposalsCount": 61,
      "followersCount": 11342,
      "logo": "https://gateway.ipfs.io/ipfs/QmVg3dGTGDzqHNK2RJp9un6oYjA8n6ReQMnwNNKQgqLLDZ",
      "createdAt": "2022-03-25T16:24:30.727Z",
      "updatedAt": "2022-03-25T16:24:30.727Z",
      "objectId": "UvWWXsrd2TiCeGmfkQoSRYh9"
    },
    {
      "space_id": [
        "dydxgov.eth"
      ],
      "categories": [],
      "tokenId": "dydxgov",
      "name": "dYdX",
      "description": "",
      "symbol": "dydx",
      "twitter_name": "dydxfoundation",
      "github": "https://github.com/dydxfoundation",
      "homepage": null,
      "proposalsCount": 10,
      "followersCount": 11006,
      "logo": "https://gateway.ipfs.io/ipfs/QmP7cUh9YKS2425ByEwKsR79n3gPNwhurVyDLZ2LjYpxRv",
      "createdAt": "2022-03-25T16:24:12.293Z",
      "updatedAt": "2022-03-25T16:24:12.293Z",
      "objectId": "7Ht7L2tTBpGtQSGEgapUxjYj"
    }
  ];