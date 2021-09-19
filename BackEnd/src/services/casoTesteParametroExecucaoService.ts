import * as Jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator';
import { StoredProcedure } from '../models/storedProcedureModel';
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
    await check("storedProcedureParametroId")
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

      await this.adicionarValidation(req);


      const result = validationResult(req);
      if (!result.isEmpty()) {
        return RetornoRequest.Response(result.array(), null, res, HttpStatusCode.BAD_REQUEST);
      }

      let casoTesteParametroExecucao: any = {}

      casoTesteParametroExecucao = {
        casoTesteParametroExecucaoId: req.body.casoTesteParametroExecucaoId,
        casoTesteId: req.body.casoTesteId,
        storedProcedureParametroId: req.body.storedProcedureParametroId,
        valorParametroExecucao: req.body.valorParametroExecucao,
      };


      let consulta = await this._casoTesteParametroExecucaoRepository.findOne({ where: { casoTesteParametroExecucaoId: req.body.casoTesteParametroExecucaoId } });
      let resultCreate = {}
      console.log(consulta)
      if (!consulta) {
        resultCreate = await this._casoTesteParametroExecucaoRepository.create(casoTesteParametroExecucao, { isNewRecord: true })
      } else {
        resultCreate = await this._casoTesteParametroExecucaoRepository.update(casoTesteParametroExecucao, { where: { casoTesteParametroExecucaoId: req.body.casoTesteParametroExecucaoId } });

      }
      return RetornoRequest.Response(resultCreate, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      console.log(error)
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  public async listarPorStoredProcedure(req: any, res: any) {
    try {

      const parametros = await RepositoryQuery.RecuperaListagemCasoTesteParametroExecucaoPorStoredProcedure(req.params.storedProcedureId);

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }


  public async listarPorCasoTeste(req: any, res: any) {
    try {

      const parametros = await RepositoryQuery.RecuperaListagemCasoTesteParametroExecucaoPorCasoTeste(req.params.casoTesteId);

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }
}
