import * as Jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator';
import { StoredProcedure } from '../models/storedProcedureModel';
import { Repository } from 'sequelize-typescript';
import { RetornoRequest } from '../utils/retornoRequest';
import HttpStatusCode from '../constants/HttpStatusCode';
import { Config } from '../config/Config';
import { RepositoryQuery } from '../repositories/repositoryQuery';


export class StoredProcedureService {

  private readonly storedProcedureRepository !: Repository<StoredProcedure>

  constructor(storedProcedureRepository: Repository<StoredProcedure>) {
    this.storedProcedureRepository = storedProcedureRepository;
  }

  public async adicionarValidation(req: any) {
    await check("nmeStoredProcedure")
      .notEmpty()
      .withMessage("Campo de preenchimento obrigatório")
      .run(req);

    await check("desStoredProcedure")
      .notEmpty()
      .withMessage("Campo de preenchimento obrigatório")
      .run(req);

    await check("nroStoredProcedure")
      .notEmpty()
      .withMessage("Campo Nome é de preenchimento obrigatório")
      .isNumeric()
      .withMessage("Campo do tipo numerico")
      .run(req);
  }


  public async adicionar(req: any, res: any) {
    try {
      console.log("create");
      console.log(req.body);

      await this.adicionarValidation(req);


      const result = validationResult(req);
      if (!result.isEmpty()) {
        return RetornoRequest.Response(result.array(), null, res, HttpStatusCode.BAD_REQUEST);
      }
      let storedProcedure = {
        nmeStoredProcedure: req.body.nmeStoredProcedure,
      };
      console.log("Salvando");

      let resultCreate = await this.storedProcedureRepository.create(storedProcedure, { isNewRecord: true })

      await RepositoryQuery.ExecutaMonta_parametro_critica(resultCreate.storedProcedureId); 

      return RetornoRequest.Response(resultCreate, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  public async listar(req: any, res: any) {
    try {
  
      const parametros  =  await RepositoryQuery.RecuperaListagemStoredProcedure(); 

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }
}
