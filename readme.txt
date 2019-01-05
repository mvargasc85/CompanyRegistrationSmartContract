
company registration smart contract

simple ethereum contract to validate registration of company registration formalities

Prerequisites 
Node.js 
Truffle 
Ganache 
Metamask

*-------------------------------------------------------------------------------------------------------Step by step guide

1- Install node.js: First of all, we must have installed Node.js version 8 or higher and version npm 5 or higher on the computer.
2- Install Git : You need to have installed Git, it is a software that allows you to download code from remote repositories, and npm uses it to access the latest versions of certain packages. https://git-scm.com/downloads
3- Install Visual Studio Code: We must have installed some IDE of development or some editor of text.
EXAMPLE: Atom, Sublime Text, Visual Studio code.
4- Then proceed to verify the version of node.js and npm installed on the computer, if we have a Windows computer, we proceed to open Windows powershell of Microsoft at administrator or CMD.
5- Execute the node-v, npm -v commands to see the versions.

---
Realizamos un video explicando estos primeros cinco pasos del readme el cual esta en la siguiente dirección de youtube:
https://www.youtube.com/watch?v=TdtHDq8kENM
We made a video explaining these first five steps of the readme which is in the following youtube address: https://www.youtube.com/watch?v=TdtHDq8kENM
---

6-Install c / c ++ compilation tools: Must be installed in npm
If it's Linux: sudo apt-get update
                      sudo apt-get install build-essential
If it is Windows: we execute the following code as administrator in Windows power Shell: npm install --global --production windows-build-tools.

7-Install extension solidity: We proceed to open our text editor "visual studio code" to install an extension called solidty 
which has Juan Blanco as its author.

8-Install Truffle: You must install truffle framework in its version 4.1.13 specifically for the project globally using the following command: npm install truffle@4.1.13 -g the site oficial is https://truffleframework.com/truffle.

9-Install ganache: It is a software that we tested an Ethereum test network in a simple way, it can display contracts, execute performance tests, execute transaction inspection commands that take place in the network, the download link It is the following: https://truffleframework.com/ganache .

10-Install metamask : It is necessary to install in the browser preferably a
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



