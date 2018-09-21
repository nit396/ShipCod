import * as mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
  batch: String,
  stage: String,
  hash: String,
  txHash: String
});

const Batch = mongoose.model('Batch', batchSchema);

export default Batch;
