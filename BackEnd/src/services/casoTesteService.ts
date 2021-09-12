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


export class CasoTesteService {

  private readonly _casoTesteRepository !: Repository<CasoTeste>

  constructor(casoTesteRepository: Repository<CasoTeste>) {
    this._casoTesteRepository = casoTesteRepository;
  }

  public async adicionarValidation(req: any) {
    await check("criticaId")
      .notEmpty()
      .withMessage("Campo de preenchimento obrigatório")
      .run(req);

    await check("CasoTesteSituacaoId")
      .notEmpty()
      .withMessage("Campo de preenchimento obrigatório")
      .run(req);

    await check("NmeCasoTeste")
      .notEmpty()
      .withMessage("Campo Nome é de preenchimento obrigatório")
      .run(req);
  }


  public async adicionar(req: any, res: any) {
    try {
      console.log(req.body);

      await this.adicionarValidation(req);


      const result = validationResult(req);
      if (!result.isEmpty()) {
        return RetornoRequest.Response(result.array(), null, res, HttpStatusCode.BAD_REQUEST);
      }
      let casoTeste = {
        criticaId: req.body.criticaId,
        casoTesteSituacaoId: Constants.CasoTesteSituacao.AGUARDANDO_PROCESSAMENTO,
        nmeCasoTeste: req.body.nmeCasoTeste,
        nmeEsperado : req.body.nmeEsperado
      };
      console.log("Salvando");

      let resultCreate = await this._casoTesteRepository.create(casoTeste, { isNewRecord: true })

      return RetornoRequest.Response(resultCreate, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }


  private async listagemValidacao(req: any){
    await check("criticaId")
    .notEmpty()
    .withMessage("Campo de preenchimento obrigatório")
    .isNumeric()
    .withMessage("Campo do tipo numerico")
    .run(req);
  }

  public async listar(req: any, res: any) {
    try {
      await this.listagemValidacao(req);

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

  
      const parametros  =  await RepositoryQuery.RecuperaListagemCasoTeste(req.params.criticaId); 

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }
}
