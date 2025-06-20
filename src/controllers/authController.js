const supabase = require('../config/supabase.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltrounds = 10;

const login = async (req,res)=>{
    const {email,password} = req.body;

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
    if (error) {
        return res.status(500).json({ status: 'error', error });
    }
    if (!data) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, data.password);
    if (!isPasswordValid) {
        return res.status(401).json({ status: 'error', message: 'Invalid password' });
    }
    
    // Create token
    const token = jwt.sign(
        { id: data.id, email: data.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '24h' }
    );
    
    res.status(200).json({ 
        status: 'success', 
        message: 'Login successful', 
        token,
        user: {
            id: data.id,
            email: data.email,
            name: data.name
        }
    });
}

const tokenBlacklist = new Set();

const logout = (req, res) => {
    try {
        // Get token from authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        
        if (token) {
            // Add token to blacklist
            tokenBlacklist.add(token);
            
            // You would typically store this in Redis or database in production
            console.log('Token blacklisted');
        }
        
        res.status(200).json({ status: 'success', message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Logout failed' });
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password, phone, address, dob } = req.body;
        
        // Check if user already exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
            
        if (existingUser) {
            return res.status(409).json({ status: 'error', message: 'User already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, saltrounds);

        
        // Create new user
        const { data, error } = await supabase
            .from('users')
            .insert([
                { 
                    name, 
                    email, 
                    password:  hashedPassword, 
                    phone, 
                    address, 
                    dob,
                    pic_url: 'https://static.thenounproject.com/png/avatar-icon-881504-512.png'
                }
            ])
            .select();
            
        if (error) {
            return res.status(500).json({ status: 'error', error });
        }
        
        // Create token
        const token = jwt.sign(
            { id: data[0].id, email: data[0].email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '24h' }
        );
        
        res.status(201).json({
            status: 'success',
            message: 'Registration successful',
            token,
            user: {
                id: data[0].id,
                email: data[0].email,
                name: data[0].name
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Registration failed', error: error.message });
    }
}

module.exports = {
    login,
    logout,
    register
};