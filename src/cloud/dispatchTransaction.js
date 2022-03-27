// const Tx = require("ethereumjs-tx").Transaction;
// var HDWalletProvider = require("truffle-hdwallet-provider");


Moralis.Cloud.define("dispatchTransaction", async () => {

  const logger = Moralis.Cloud.getLogger();

  const { provider } = Moralis.ethersByChain("0x4");
  logger.info(JSON.stringify(provider, null, 2));
  return provider;


});