import { Sequelize } from 'sequelize-typescript';
import { Config } from '../config/Config';
import { Critica } from '../models/criticaModel';
import { CriticaParametro } from '../models/criticaParametroModel';

const dataBaseInfo = Config.databaseInfo();

console.log(dataBaseInfo);
export const sequelize = new Sequelize(dataBaseInfo.db, dataBaseInfo.username, dataBaseInfo.password, {
  dialect: "mysql",
  port: dataBaseInfo.port,
  host:dataBaseInfo.host,
  models: [Critica, CriticaParametro],
  repositoryMode: true,
  logging:  dataBaseInfo.logging 
});

sequelize.authenticate()