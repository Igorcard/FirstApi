import jwt from 'jsonwebtoken';
import User from '../models/user';
import authConfig from '../../config/auth.js'

class SessionController{
  async store(req,res){
    const {email, password} = req.body;

    //Verifica se existe email
    const user = await User.findOne({where : {email}});

    if(!user){
      return res.status(401).json({error: 'Usuario não existe'});
    };

    //Verifica se a senha está correta
    if(!(await user.checkPassword(password))){
      return res.status(401).json({error: 'Senha incorreta'});
    };

    const {id, name}= user;

    return res.json({
      user:{
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      )
    });
  };
};

export default new SessionController();
