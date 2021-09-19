import { Sequelize } from 'sequelize-typescript';
import { Config } from '../config/Config';
import { StoredProcedure } from '../models/storedProcedureModel';
import { StoredProcedureParametro } from '../models/storedProcedureParametroModel';
import tedious from 'tedious';
import { CasoTeste } from '../models/casoTesteModel';
import { CasoTesteParametroExecucao } from '../models/casoTesteParametroExecucaoModel';
import { CasoTesteColunaMock } from '../models/CasoTesteColunaMockModel';
import { StoredProcedureCobertura } from '../models/storedProcedureCoberturaModel';
import { StoredProcedureDependencia } from '../models/storedProcedureDependenciaModel';
const dataBaseInfo = Config.databaseInfo();

console.log(dataBaseInfo);
export const sequelize = new Sequelize(dataBaseInfo.db, dataBaseInfo.username, dataBaseInfo.password, {
  dialect: "mssql",
  port: dataBaseInfo.port,
  host:dataBaseInfo.host,
  models: [StoredProcedure, StoredProcedureParametro, CasoTeste, CasoTesteParametroExecucao, CasoTesteColunaMock, StoredProcedureCobertura, StoredProcedureDependencia],
  repositoryMode: true,
  dialectModule : tedious,
  logging:  dataBaseInfo.logging 
});

sequelize.authenticate()