# Phenom Pre-Sale contract
Please see below description of pre-sale smart contract developed by [Phenom.Team][phenom].

## Overview
This smart contract is designed to issue tokens on a private round of sales. After finishing a private round of sales the ownership of this contract the contract will be transferred to the ICO contract for swap token. This contract hasn't fallback function to prevent sending ether to his address.

## Code

#### Functions

**transferOwnership**
```cs
transferOwnership  (address _newOwner) external onlyOwner
```
Allows owner to transfer ownership of contract.

**balanceOf**
```cs
balanceOf(address _investor) public constant returns(uint256)
```
Get balance of investor.

**mintTokens**
```cs
mintTokens(address _investor, uint256 _mintedAmount) external onlyOwner
```
Mints tokens.

**burnTokens**
```cs
burnTokens(address _investor) external onlyOwner
```
Burns tokens.

#### Events

**Transfer**
```cs
event Transfer(address _from, address _to, uint256 amount); 
```

**Burned**
```cs
event Burned(address _from, uint256 amount);
```

## Prerequisites
1. nodejs, and make sure it's version above 8.0.0
2. npm
3. truffle
4. testrpc

## Run tests
1. run `testrpc` in terminal
2. run `truffle test` in another terminal to execute tests.


## Collaborators

* **[Alex Smirnov](https://github.com/AlekseiSmirnov)**
* **[Max Petriev](https://github.com/maxpetriev)**
* **[Dmitriy Pukhov](https://github.com/puhoshville)**
* **[Kate Krishtopa](https://github.com/Krishtopa)**


[phenom]: https://phenom.team/
