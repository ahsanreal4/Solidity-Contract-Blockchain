const HdWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const { ACCOUNT_MNEUMONIC, GOERLI_URL } = require("./constants");

const deployContract = async () => {
  const provider = new HdWalletProvider(ACCOUNT_MNEUMONIC, GOERLI_URL);
  const web3 = new Web3(provider);

  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy contract from address " + accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to ", result.options.address);
  provider.engine.stop();
};

deployContract();
