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

  public async atualizarNmeCasoTesteValidation(req: any) {

    await check("casoTesteId")
    .notEmpty()
    .withMessage("Campo de preenchimento obrigatório")
    .run(req);

    await check("nmeCasoTeste")
      .notEmpty()
      .withMessage("Campo Nome é de preenchimento obrigatório")
      .run(req);
  }

  public async atualizarNmeEsperadoValidation(req: any) {

    await check("casoTesteId")
    .notEmpty()
    .withMessage("Campo de preenchimento obrigatório")
    .run(req);

    await check("nmeEsperado")
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
        casoTesteSituacaoId: Constants.CasoTesteSituacao.EM_EDICAO,
        nmeCasoTeste: req.body.nmeCasoTeste
      };
      console.log("Salvando");

      let resultCreate = await this._casoTesteRepository.create(casoTeste, { isNewRecord: true })

      return RetornoRequest.Response(resultCreate, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  public async atualizarNmeEsperado(req: any, res: any) {
    try {
      console.log(req.body);

      await this.atualizarNmeEsperadoValidation(req);


      const result = validationResult(req);
      if (!result.isEmpty()) {
        return RetornoRequest.Response(result.array(), null, res, HttpStatusCode.BAD_REQUEST);
      }
      let casoTeste = {
        nmeEsperado: req.body.nmeEsperado
      };

      let resultUpdateResposta= await this._casoTesteRepository.update(casoTeste, {where:{casoTesteId:req.body.casoTesteId}});

      return RetornoRequest.Response(resultUpdateResposta, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  
  public async atualizarNmeCasoTeste(req: any, res: any) {
    try {
      console.log("Teste de nome caso teste");
      console.log(req.body);

      await this.atualizarNmeCasoTesteValidation(req);


      const result = validationResult(req);
      if (!result.isEmpty()) {
        return RetornoRequest.Response(result.array(), null, res, HttpStatusCode.BAD_REQUEST);
      }
      let casoTeste = {
        nmeCasoTeste: req.body.nmeCasoTeste
      };

      let resultUpdateResposta= await this._casoTesteRepository.update(casoTeste, {where:{casoTesteId:req.body.casoTesteId}});

      return RetornoRequest.Response(resultUpdateResposta, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  private async listagemValidacao(req: any) {
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


      const parametros = await RepositoryQuery.RecuperaListagemCasoTeste(req.params.criticaId);

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }



  public async recuperaPorId(req: any, res: any) {
    try {
    
      console.log(req)
      let casoTeste = { casoTesteId: req.params.casoTesteId };
      console.log(casoTeste)
      const u = await this._casoTesteRepository.findOne({ where: casoTeste });

      return RetornoRequest.Response(u, null, res, HttpStatusCode.OK);

    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  // public async recuperaPorCriticaId(req: any, res: any) {
  //   try {
  //     await this.recuperaPorCasoTesteIdValidacao(req);

  //     const result = validationResult(req);
  //     if (!result.isEmpty()) {
  //       return res.status(400).json({ errors: result.array() });
  //     }

  //     let casoTeste = { casoTesteid: req.query.casoTesteId };
  //     const u = await this._casoTesteRepository.findOne({ where: casoTeste });

  //     return RetornoRequest.Response(u, null, res, HttpStatusCode.OK);

  //   } catch (error: any) {
  //     RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
  //   }
  // }

  

}
