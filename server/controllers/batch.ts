import * as dotenv from 'dotenv';
import Batch from '../models/batch';
import BaseCtrl from './base';
import IPFS = require('ipfs-mini');
import web3 from './web3';
import goodschain from './goodschain';

dotenv.load({ path: '.env' });

export default class StageCtrl extends BaseCtrl {
  model = Batch;
  ipfs = new IPFS({ host: process.env.IPFS_URI, port: 5001, protocol: 'https' });

  // Step: 1
  // URL: api/getHash
  getHash = (req, res) => {
    this.ipfs.addJSON(req.body, async (err, result) => {
      if (result) {
        const accounts = await web3.eth.getAccounts();
        goodschain.options.gasPrice = (process.env.GAS_PRICE).toString();
        goodschain.options.gas = process.env.GAS_LIMIT;
        const data = await goodschain.methods.addHash(req.body.batch, req.body.stage, result).send({
          from: accounts[0],
        });
        if (data) {
          delete req.body.xmlFile;
          req.body.hash = result;
          req.body.txHash = data.transactionHash;
          const obj = new this.model(req.body);
          obj.save((error, item) => {
            if (error && error.code === 11000) {
              res.sendStatus(400).json(error);
            } else {
              res.status(200).json(item);
            }
          });
        } else {
          res.sendStatus(403);
        }
      } else {
        console.log(err);
      }
    });
  }

  // Step: 2
  // URL: api/getdata
  getData = (req, res) => {
    this.ipfs.catJSON(req.body.hash, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.sendStatus(403).json(err);
      }
    });
  }

  // Step: 3
  // URL: api/verifydata
  verifyData = async (req, res) => {
    goodschain.options.gasPrice = (process.env.GAS_PRICE).toString();
    goodschain.options.gas = process.env.GAS_LIMIT;
    const data = await goodschain.methods.verifyHash(req.body.batch, req.body.stage, req.body.hash).call();

    if (data) {
      res.status(200).json(data);
    } else {
      res.sendStatus(403);
    }
  }

  testGet = async (req, res) => {
    goodschain.options.gasPrice = '3000000000';
    goodschain.options.gas = 100000;

    const data = await goodschain.methods.getShipment(1).call();

    if (data) {
      res.status(200).json(data);
    } else {
      res.sendStatus(403);
    }
  }

  testSet = async (req, res) => {
    const accounts = await web3.eth.getAccounts();
    goodschain.options.gasPrice = '3000000000';
    goodschain.options.gas = 100000;
    const data = await goodschain.methods.addHash(1, 1, 'abc').send({
      from: accounts[0],
    });

    if (data) {
      res.status(200).json(data);
    } else {
      res.sendStatus(403);
    }
  }

}
