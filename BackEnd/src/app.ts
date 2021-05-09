
import express from 'express';

import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import { sequelize } from './instances/sequelize';
import { CriticaParametro  } from './models/criticaParametroModel';
import { Critica } from './models/criticaModel';
import { Config } from './config/Config';
import { CriticaRoute } from './routes/criticaRoute';
import { CriticaParametroRoute } from './routes/criticaParametroRoute';
import { ParametroRoute } from './routes/parametroRoute';
const app = express();
const apiRoutes = express.Router()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(logger('dev'));

// middleware


let criticaRepository =  sequelize.getRepository(Critica);
let criticaParametroRepository =  sequelize.getRepository(CriticaParametro);
let criticaRoute = new CriticaRoute(criticaRepository);
let criticaParametroRoute = new CriticaParametroRoute(criticaParametroRepository);
let parametroRoute = new ParametroRoute();
// public
app.use('/criticaParametro',criticaParametroRoute.montaRotas() );

 app.use('/critica',criticaRoute.montaRotas() );
 app.use('/parametro',parametroRoute.montaRotas() );

 app.use('/api',apiRoutes);


var port = Config.serverInfo().port;

app.listen(process.env.PORT || port);

console.log('App started on port ' + port);