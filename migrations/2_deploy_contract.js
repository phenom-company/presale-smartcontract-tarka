var PreSalePTARK = artifacts.require("PreSalePTARK.sol");

module.exports = function(deployer, network, accounts) {
	deployer.deploy(
    	PreSalePTARK,
    	accounts[0]
    );
};