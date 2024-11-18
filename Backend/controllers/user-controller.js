const User = require("../models/User")

const createUser = async (req,res) => {
    try{
        const {username,email,password} = req.body;

        const user = await User.findOne({username})

        // console.log(user)

        if(user){
            return res.json({
                success: false,
                message: "User already exists! Please try with another username"
            })
        }

        const newUser = new User({
            username,
            email,
            password
        })

        await newUser.save()
        res.status(200).json({
            success: true,
            message: "Registered Success!",
            data: newUser
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
}

const userDetails = async (req,res) => {
    try{
        const {username} = req.body 

        const user = await User.findOne({username})

        res.status(200).json({
            success: true,
            message: "fetched successfully",
            data: user
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
}

module.exports = {createUser,userDetails}