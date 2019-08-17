const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    //VALIDATION
    const { error } = registerValidation(req.body);
    if (error) 
        return res.status(400).send(error.details[0].message);

    //CHECK IF THE DATA IS NOT DUPLICATED
    const emailExist = await User.findOne({
        email: req.body.email
    });

    if (emailExist)
        return res.status(400).send(`Email already exists`);

    //HASHING THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //CREATE NEW USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    //VALIDATION
    const { error } = registerValidation(req.body);
    if (error) 
        return res.status(400).send(error.details[0].message);

    //CHECK IF THE DATA IS NOT DUPLICATED
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user)
        return res.status(400).send(`Check your entries again, please`);

    // CHECK IF THE PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) 
        return res.status(400).send(`Check your entries again, please`);

    //CREATE AND ASSIGN A TOKEN FROM JWTJSONTOKEN
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    //ONCE EVERYTHING IS CHECKED
    res.send('SUCCESS!');

    
});

module.exports = router;
