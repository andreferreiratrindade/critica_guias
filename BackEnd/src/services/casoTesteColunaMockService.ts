import * as Jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator';
import { Parametro } from '../models/parametroModel';
import { Repository } from 'sequelize-typescript';
import { RetornoRequest } from '../utils/retornoRequest';
import HttpStatusCode from '../constants/HttpStatusCode';
import { Config } from '../config/Config';
import { RepositoryQuery } from '../repositories/repositoryQuery';
import { CasoTesteColunaMock } from '../models/CasoTesteColunaMockModel';


export class CasoTesteColunaMockService {
  private readonly _casoTesteColunaMockRepository !: Repository<CasoTesteColunaMock>

  constructor(casoTesteColunaMockRepository: Repository<CasoTesteColunaMock>) {
    this._casoTesteColunaMockRepository = casoTesteColunaMockRepository;
  }


  public async listar(req: any, res: any) {
    try {

      const parametros = await RepositoryQuery.RecuperaListagemCasoTesteColunaMock(req.params.storedProcedureDependenciaId, req.params.casoTesteId);

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }



  public async adicionar(req: any, res: any) {
    try {
      console.log(req.body);

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return RetornoRequest.Response(result.array(), null, res, HttpStatusCode.BAD_REQUEST);
      }
      let casoTesteColunaMock = {
        casoTesteColunaMockId: req.body.casoTesteColunaMockId,
        casoTesteId: req.body.casoTesteId,
        storedProcedureDependenciaColunaId: req.body.storedProcedureDependenciaColunaId,
        valorColunaMock: req.body.valorColunaMock
      };

      let resultCreate = await this._casoTesteColunaMockRepository.upsert(casoTesteColunaMock)

      return RetornoRequest.Response(resultCreate, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

}

