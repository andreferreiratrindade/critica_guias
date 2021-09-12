import { Sequelize } from 'sequelize-typescript';
import { Config } from '../config/Config';
import { Critica } from '../models/criticaModel';
import { CriticaParametro } from '../models/criticaParametroModel';
import tedious from 'tedious';
import { CasoTeste } from '../models/casoTesteModel';
import { CasoTesteParametroExecucao } from '../models/casoTesteParametroExecucaoModel';
const dataBaseInfo = Config.databaseInfo();

console.log(dataBaseInfo);
export const sequelize = new Sequelize(dataBaseInfo.db, dataBaseInfo.username, dataBaseInfo.password, {
  dialect: "mssql",
  port: dataBaseInfo.port,
  host:dataBaseInfo.host,
  models: [Critica, CriticaParametro, CasoTeste, CasoTesteParametroExecucao],
  repositoryMode: true,
  dialectModule : tedious,
  logging:  dataBaseInfo.logging 
});

sequelize.authenticate()