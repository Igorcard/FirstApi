import Sequelize from "sequelize";
import databaseConfig from '../config/database';
import User from '../app/models/user';

const models = [User];

class Database{
  constructor(){
    this.init();
  }

  init(){
    //Conexão do banco com models
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }

}

export default new Database();
