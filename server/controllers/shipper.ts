import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import IPFS = require('ipfs-mini');
import web3 from './web3';
import goodschain from './goodschain';
dotenv.load({ path: '.env' });

//import Shipper from 'models/order';
import BaseCtrl from './base';
import Batch from 'models/batch';

export default class ShipperCtrl {
  //model = Order;
  ipfs = new IPFS({ host: process.env.IPFS_URI, port: 5001, protocol: 'https' });

  shipperAccepted = (req, res) => {
    console.log("shipperAccepted 111111111111111111111111111111111111111111111111");
    console.log(req.body);
  }
}
