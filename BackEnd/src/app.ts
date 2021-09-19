
import express from 'express';

import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import { sequelize } from './instances/sequelize';
import { StoredProcedureParametro } from './models/storedProcedureParametroModel';
import { StoredProcedure } from './models/storedProcedureModel';
import { Config } from './config/Config';
import { StoredProcedureRoute } from './routes/storedProcedureRoute';
import { StoredProcedureParametroRoute } from './routes/storedProcedureParametroRoute';
import { ParametroRoute } from './routes/parametroRoute';
import { CasoTeste } from './models/casoTesteModel';
import { CasoTesteRoute } from './routes/casoTesteRoute';
import { BuildMockRoute } from './routes/buildMockRoute';
import { CasoTesteParametroExecucao } from './models/casoTesteParametroExecucaoModel';
import { CasoTesteParametroExecucaoRoute } from './routes/casoTesteParametroExecucaoRoute';
import { CasoTesteColunaMockRoute } from './routes/casoTesteColunaMockRoute';
import { StoredProcedureDependenciaRoute } from './routes/storedProcedureDependenciaRoute';
import { CasoTesteColunaMock } from './models/CasoTesteColunaMockModel';
import { TesteValidacaoRoute } from './routes/testeValidacao';
import { StoredProcedureCobertura } from './models/storedProcedureCoberturaModel';
import { StoredProcedureCoberturaRoute } from './routes/storedProcedureCoberturaRoute';
const app = express();
const apiRoutes = express.Router()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger('dev'));

// middleware


let storedProcedureRepository = sequelize.getRepository(StoredProcedure);
let storedProcedureCoberturaRepository = sequelize.getRepository(StoredProcedureCobertura);
let storedProcedureParametroRepository = sequelize.getRepository(StoredProcedureParametro);
let casoTesteRepository = sequelize.getRepository(CasoTeste);
let casoTesteParametroExecucaoRepository = sequelize.getRepository(CasoTesteParametroExecucao);
let casoTesteColunaMockRepository = sequelize.getRepository(CasoTesteColunaMock);


let casoTesteRoute = new CasoTesteRoute(casoTesteRepository);
let storedProcedureRoute = new StoredProcedureRoute(storedProcedureRepository);
let storedProcedureParametroRoute = new StoredProcedureParametroRoute(storedProcedureParametroRepository);
let parametroRoute = new ParametroRoute();
let buildMockRoute = new  BuildMockRoute();
let casoTesteParametroExecucaoRoute = new CasoTesteParametroExecucaoRoute(casoTesteParametroExecucaoRepository);
let casoTesteColunaMockRoute = new CasoTesteColunaMockRoute(casoTesteColunaMockRepository);
let storedProcedureDependenciaRoute = new StoredProcedureDependenciaRoute();
let testeValidacaoRoute = new TesteValidacaoRoute(storedProcedureCoberturaRepository);
let storedProcedureCoberturaRoute = new StoredProcedureCoberturaRoute(storedProcedureCoberturaRepository);
// public
app.use('/storedProcedureParametro', storedProcedureParametroRoute.montaRotas());
app.use('/storedProcedure', storedProcedureRoute.montaRotas());
app.use('/casoTeste', casoTesteRoute.montaRotas());
app.use('/parametro', parametroRoute.montaRotas());
app.use('/buildMock', buildMockRoute.montaRotas());
app.use('/casoTesteParametroExecucao', casoTesteParametroExecucaoRoute.montaRotas());
app.use('/storedProcedureDependencia', storedProcedureDependenciaRoute.montaRotas());
app.use('/casoTesteColunaMock', casoTesteColunaMockRoute.montaRotas());
app.use('/testeValidacao', testeValidacaoRoute.montaRotas());
app.use('/storedProcedureCobertura', storedProcedureCoberturaRoute.montaRotas());

storedProcedureCoberturaRoute
app.use('/api', apiRoutes);

var port = Config.serverInfo().port;

app.listen(process.env.PORT || port);

console.log('App started on port ' + port);