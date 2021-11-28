var User = require('../models/userModels');
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = 'fab1b4dff6623417281f8adaba7fd1106ef4443766838209d263b92e0acb8fe749790b73ff10dc866a5e491f5dcca510d72cbffee1e660ddddbe2c85abce6a62';


exports.auth = (req,res,next) => {
    try {
        let token = req.cookies.jwt;
        if(token) {
            const payload = jwt.verify(token, TOKEN_SECRET);
            if(payload) {
                console.log(payload['id']);
                req.token= token;
                req.id=payload['id'];
                next();
            } else {
                return res.status(401).json({
                    error: true
                });
            }
        } else {
            return res.status(401).send('Please login!')
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: 500});
    }
}

exports.signup = async (req, res) => {
    let newUser = req.body;
    console.log(req.body.email+" "+req.body.password+" "+req.body.register_code+" "+req.body.name+" "+req.body.role);
    if (!newUser.email || !newUser.password || !newUser.register_code || !newUser.role) {
        return res.status(400).send({ message: 'need email and password' })
    }

    try {
        // if(Object.keys(req.body).length != 0) {
            const existUser = await User.findOne({email: newUser.email.toLowerCase()});
            if(existUser) {
                res.status(400);
                return res.redirect('/signup?alreadyExist=true');
            }
        // }
        const user = await User.create({
            email: newUser.email.toLowerCase(),
            registerationCode: newUser.register_code,
            name: newUser.name,
            role: newUser.role,
            password: newUser.password
        });
        const token = jwt.sign({ id: user['_id'] }, TOKEN_SECRET);
        res.cookie("jwt", token, { httpOnly: true });
        res.status(201);

        if(newUser.role.toLowerCase() == 'student') {
            res.redirect('/student');
        } else {
            res.redirect('/faculty');
        }
    } catch (e) {
        console.log(e);
        return res.status(500).end()
    }
}

exports.signin = async(req,res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' })
    }
    
    const invalid = { message: 'Invalid email and password combination' }

    
    try {
        var token = req.cookies.jwt;
        var isExpireToken = false;
        if(token) {
            const payload = jwt.verify(token, TOKEN_SECRET);
            if(payload) {
                return res.status(400).json({
                    error :true,
                    message:"You are already logged in"
                });
            } else {
                isExpireToken = true;
                res.clearCookie("jwt");
            }
        }
        if(!token || isExpireToken) {
            console.log(req.body.email);
            const user = await User.findOne({ email: req.body.email });

            console.log(user);
            if (!user) {
                return res.status(401).send(invalid)
            }
            
            const match = await user.checkPassword(req.body.password)
        
            if (!match) {
                console.log('Password not match')
                return res.status(401).send(invalid)
            }
        
            var token = jwt.sign({ id: user['_id'] }, TOKEN_SECRET);
            
            res.cookie("jwt", token, { httpOnly: true });
            res.status(201);
    
            if(user.role.toLowerCase() == 'student') {
                res.redirect('/student');
            } else {
                res.redirect('/faculty');
            }
        }
    } catch (e) {
        console.error(e)
        res.status(500).end()
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.redirect("/");
    } catch (error) {
    //   res.status(501).json({
    //     error,
    //   });
        res.status(500).end();
    }
}
