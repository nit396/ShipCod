import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import IPFS = require('ipfs-mini');
import web3 from './web3';
import goodschain from './goodschain';
dotenv.load({ path: '.env' });

//import Shipper from 'models/order';
import BaseCtrl from './base';
import Batch from 'models/batch';

export default class CustomerCtrl {
  //model = Order;
  ipfs = new IPFS({ host: process.env.IPFS_URI, port: 5001, protocol: 'https' });

  customerAccepted = (req, res) => {
    console.log("customerAccepted 111111111111111111111111111111111111111111111111");
    console.log(req.body);
    this.ipfs.addJSON(req.body, async (err, result) => {
      if (result) {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        goodschain.options.gasPrice = (process.env.GAS_PRICE).toString();
        goodschain.options.gas = process.env.GAS_LIMIT;
        const data = await goodschain.methods.customerComfirm(req.body.id).send({
          from: accounts[0],
          value: web3.utils.toWei(req.body.cost, 'ether')
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
