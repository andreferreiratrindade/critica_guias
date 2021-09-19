import * as Jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator';
import { Parametro } from '../models/parametroModel';
import { Repository } from 'sequelize-typescript';
import { RetornoRequest } from '../utils/retornoRequest';
import HttpStatusCode from '../constants/HttpStatusCode';
import { Config } from '../config/Config';
import { RepositoryQuery } from '../repositories/repositoryQuery';


export class StoredProcedureDependenciaService {



  public async listar(req: any, res: any) {
    try {

      const parametros  =  await RepositoryQuery.RecuperaListagemStoredProcedureDependencia(req.params.storedProcedureId); 

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  

}
