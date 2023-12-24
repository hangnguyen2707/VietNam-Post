const order = require('../modulers/order');
const packageModule = require('../modulers/package');
const { ObjectId } = require('mongodb');
const { failDeliveryStatus, successDeliveryStatus, shippingStatus, confirmedStatus } = require('../modulers/order');

const typeMap = {
    packageID: 'string',
    type: 'string',
    address_send : 'string',
    address_receive : 'string',
    status: 'string',
    receive_point_id: 'number', // specify the type for each parameter
    send_point_id: 'number',
    sendDate: 'date',
    receiveDate: 'date',
    status: 'string',
    // add more parameters as needed
  };
class orderController {
    // Tạo đơn
    createOrder = async (req, res, next) => {
        if (true) {
            await this.createOrderToTransactionSpot(req, res, next);
        } else if (false) {
            return this.createOrderToWarehouse(req, res, next);
        } else {
            this.createOrderToCustomer(req, res, next);
        }
    }

    //tao don den diem tap ket
    createOrderToWarehouse(req, res, next) {

    }
    // Tạo đơn đến điểm giao dịch
    async createOrderToTransactionSpot(req, res, next) {
        // Your code here
        try {
            const {packageID, type, address_send, address_receive, receive_point_id, send_point_id, sendDate} = req.body;
            const newOrder = await new order({
                id: Math.floor(Math.random() * 100000),
                packageID: packageID,
                type: type,
                address_send: address_send,
                address_receive: address_receive,
                status: shippingStatus,
                receive_point_id: receive_point_id,
                send_point_id: send_point_id,
                sendDate: sendDate
            })
            await newOrder.save();
            console.log("Order created successfully");
        } catch (error) {
            console.log("Order creation failed: ", error);
        }
    }
    createOrderToCustomer(req, res, next) {
        
    }
    // Lấy danh sách đơn hàng
    async getOrderList(req, res, next) {
        try {
            const point_id = req.query.spotID;
            var queries = {};
            if (point_id) {
                queries = {
                    $or: [{receive_point_id: point_id}, {send_point_id: point_id}],
                };
            }
            res.json(await order.find(queries).exec());
        } catch (error) {
            res.send('Error when collecting order list');
            console.log(error);
        }
    }

    //xac nhan don hang
    async confirmOrder(req, res, next) {
        try {
            const orderID = req.params.orderID;
            console.log(orderID);
            order.updateOne({id: orderID}, {$set : {status: confirmedStatus}}).then((obj) => {
                console.log(obj);
            });
            res.send('Success order confirming');
            // res.json(await order.find({id: orderID}).exec());
        } catch (error) {
            res.send('Error when confirming order');
            console.log(error);
        }
    }

    async statistics(req, res, next) {
        const spotID = req.query.spotID;
        console.log(req.query);
        var result = {};
        if (spotID) {
            // Số lượng hàng gửi đi khu vực khác
            result.totalSent = await order.find({receivePointID: spotID}).count().exec();
            // Số lượng hàng nhận từ khu vực khác
            result.totalSuccess = await order.find({sendPointID: spotID, status: successDeliveryStatus}).count().exec();
            result.totalFail = await order.find({sendPointID: spotID, status: failDeliveryStatus}).count().exec();
            var income = await order.aggregate([
                { $match: { receivePointID: spotID } },
                { $group: {
                    _id: null,
                    totalIncome: { $sum: "$cost" }
                }},
                { $project: { _id: 0 } }
            ]).exec();
            result.totalIncome = income.length > 0 ? income[0].totalIncome : 0;
            
        } else {
            result = (await order.aggregate([
                { $group: {
                    _id: null,
                    totalPackage : { $sum: 1 },
                    totalIncome: { $sum: "$cost" },
                    totalFail: { $sum: { $cond: [ { $eq: [ "$status", failDeliveryStatus ] }, 1, 0 ] } },
                    totalSuccess: { $sum: { $cond: [ { $eq: [ "$status", successDeliveryStatus ] }, 1, 0 ] } }
                }},
                { $project: { _id: 0 } }
            ]).exec())[0]   ;
        }
        res.json(result);
    }
}

module.exports = new orderController();