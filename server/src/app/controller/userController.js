const User = require('../modulers/user')
const bcrypt = require("bcrypt")
const removeVietnameseTones = require("../../utils/convertVietNam")

class userController{


    home(req, res, next) {
        res.send('sdsadsada');
    }
    // [POST] tao tai khoan
    async register(req, res, next) {
        try{
            console.log("Hello")
            const { username, password, email, phone,province, district, role } = req.body;
            const salt = await bcrypt.genSalt(10);
            console.log(salt)
            const hashedPassword = await bcrypt.hash(password, salt);
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Người dùng đã tồn tại' });
              }
            const id = removeVietnameseTones.removeVietnameseTones(district)

            const user = new User({ username, password: hashedPassword, email, phone, province, district,idArea: id, role });

            await user.save();
            res.status(200).json({message: 'Tạo tài khoản thành công'})
        }
       catch(error) {
            next(error)
       }   
    }
    // Đăng nhập
    async login(req, res, next) {
        try {
            const user = await User.findOne({ username: req.body.username });
            console.log(user)
            const role = req.body.role;
            
            if (!user) {
                // res.redirect('/');
                return;
            }
    
            // const validPassword = await bcrypt.compare(req.body.password, user.password);
            const validPassword=true;
            console.log(validPassword)
            if (validPassword) {
                res.cookie("uid", user.id);
                console.log(user.id)
                // res.redirect('/');
                res.status(200).json({
                    message:"Đăng nhập thành công",
                    role: user.role,
                    username: user.username,
                });
                return 
                    ;
            }
            return res.status(400).json({error: 'Thông tin đăng nhập không đúng'})
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        res.clearCookie("uid");
        res.statusCode = 302;
        res.redirect('/');
        res.end();
    }
    //Xóa tài khoản
    async deleteAccount(req, res, next) {
        // Add your code here to delete the account
        const {username} = req.body.username;
        const deleteUser = await User.findOneAndDelete({username: username});

    }
    //Lấy danh sách tài khoản
    getAccounts(req, res, next) {
        // Add your code here to get the account list
        return leaderGetAccounts(req,res,next);
        // if (req.body.role == "manager") {
        //     return this.leaderGetAccounts(req, res, next);
        // }
        // if(req.body.role == "warehouse leader") {
        //     return warehouseLeaderGetAccounts(req, res, next)
        // }
        // if(req.body.role == "point leader") {
        //     return this.pointLeaderGetAccounts(req, res, next);
        // }
    }
    // Lấy danh sách tài khoản cho lãnh đạo
    async leaderGetAccounts(req, res, next) {
        console.log("Hello")
        try {
            
            const users = await User.find({ $or: [{ role: "warehouse leader" }, { role: "point leader" }] });
            res.json(users); 
        } catch (error) {
            next(error);
        }
    }
    // Lấy danh sách tài khoản cho trưởng điểm
    async warehouseLeaderGetAccounts(req, res, next) {
        try {
            const users = await User.find({role: "warehouse staff"});
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
    // Lấy danh sách tài khoản cho trưởng điểm giao dịch
    async pointLeaderGetAccounts(req, res, next) {
        try {
            const users = await User.find({role: "point staff"});
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    // Cập nhật thông tin
    async updateInfo(req, res, next) {
        try {
            const username = req.params.username;
            const updates = req.body;
            const user = await User.findByIdAndUpdate(username, updates, { new: true });
            res.status(200).json(user);
        } catch(error) {
            res.status(500).json({ error: "Lỗi khi cập nhật thông tin" });
        }
        
    }
}
module.exports = new userController()