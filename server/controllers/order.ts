import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import Order from '../models/order';
import BaseCtrl from './base';

export default class OrderCtrl extends BaseCtrl {
    model = Order;

    creatOrder = (req, res) => {
        console.log(req.body);
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
      }
}