
import express from 'express';

import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import { sequelize } from './instances/sequelize';
import { CriticaParametro } from './models/criticaParametroModel';
import { Critica } from './models/criticaModel';
import { Config } from './config/Config';
import { CriticaRoute } from './routes/criticaRoute';
import { CriticaParametroRoute } from './routes/criticaParametroRoute';
import { ParametroRoute } from './routes/parametroRoute';
import { CasoTeste } from './models/casoTesteModel';
import { CasoTesteRoute } from './routes/casoTesteRoute';
import { BuildMockRoute } from './routes/buildMockRoute';
import { CasoTesteParametroExecucao } from './models/casoTesteParametroExecucaoModel';
import { CasoTesteParametroExecucaoRoute } from './routes/casoTesteParametroExecucaoRoute';
import { CasoTesteColunaMockRoute } from './routes/casoTesteColunaMockRoute';
import { CriticaTabelaDependenciaRoute } from './routes/criticaTabelaDependenciaRoute';
import { CasoTesteColunaMock } from './models/CasoTesteColunaMockModel';
import { TesteValidacaoRoute } from './routes/testeValidacao';
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


let criticaRepository = sequelize.getRepository(Critica);
let criticaParametroRepository = sequelize.getRepository(CriticaParametro);
let casoTesteRepository = sequelize.getRepository(CasoTeste);
let casoTesteParametroExecucaoRepository = sequelize.getRepository(CasoTesteParametroExecucao);
let casoTesteColunaMockRepository = sequelize.getRepository(CasoTesteColunaMock);

let casoTesteRoute = new CasoTesteRoute(casoTesteRepository);
let criticaRoute = new CriticaRoute(criticaRepository);
let criticaParametroRoute = new CriticaParametroRoute(criticaParametroRepository);
let parametroRoute = new ParametroRoute();
let buildMockRoute = new  BuildMockRoute();
let casoTesteParametroExecucaoRoute = new CasoTesteParametroExecucaoRoute(casoTesteParametroExecucaoRepository);
let casoTesteColunaMockRoute = new CasoTesteColunaMockRoute(casoTesteColunaMockRepository);
let criticaTabelaDependenciaRoute = new CriticaTabelaDependenciaRoute();
let testeValidacaoRoute = new TesteValidacaoRoute();
// public
app.use('/criticaParametro', criticaParametroRoute.montaRotas());
app.use('/critica', criticaRoute.montaRotas());
app.use('/casoTeste', casoTesteRoute.montaRotas());
app.use('/parametro', parametroRoute.montaRotas());
app.use('/buildMock', buildMockRoute.montaRotas());
app.use('/casoTesteParametroExecucao', casoTesteParametroExecucaoRoute.montaRotas());
app.use('/criticaTabelaDependencia', criticaTabelaDependenciaRoute.montaRotas());
app.use('/casoTesteColunaMock', casoTesteColunaMockRoute.montaRotas());
app.use('/testeValidacao', testeValidacaoRoute.montaRotas());
app.use('/api', apiRoutes);

var port = Config.serverInfo().port;

app.listen(process.env.PORT || port);

console.log('App started on port ' + port);