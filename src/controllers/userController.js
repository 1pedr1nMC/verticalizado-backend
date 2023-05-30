const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;


    const auth = async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await userModel.getUserInfo(email);
        if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        const isValidPassword = await bcrypt.compare(password, user[0].password);
        if (!isValidPassword) {
          return res.status(401).json({ message: "Invalid credentials Pa" });
        }
    
        const token = jwt.sign({ email: user.email }, SECRET, {
          expiresIn: "1h",
        });
        
        return res.status(200).json({ token });
      } catch (error) {
        console.error('Erro ao autenticar o usuário:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    };
 

const create = async (req, res) => {
try{
  const {
    state_id,
    city_id,
    name,
    email,
    cpf,
    sex,
    password,
    birth_date,
  } = req.body;
 
const hashedPassword = bcrypt.hashSync(password, 10);

  const active = 1;
  const updated_at = new Date();
  const created_at = new Date();
  const user = await userModel.createUser({
    state_id,
    city_id,
    name,
    email,
    cpf,
    sex,
    active: active,
    updated_at: updated_at,
    created_at: created_at,
    password: hashedPassword,
    birth_date,
  });

return res.status(200).json(user);
} catch (error) {
  if (error.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ message: "Email already registered" });
  }
  if (error.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(400).json({ message: "Invalid state or city" });
  }
  console.error("Erro ao criar o usuário:", error);
  return res.status(500).json({ message: "Internal server error" });
}
};
const getUserInfo = async (req, res) => {
  try{
    const { email } = req.body;
  const user = await userModel.getUserInfo(email);
  return res.status(200).json(user);
  }
  catch (error) {
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({ message: "Invalid state or city" });
    }
    console.error("Erro ao pegar informacao do  usuário:", error);
    return res.status(500).json({ message: "Internal server error" });
  }


};
const editUserController = async (req, res) => {
 try{
  const { email, name, state_id, city_id } = req.body;
  const user = await userModel.editUserInfo(email, name, state_id, city_id);
  return res.status(200).json(user);
 } catch{
  if (error.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(400).json({ message: "Invalid state or city" });
  }
  console.error("Erro ao editar o usuário:", error);
  return res.status(500).json({ message: "Internal server error" });
 }
};

const deleteUserController = async (req, res) => {
try{
  const { email } = req.body;
  const user = await userModel.deleteUser(email);
  return res.status(200).json(user);
} catch (error) {
  console.error("Erro ao deletar o usuário:", error);
  return res.status(500).json({ message: "Internal server error" });
}
};


module.exports = {
  getUserInfo,
  editUserController,
  deleteUserController,
  create,
  auth,
};
