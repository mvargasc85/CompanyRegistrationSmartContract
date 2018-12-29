var CompanyRegistration = artifacts.require("./CompanyRegistration.sol");

module.exports = function(deployer) {
  deployer.deploy(CompanyRegistration);
};
