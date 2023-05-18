const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxFilePath = path.resolve(__dirname, "contracts", "Inbox.sol");
const contractSourceCode = fs.readFileSync(inboxFilePath, "utf-8");

module.exports = solc.compile(contractSourceCode, 1).contracts[":Inbox"];
