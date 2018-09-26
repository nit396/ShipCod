import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import IPFS = require('ipfs-mini');
// import web3 from './web3';
// import goodschain from './goodschain';

dotenv.load({ path: '.env' });

import Order from '../models/order';
import BaseCtrl from './base';

import fs = require('fs');

// const Web3 = require('web3');
// const HDWalletProvider = require("truffle-hdwallet-provider");

export default class OrderCtrl extends BaseCtrl {
  model = Order;
  ipfs = new IPFS({ host: process.env.IPFS_URI, port: 5001, protocol: 'https' });

  createOrder = (req, res) => {
    console.log("createOrder 111111111111111111111111111111111111111111111111");
    console.log(req.body);

    //add UsrAddr into .env
    // fs.readFile("./.env", 'utf8', (e, r) => {
    //   if (e) {
    //     console.log(e);
    //   } else {
    //     var lines = r.split('\n');
    //     var data = '';
    //     for (var i = 0; i < lines.length; i++) {
    //       if (lines[i].indexOf('WALLET_MNEMONIC') != -1) {
    //         data += 'WALLET_MNEMONIC=' + req.body.UsrAddr;
    //       } else {
    //         data += lines[i];
    //       }
    //       data += '\n';
    //     }
    //     fs.writeFile('./.env', data, 'utf8', (err) => {
    //       if (err) {
    //         console.log(err);
    //       }
    //       console.log('OK');
    //     });
    //   }
    // });

    // const provider = new HDWalletProvider(
    //   req.body.UsrAddr, process.env.RINKEPY_INFURA
    // );
    // const web3 = new Web3(provider);

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
        const data = await goodschain.methods.createOrder(order.id, order.name, order.cost, order.address).send({
          from: accounts[0],
        });

        if (data) {
          const obj = new this.model(order);
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
