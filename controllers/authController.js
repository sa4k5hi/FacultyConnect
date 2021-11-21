var User = require('../models/userModels');
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = 'fab1b4dff6623417281f8adaba7fd1106ef4443766838209d263b92e0acb8fe749790b73ff10dc866a5e491f5dcca510d72cbffee1e660ddddbe2c85abce6a62';

// exports.newToken = user => {
//     return jwt.sign({ id: user['_id'] }, TOKEN_SECRET, {
//       expiresIn: "1800s", //30 mintutes
//     });
// };
  
exports.verifyToken = token =>
    new Promise((resolve, reject) => {
      jwt.verify(token, TOKEN_SECRET, (err, payload) => {
        if (err) return reject(err)
        resolve(payload)
      })
    });

exports.signup = async (req, res) => {
    let newUser = req.body;
    console.log(req.body.email+" "+req.body.password+" "+req.body.register_code+" "+req.body.name+" "+req.body.role);
    if (!newUser.email || !newUser.password || !newUser.register_code || !newUser.role) {
        return res.status(400).send({ message: 'need email and password' })
    }

    try {
        console.log("t1");
        const user = await User.create({
            email: newUser.email.toLowerCase(),
            registerationCode: newUser.register_code,
            name: newUser.name,
            role: newUser.role,
            password: newUser.password
        });
        console.log("t2");
        const token = jwt.sign({ id: user['_id'] }, TOKEN_SECRET, {
            expiresIn: "1800s", //30 mintutes
          });
        console.log("t3");
        res.cookie("jwt", token, { httpOnly: true });
        res.status(201);

        if(newUser.role.toLowerCase() == 'student') {
            res.redirect(307,'/student');
        } else {
            res.redirect(307,'/faculty');
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
    
    const invalid = { message: 'Invalid email and passoword combination' }
    
    try {
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
    
        const token = jwt.sign({ id: user['_id'] }, TOKEN_SECRET, {
            expiresIn: "1800s", //30 mintutes
          });
        
        res.cookie("jwt", token, { httpOnly: true });
        res.status(201);
  
        if(user.role.toLowerCase() == 'student') {
            res.redirect(307,'/student');
        } else {
            res.redirect(307,'/faculty');
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
        res.status(501).end();
    }
}

exports.protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("Inside protectRoute function");
        const payload = verifyToken(token);
        console.log(payload);
        if (payload) {
            req.id = payload.id;
            next();
        } else {
            res.redirect(`/`)
        }
    } catch (error) {
        res.redirect(`/`)
    }
}

exports.isLoggedIn = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        const payload = verifyToken(token);
        if (payload) {
            let user = await User.findById(payload.id);
            req.role = user.role;
            next();
        } else {
            next();
        }
    } catch (error) {
        next();
    }
}

