var PreSalePTARK = artifacts.require("PreSalePTARK.sol");

/* 
====================================================================================================
PreSalePTARK tests
====================================================================================================
*/

contract('PreSalePTARK', function(accounts) {
    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    };
    var PreSalePTARKContract; 
    // Outside addresses
    var Owner = accounts[0];
    var notOwner = accounts[1];
    var nextOwner = accounts[2];
    var investor = accounts[3];
  
	it('shouldn\'t allow mint tokens for someone except owner', function() {
	    var random_int = randomInteger(100000, 1000000);
	    return PreSalePTARK.deployed()
	    .then(function(instance) {
	            var Contract = instance;
	            PreSalePTARKContract = Contract;
	            return PreSalePTARKContract.mintTokens(
	            	investor,
	            	parseFloat(random_int + 'E18'),
	            	{
	            	from: notOwner
	            	}
	            );
	    })
	    .then(function() {
	        assert(false, 'token was emitted');
	    })
	    .catch(function(e) {
	    	assert.equal(e.message,'VM Exception while processing transaction: revert', 'ether was sended');
	    })
	});

	it('should mint tokens correctly', async function() {
	    var random_int = randomInteger(100000, 1000000);
	    await PreSalePTARKContract.mintTokens(
	    	investor,
	    	parseFloat(random_int + 'E18'),
	    	{
	    	from: Owner
	    	}
	    );
	    balance = await PreSalePTARKContract.balanceOf.call(investor);
	    assert.equal(parseFloat(balance.toString()), parseFloat(random_int + 'E18'), 'tokens wasn\'t emited correctly');

	});

	it('shouldn\'t allow send ether to contract address', function() {
		var etherAmout = randomInteger(1, 10);
		PreSalePTARKContract.sendTransaction({
        	from: investor,
        	value: web3.toWei(etherAmout, 'ether')
        })
        .then(function() {
        	assert(false, 'ether was sended');
        })
       	.catch(function(e) {
	    assert.equal(e.message,'VM Exception while processing transaction: revert', 'ether was sended');
	    })
	});


	it('shouldn\'t allow burn tokens for someone except owner', function() {
	    return PreSalePTARK.deployed()
	    .then(function(instance) {
	            var Contract = instance;
	            PreSalePTARKContract = Contract;
	            return PreSalePTARKContract.burnTokens(
	            	investor,
	            	{
	            	from: notOwner
	            	}
	            );
	    })
	    .then(function() {
	        assert(false, 'token was emitted');
	    })
	    .catch(function(e) {
	    	assert.equal(e.message,'VM Exception while processing transaction: revert', 'ether was sended');
	    })
	});


	it('should burn tokens correctly', async function() {	  
	    await PreSalePTARKContract.burnTokens(
	    	investor,
	    	{
	    	from: Owner
	    	}
	    );
	    balance = await PreSalePTARKContract.balanceOf.call(investor);
	    assert.equal(parseFloat(balance.toString()), 0, 'tokens wasn\'t bunt');

	});

	it('should transfer ownership', async function() {
		await PreSalePTARKContract.transferOwnership(
	    	nextOwner,
	    	{
	    	from: Owner
	    	}
	    );
	    var random_int = randomInteger(100000, 1000000);
		await PreSalePTARKContract.mintTokens(
	       	investor,
	       	parseFloat(random_int + 'E18'),
	       	{
	       	from: nextOwner
	       	}
	    );
	    var balance = await PreSalePTARKContract.balanceOf.call(investor);
	    assert.equal(parseFloat(balance.toString()), parseFloat(random_int + 'E18'), 'ownership wasn\'t transfered');
		await PreSalePTARKContract.burnTokens(
	       	investor,
	       	{
	       	from: nextOwner
	       	}
	    );
	    balance = await PreSalePTARKContract.balanceOf.call(investor);
	    assert.equal(parseFloat(balance.toString()), 0, 'ownership wasn\'t transfered');

	});


});