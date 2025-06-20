const supabase = require('../config/supabase.js');
const bcrypt = require('bcrypt');
const saltrounds = 10;
const getAllUsers = async (req , res) =>{
    const {data,error} = await supabase.from('users').select('*');
    if(error){
        return res.status(500).json({status: 'error', error});
    }
    res.status(200).json(data);
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('uid', id)
        .single();

    if (error) {
        return res.status(500).json({ status: 'error', error });
    }

    if (!data) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.status(200).json(data);
};

const createUser = async (req, res) => {    
    const { name, email, phone, address, dob, pic_url,password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    
    const { data, error } = await supabase
        .from('users')
        .insert([{ name, email, phone, address, dob, pic_url,hashedPassword }])
        .select();

    if (error) {
        return res.status(500).json({ status: 'error', error });
    }

    res.status(201).json(data[0]);
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, dob, pic_url, password } = req.body;
    const hashedPassword = bcrypt.hash(password, saltrounds);
    const { data, error } = await supabase
        .from('users')
        .update({ name, email, phone, address, dob, pic_url , hashedPassword })
        .eq('uid', id)
        .select();

    if (error) {
        return res.status(500).json({ status: 'error', error });
    }

    if (data.length === 0) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.status(200).json(data[0]);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('uid', id)
        .select();

    if (error) {
        return res.status(500).json({ status: 'error', error });
    }

    if (data.length === 0) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.status(200).json({ status: 'success', message: 'User deleted successfully' });
};
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}