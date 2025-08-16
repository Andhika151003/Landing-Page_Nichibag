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

//Login user 
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    //this password plain text
    if (user.password !== password) {
      return res.status(400).json({ message: "Password mu salah cak!"});
    }
    res.json({message: "Login Berhasil", user});
  }catch (error) {
    res.status(500).json({message: error.message});
  }

}