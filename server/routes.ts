import * as express from 'express';

import UserCtrl from './controllers/user';
import BatchCtrl from './controllers/batch';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const batchCtrl = new BatchCtrl();

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Batchs
  router.route('/testget').get(batchCtrl.testGet);
  router.route('/testset').get(batchCtrl.testSet);
  router.route('/batchs').get(batchCtrl.getAll);
  router.route('/batchs/count').get(batchCtrl.count);
  router.route('/batch').post(batchCtrl.getHash);
  router.route('/getdata').post(batchCtrl.getData);
  router.route('/verifydata').post(batchCtrl.verifyData);
  router.route('/batch/:id').get(batchCtrl.get);
  router.route('/batch/:id').put(batchCtrl.update);
  router.route('/batch/:id').delete(batchCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
