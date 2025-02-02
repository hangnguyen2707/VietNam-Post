const express = require('express');
const router = express.Router();
// const warehouseController = require('../app/controller/warehouseController');
const userController = require("../app/controller/userController")
const { authenticateUser } = require('../middleware/authentication');
const areaController = require('../app/controller/areaController');
const { route } = require('./area');


//Hệ thống các điểm giao dịch và điểm tập kết
// router.get('/system/list',authenticateUser('manager'), warehouseController.getWarehouseList);
router.get('/province', areaController.getProvinceList);

router.get("/district", areaController.getDistrictList);


router.get("/pointTransaction",authenticateUser('manager'), areaController.getPointTransaction);
router.get("/pointWarehouse",authenticateUser('manager'), areaController.getPointWarehouse);


//Danh sách các tài khoản trưởng điểm tập kết và dao dịch
router.get('/listAcount', userController.leaderGetAccounts);
//Sửa thông tin của trưởng điểm tập kết và giao dịch [Viết sau]
router.post("/updateInfo", authenticateUser('manager'),userController.updateInfo);

//Thống kê[]

module.exports = router;