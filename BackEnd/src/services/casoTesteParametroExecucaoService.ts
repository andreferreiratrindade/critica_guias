import * as Jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator';
import { Critica } from '../models/criticaModel';
import { Repository } from 'sequelize-typescript';
import { RetornoRequest } from '../utils/retornoRequest';
import HttpStatusCode from '../constants/HttpStatusCode';
import { Config } from '../config/Config';
import { RepositoryQuery } from '../repositories/repositoryQuery';
import { CasoTesteParametroExecucao } from '../models/casoTesteParametroExecucaoModel';


export class CasoTesteParametroExecucaoService {

  private readonly _casoTesteParametroExecucaoRepository !: Repository<CasoTesteParametroExecucao>

  constructor(_casoTesteParametroExecucaoRepository: Repository<CasoTesteParametroExecucao>) {
    this._casoTesteParametroExecucaoRepository = _casoTesteParametroExecucaoRepository;
  }

  public async adicionarValidation(req: any) {
    await check("criticaParametroId")
      .notEmpty()
      .withMessage("Campo de preenchimento obrigatório")
      .run(req);

      await check("casoTesteId")
      .notEmpty()
      .withMessage("Campo de preenchimento obrigatório")
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
      let casoTesteParametroExecucao = {
        casoTesteId: req.body.casoTesteId,
        criticaParametroId: req.body.criticaParametroId,
        valorParametroExecucao: req.body.valorParametroExecucao,
      };
      console.log("Salvando");

      let resultCreate = await this._casoTesteParametroExecucaoRepository.create(casoTesteParametroExecucao, { isNewRecord: true })

      return RetornoRequest.Response(resultCreate, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  public async listarPorCritica(req: any, res: any) {
    try {
  
      const parametros  =  await RepositoryQuery.RecuperaListagemCasoTesteParametroExecucaoPorCritica(req.params.criticaId); 

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  
  public async listarPorCasoTeste(req: any, res: any) {
    try {
  
      const parametros  =  await RepositoryQuery.RecuperaListagemCasoTesteParametroExecucaoPorCasoTeste(req.params.casoTesteId); 

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }
}
