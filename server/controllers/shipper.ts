import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import IPFS = require('ipfs-mini');
//import web3 from './web4';
//import goodschain from './goodschain1';
dotenv.load({ path: '.env' });

export default class ShipperCtrl {
  ipfs = new IPFS({ host: process.env.IPFS_URI, port: 5001, protocol: 'https' });

  shipperAccepted = (req, res) => {
    console.log("shipperAccepted 111111111111111111111111111111111111111111111111");
    console.log(req.body);
    var order = req.body.order;
    var WL = req.body.UsrAddr;
    
    //add UsrAddr into .env
    const Web3 = require('web3');
    const HDWalletProvider = require("truffle-hdwallet-provider");
    const provider = new HDWalletProvider(
      WL, process.env.RINKEPY_INFURA
    );
    const web3 = new Web3(provider);

    const address = process.env.CONTRACT_ADDRESS;
    const abi = JSON.parse(process.env.CONTRACT_ABI);
    const goodschain = new web3.eth.Contract(abi, address);

    this.ipfs.addJSON(req.body, async (err, result) => {
      if (result) {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        goodschain.options.gasPrice = (process.env.GAS_PRICE).toString();
        goodschain.options.gas = process.env.GAS_LIMIT;
        const data = await goodschain.methods.shipperAccepted(order.id).send({
          from: accounts[0],
          value: web3.utils.toWei(order.cost, 'ether')
        });
        if (data) {
          res.status(200).json(req.body);
        } else {
          res.sendStatus(403);
        }
      } else {
        console.log(err);
      }
    })
  }
}
