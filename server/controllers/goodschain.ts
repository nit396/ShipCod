import * as dotenv from 'dotenv';
import web3 from './web3';

dotenv.load({ path: '.env' });

const address = process.env.CONTRACT_ADDRESS;

const abi = JSON.parse(process.env.CONTRACT_ABI);

export default new web3.eth.Contract(abi, address);
