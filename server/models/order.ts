import * as mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    id: String,
    name: String,
    cost: String,
    address: String
});


const Order = mongoose.model('Order', orderSchema);

export default Order;