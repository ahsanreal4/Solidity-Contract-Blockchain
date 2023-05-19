const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;
let inboxContract;
const INITIAL_MESSAGE = "Hi there!";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of these accounts to deploy the contract
  inboxContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_MESSAGE],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox contract", () => {
  it("is the contract deployed", () => {
    assert.ok(inboxContract.options.address);
  });

  it("has correct default message", async () => {
    // act
    const message = await inboxContract.methods.message().call();

    // assert
    assert.equal(message, INITIAL_MESSAGE);
  });

  it("modifies the message correctly", async () => {
    // arrange
    let modifiedMessage = "bye";

    // act
    await inboxContract.methods
      .setMessage(modifiedMessage)
      .send({ from: accounts[0] });
    const message = await inboxContract.methods.message().call();

    // assert
    assert.equal(message, modifiedMessage);
  });
});
