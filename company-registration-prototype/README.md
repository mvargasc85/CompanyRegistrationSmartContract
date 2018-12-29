company registration smart contract

simple ethereum contract to validate registration of company registration formalities

Prerequisites
Node.js
Truffle
Ganache
Metamask

Usage:
Clone the repo

Set the ganache info in the  truffle-config.js

module.exports = {
  networks: {
    development: {      
      host: 'localhost',
      port: 7545,
      network_id: '*',
      gas: 5000000
    }
  }
}

configure metamask with the ganache info

from a terminal: 
1.truffle compile in the project directory
2.truffle deploy --reset 
3.npm start 



