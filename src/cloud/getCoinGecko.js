Moralis.Cloud.define("getCoinGecko", async () => {

  const logger = Moralis.Cloud.getLogger();
  /* ------------------------------- 
  Create a Moralis object called community with the coin information of CoinGecko
  Then save it to Moralis cloud 
  ---------------------------------*/
  async function CreateNewObj(coinId) {

    const Community = Moralis.Object.extend("Community3");
    const coinInfo = new Community();
    const query = new Moralis.Query(Community);
    query.equalTo("tokenId", coinId.id);
    const duplicate = await query.find();
    logger.info("DUPLICATE" + duplicate.length);

    if (duplicate.length === 0) {

      coinInfo.set("tokenId", coinId.id);
      coinInfo.set("name", coinId.name);
      coinInfo.set("symbol", coinId.symbol);
      coinInfo.set("eth_address", coinId.platforms.ethereum);
      coinInfo.set("description", coinId.description?.en);
      coinInfo.set("homepage", coinId.links?.homepage[0]);
      coinInfo.set("discord", coinId.links?.chat_url[0]);
      coinInfo.set("twitter_name", coinId.links?.twitter_screen_name.toLowerCase());
      coinInfo.set("github", coinId.links?.repos_url?.github[0]?.toLowerCase());
      coinInfo.set("logo", coinId.image?.large);
      coinInfo.set("market_rank", coinId.market_cap_rank);
      coinInfo.set("categories", coinId.categories);

      await coinInfo.save()
        .then((coinInfo) => {
          // Execute any logic that should take place after the object is saved.
          logger.info("New object created with objectId: " + coinInfo.id);
        }, (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Moralis.Error with an error code and message.
          logger.error("Failed to create new object, with error code: " + error.message);
        });
    }

  }
  /* ------------------------------- 
  Get coin information based on the coinId passed and then proceed to create a moralis object if the coin has market cap rank
  ---------------------------------*/
  const getCoinInfo = (coinId) => {
    Moralis.Cloud.httpRequest({ url: `https://api.coingecko.com/api/v3/coins/${coinId}?tickers=false&market_data=false&community_data=false&developer_data=false` })
      .then((httpResponse) => {
        if (httpResponse.data.market_cap_rank) {
          logger.info("ici1");
          CreateNewObj(httpResponse.data);
        }
      }, (httpResponse) => {
        logger.error("Request failed with response code " + httpResponse.status);
      });
  };

  //Sleep function for the Coingecko API call limit of 50 call/min
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* ------------------------------- 
  Get a list of all the coin that are listed on Ethereum and make a coingecko API request of the coin info using the id
  ---------------------------------*/
  const getEthCoinList = () => {
    logger.info("RUNNING");

    Moralis.Cloud.httpRequest({ url: "https://api.coingecko.com/api/v3/coins/list?include_platform=true" })
      .then(async (data) => {
        const item = data.data;
        let iter = 0;

        //We receive an object from the axios request. 
        //We loop through the object checking if the token is deployed on ethereum or polygon and sin't included in the blacklist
        for (const i in item) {
          if (((item[i].platforms.ethereum !== undefined && item[i].platforms.ethereum !== "") || (item[i].platforms["polygon-pos"] !== undefined && item[i].platforms["polygon-pos"] !== "")) && !blacklist.includes(item[i].id)) {
            await getCoinInfo(item[i].id);
            logger.info("looping" + iter);
            await sleep(1250);  //API call limit of 50call/min so we wait 1.25s between each
            iter++;
            if (iter > 100) //The filtered list of coin is 5000 long so if we don't want to loop through them all during testing we can set a limit here with iter.
            {
              logger.info("STOP");
              break;
            }
          }
        }
      }, (data) => {
        logger.error("Request failed with response code " + data.status);
      });

    const blacklist = ["wrapped-bitcoin", "binance-usd", "tether", "usd-coin", "dai", "compound-ether", "compound-usd-coin", "cdai", "huobi-btc", "convex-crv", "tether-gold", "staked-ether", "sbtc", "ageur", "true-usd", "compound-uniswap", "compound-basic-attention-token", "compound-0x"];
  };
  getEthCoinList();
});