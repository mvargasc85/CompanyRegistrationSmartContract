
company registration smart contract

simple ethereum contract to validate registration of company registration formalities

Prerequisites 
Node.js 
Truffle 
Ganache 
Metamask

*-------------------------------------------------------------------------------------------------------Step by step guide

1- First of all, we must have installed Node.js version 8 or higher and version npm 5 or higher on the computer.
2- You need to have installed Git, it is a software that allows you to download code from remote repositories, and npm uses it to access the latest versions of certain packages. https://git-scm.com/downloads
3- Second we must have installed some IDE of development or some editor of text.
EXAMPLE: Atom, Sublime Text, Visual Studio code.
4- Then proceed to verify the version of node.js and npm installed on the computer, if we have a Windows computer, we proceed to open Windows powershell of Microsoft.
5- Execute the node-v, npm -v commands to see the versions.
6-The c / c ++ compilation tools must be installed in npm
If it's Linux: sudo apt-get update
                      sudo apt-get install build-essential
If it is Windows: we execute the following code as administrator in Windows power Shell: npm install --global --production windows-build-tools.
7-We will download the solidity compiler called SOLC and the library web3.js
We run inside the terminal of visual studio code
in command npm show solc versions to see the versions of the solidity compiler.
8- Next we use the compiler version 0.4.24 and install it in the jason package with the development dependency package of our project using the command: npm install solc@0.4.24 -save-dev.
9- Next we install the version of web 3, but before  the current versions until now with the following command: npm show web3 versions.
9.1-Once we see the versions we proceed to install using the following command: npm install web3@1.0.0-beta.35 -save-dev.
10-Install ganache: It is a software that we tested an Ethereum test network in a simple way, it can display contracts, execute performance tests, execute transaction inspection commands that take place in the network, the download link It is the following: https://truffleframework.com/ .
11-Install Javascript testing library called Moca
using the following command: Npm install mocha@5.2.0 --save-dev.
12-Se debe Instalar truffle framework de forma global.
mediante el siguiente comando: npm install truffle@4.1.3 –g .
13-It is necessary to install in the browser preferably a
extension called metamask which allow the management of the wallets that in turn allow identifying identities and signing Blockchain transactions from the following link can be downloaded: https://metamask.io/   .

14-IMPORTANT
Usage: Clone the repository

Once installed the software requirements mentioned in the step-by-step guide, you can perfectly replicate and continue to share this project with the smart contracts project.

14-1 
-----------------------------------------------------------------------------------------------------------------------------*

Set the ganache info in the truffle-config.js
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



