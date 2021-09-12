import * as Jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator';
import { Critica } from '../models/criticaModel';
import { Repository } from 'sequelize-typescript';
import { RetornoRequest } from '../utils/retornoRequest';
import HttpStatusCode from '../constants/HttpStatusCode';
import { Config } from '../config/Config';
import { CasoTeste } from '../models/casoTesteModel';
import { Constants } from '../constants/Constants';
import { RepositoryQuery } from '../repositories/repositoryQuery';


export class BuildMockService {


  public async recuperaPrestadores(req: any, res: any) {
    try {
     

  
      const parametros  =  await RepositoryQuery.RecuperaPrestadoresMock(); 

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  
  public async recuperaBeneficiarios(req: any, res: any) {
    try {
     

  
      const parametros  =  await RepositoryQuery.RecuperaBeneficiariosMock(); 

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }
}
