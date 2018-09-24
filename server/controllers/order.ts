import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import IPFS = require('ipfs-mini');
import web3 from './web3';
import goodschain from './goodschain';
dotenv.load({ path: '.env' });

import Order from '../models/order';
import BaseCtrl from './base';

export default class OrderCtrl extends BaseCtrl {
  model = Order;
  ipfs = new IPFS({ host: process.env.IPFS_URI, port: 5001, protocol: 'https' });

  createOrder = (req, res) => {
    console.log("111111111111111111111111111111111111111111111111");
    console.log(req.body);
    // this.ipfs.addJSON(req.body, async (err, result) => {
    //   if (result) {
    //     const accounts = await web3.eth.getAccounts();
    //     goodschain.options.gasPrice = (process.env.GAS_PRICE).toString();
    //     goodschain.options.gas = process.env.GAS_LIMIT;
    //     const data = await goodschain.methods.createOrder(req.body.id, req.body.name, req.body.cost, req.body.address).send({
    //       from: accounts[0],
    //     });
    //   }else{

    //   }
    // const obj = new this.model(req.body);
    // obj.save((err, item) => {
    //   // 11000 is the code for duplicate key error
    //   if (err && err.code === 11000) {
    //     res.sendStatus(400);
    //   }
    //   if (err) {
    //     return console.error(err);
    //   }
    //   res.status(200).json(item);
    // });
    this.ipfs.addJSON(req.body, async (err, result) => {
      if (result) {
        const accounts = await web3.eth.getAccounts();
        goodschain.options.gasPrice = (process.env.GAS_PRICE).toString();
        goodschain.options.gas = process.env.GAS_LIMIT;
        const data = await goodschain.methods.createOrder(req.body.id, req.body.name, req.body.cost, req.body.address).send({
          from: accounts[0],
        });
        if (data) {
          const obj = new this.model(req.body);
          obj.save((err, item) => {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
              res.sendStatus(400);
            }
            if (err) {
              return console.error(err);
            }
            res.status(200).json(item);
          });
        } else {
          res.sendStatus(403);
        }
      } else {
        console.log(err);
      }
    });
  }

  getAllOrder = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }
}
