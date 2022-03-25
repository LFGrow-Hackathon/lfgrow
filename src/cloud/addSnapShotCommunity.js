Moralis.Cloud.define("addSnapshotCommunity", async () => {

  const logger = Moralis.Cloud.getLogger();

  async function querySnapshot(skip = 0) {
    const query = `query Spaces {
      spaces(
        first: 1000,
        skip: ${skip},
        orderBy: "created",
        orderDirection: desc
      ) {
        id
        name
        about
        network
        website
        github
        twitter
        symbol
        followersCount
        proposalsCount
        members
        avatar
        categories
      }
    }`;

    try {
      const response = await Moralis.Cloud.httpRequest({
        method: "POST",
        url: "https://hub.snapshot.org/graphql",
        body: { query }
      });
      logger.info("IT WORKED" + response.data.data.spaces.length);
      return response.data.data.spaces;
    } catch (error) {
      logger.error("6" + error);
      return error;
    }
  }

  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  async function addSpace(data) {
    const Community = Moralis.Object.extend("Community");
    const queryTwitter = new Moralis.Query(Community);

    //Check if we have a match based on Twitter name
    queryTwitter.equalTo("twitter_name", data.twitter?.toLowerCase());
    const duplicate = await queryTwitter.find();

    //Check if there is a duplicate, if the twitter is not empy nor null/undefined and that this duplicate comes from coingecko data (thus it has a market rank)
    if (duplicate.length !== 0 && data.twitter !== "" && data.twitter && duplicate[0].attributes.market_rank) {
      logger.info("DUPLICATE TWITTER" + duplicate[0].attributes.tokenId);
      duplicate[0].addUnique("space_id", data.id);
      duplicate[0].set("followersCount", data.followersCount);
      duplicate[0].set("proposalsCount", data.proposalsCount);
      for (let i = 0; i < data.members?.length; i++) {
        duplicate[0].addUnique("membersSnapshot", data.members[i]);
      }
      try {
        await duplicate[0].save();
        logger.info("space created" + duplicate[0]);
        return true;
      } catch (error) {
        logger.error("3" + error);
        return error;
      }
    }

    //Check if the space snapshot already exist or not
    const querySpaceId = new Moralis.Query(Community);
    querySpaceId.equalTo("space_id", data.id);
    const duplicateSpace = await querySpaceId.find();

    //If the space doesn't exist and doesn't match one in coingecko then we create a new one
    if (duplicateSpace.length === 0) {
      logger.info("NEW SPACE");
      const space = new Community();
      space.addUnique("space_id", data.id);

      //Remote the .eth of the spaceId and check this new string doesn't contains another "."
      const tokenId = data.id.slice(0, -4);
      if (tokenId.includes(".")) {
        logger.info("HAS A POINT " + tokenId);
        space.set("tokenId", tokenId.replace(/[.]/, ""));
      } else {
        space.set("tokenId", tokenId);
      }
      space.set("name", data.name);
      space.set("description", data.about);
      space.set("symbol", data.symbol.toLowerCase());
      space.set("twitter_name", data.twitter?.toLowerCase());

      if (!data.github?.startsWith("http") && data.github !== null) {
        const url = `https://github.com/${data.github}`;
        space.set("github", url);
      }
      space.set("homepage", data.website);
      space.set("proposalsCount", data.proposalsCount);
      space.set("followersCount", data.followersCount);

      for (let i = 0; i < data.members?.length; i++) {
        space.addUnique("membersSnapshot", data.members[i]);
      }

      if (data.avatar) {
        const url = resolveLink(data.avatar);
        space.set("logo", url);

      }
      space.set("categories", data.categories);

      try {
        await space.save();
        logger.info("space created" + space);
        return true;
      } catch (error) {
        logger.error("4" + error);
        return error;
      }

    }
  }

  const whitelist = {
    "compound-governance-token": "compgov.eth",
    "gnosis": "gnosis.eth",
    "radicle": "gov.radicle.eth",
    "olympus": "olympusdao.eth",
    "rook": "rook.eth",
    "nftx": "nftx.eth",
    "yearn-finance": "ybaby.eth",
    "index-cooperative": "index-coop.eth",
  };

  async function addWhitelisted(data, tokenIdCommunity) {
    const Community = Moralis.Object.extend("Community");
    const query = new Moralis.Query(Community);
    query.equalTo("tokenId", tokenIdCommunity);
    const result = await query.find();

    result[0].addUnique("space_id", data.id);
    result[0].set("followersCount", data.followersCount);
    result[0].set("proposalsCount", data.proposalsCount);
    for (let i = 0; i < data.members?.length; i++) {
      result[0].addUnique("membersSnapshot", data.members[i]);
    }

    try {
      await result[0].save();
      logger.info("space created" + result[0]);
      return true;
    } catch (error) {
      logger.error("5" + error);
      return error;
    }


  }

  async function getSnapshotSpace() {
    logger.info("start");
    try {
      let fetchQuery = true;
      let skip = 0;
      let iter = 0;
      let spacenum = 0;
      while (fetchQuery) {
        const spaces = await querySnapshot(skip);
        logger.info("SPACE" + spaces);
        for (let i = 0; i < spaces?.length; i++) {

          //Check if a space matches one in the whitelist
          const tokenIdCommunity = Object.keys(whitelist).find(key => whitelist[key] === spaces[i].id);
          if (tokenIdCommunity) {
            logger.info("la");
            addWhitelisted(spaces[i], tokenIdCommunity);
          }
          //Check if the space is on Ethereum or Polygon and has at least 5 proposal + either it has more than 50 followers or more than 10 proposals
          if ((spaces[i].network === "1" || spaces[i].network === "137") && spaces[i].followersCount > 5 && (spaces[i].followersCount > 50 || spaces[i].proposalsCount > 9)) {
            const isTrue = await addSpace(spaces[i]);
            iter++;
            if (isTrue) {
              spacenum++;
            }
            logger.info("iter" + iter);
          }
        }
        skip = skip + 1000;
        logger.info("end" + spacenum);
        logger.info("SKPI" + skip);

        //We query a list of 1000 spaces, if the list is shorter = no more spaces to query -> stop the query
        if (spaces?.length !== 1000) {
          logger.info("WHILE" + spaces.length);
          fetchQuery = false;
        }
      }

    } catch (error) {
      logger.error("1" + error);
      return error;
    }
  }
  getSnapshotSpace();
});