var Altyn = artifacts.require("Altyn");
var AltynIDO = artifacts.require("AltynIDO");

module.exports = async function (deployer) {
  await deployer.deploy(Altyn);
  const altyn = await Altyn.deployed();
  await deployer.deploy(AltynIDO, altyn.address);
};
/*
const ContractA = artifacts.require('Altyn.sol');
const ContractB = artifacts.require('AltynIDO.sol');

module.exports = async function (deployer, network, accounts) {// truffle develop - компилирует с параметром network=develop, потом запускаем truffle migrate
  const [admin, _] = accounts;

  if(network === 'bscTestnet' || network === 'develop') {
    await deployer.deploy(ContractA, admin);
    const contractA = await ContractA.deployed();
    await deployer.deploy(ContractB, admin, contractA.address);
  }

  if(network === 'bsc') {
    //Deployment logic for mainnet
  }
};
*/
