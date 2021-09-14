import * as Jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator';
import { Critica } from '../models/criticaModel';
import { Repository } from 'sequelize-typescript';
import { RetornoRequest } from '../utils/retornoRequest';
import HttpStatusCode from '../constants/HttpStatusCode';
import { Config } from '../config/Config';
import { RepositoryQuery } from '../repositories/repositoryQuery';


export class CriticaService {

  private readonly _criticaRepository !: Repository<Critica>

  constructor(criticaRepository: Repository<Critica>) {
    this._criticaRepository = criticaRepository;
  }

  public async adicionarValidation(req: any) {
    await check("nmeCritica")
      .notEmpty()
      .withMessage("Campo de preenchimento obrigatório")
      .run(req);

    await check("desCritica")
      .notEmpty()
      .withMessage("Campo de preenchimento obrigatório")
      .run(req);

    await check("nroCritica")
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
      let critica = {
        nmeCritica: req.body.nmeCritica,
        desCritica: req.body.desCritica,
        nroCritica: req.body.nroCritica,
        nmeStoredProcedure : req.body.nmeStoredProcedure
      };
      console.log("Salvando");

      let resultCreate = await this._criticaRepository.create(critica, { isNewRecord: true })

      await RepositoryQuery.ExecutaMonta_parametro_critica(resultCreate.criticaId); 

      await RepositoryQuery.ExecutaMonta_critica_tabela_dependencia(); 

      return RetornoRequest.Response(resultCreate, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  public async listar(req: any, res: any) {
    try {
  
      const parametros  =  await RepositoryQuery.RecuperaListagemCritica(); 

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }
}
