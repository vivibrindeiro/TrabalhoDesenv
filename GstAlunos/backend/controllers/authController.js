const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'secreto'; 

async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ success: true, message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao criar usuário' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h' });
            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro ao autenticar usuário' });
    }
}

module.exports = { register, login };
