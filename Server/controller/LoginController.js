import User from '../models/LoginAdmin.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getUserById = async (req, res) => {
  try { 
    const users = await User.findById(req.params.id);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const saveUser = async (req, res) => {
  const users = new User (req.body);
  try { 
    const inserteduser = await users.save();
    res.status(201).json(inserteduser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}