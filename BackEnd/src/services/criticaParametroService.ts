import * as Jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator';
import { CriticaParametro } from '../models/criticaParametroModel';
import { Repository } from 'sequelize-typescript';
import { RetornoRequest } from '../utils/retornoRequest';
import HttpStatusCode from '../constants/HttpStatusCode';
import { Config } from '../config/Config';
import { RepositoryQuery } from '../repositories/repositoryQuery';


export class CriticaParametroService {

  private readonly _criticaParametroRepository !: Repository<CriticaParametro>

  constructor(criticaParametroRepository: Repository<CriticaParametro>) {
    this._criticaParametroRepository = criticaParametroRepository;
  }

  public async adicionarValidation(req: any) {
    await check("idParametro")
      .notEmpty()
      .withMessage("Campo de preenchimento obrigatório")
      .run(req);

    await check("seqCriticaParametro")
      .notEmpty()
      .withMessage("Campo de preenchimento obrigatório")
      .run(req);

      await check("idCritica")
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
      let criticaParametro = {
        idParametro: req.body.idParametro,
        seqCriticaParametro: req.body.seqCriticaParametro,
        idCritica: req.body.idCritica,
      };
      console.log("Salvando");

      let resultCreate = await this._criticaParametroRepository.create(criticaParametro, { isNewRecord: true })

      return RetornoRequest.Response(resultCreate, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  private async listagemValidacao(req: any){
    await check("idCritica")
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

  
      const parametros  =  await RepositoryQuery.RecuperaListagemParametroCritica(req.params.idCritica); 

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }
  public async atualizarValidacao(req: any){
    await check("idCriticaParametro")
    .notEmpty()
    .withMessage("Campo é de preenchimento obrigatório")
    .run(req);

    await check("seqCriticaParametro")
    .notEmpty()
    .withMessage("Campo é de preenchimento obrigatório")
    .run(req);

  }

  
  public async atualizar(req: any, res: any){
    await this.atualizarValidacao(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    let criticaParametro = {seqCriticaParametro : req.body.seqCriticaParametro };
    let resultUpdate= await this._criticaParametroRepository.update(criticaParametro, {where:{idCriticaParametro:req.body.idCriticaParametro}});

    return RetornoRequest.Response(resultUpdate,null,res,HttpStatusCode.OK);
  }

  public async deletarValidacao(req: any){
    await check("idCriticaParametro")
    .notEmpty()
    .withMessage("Campo é de preenchimento obrigatório")
    .isNumeric()
    .withMessage("Campo deverá ser do tipo numerico")
    .run(req);

  }

  public async deletar(req: any, res: any){
    await this.deletarValidacao(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const resultDelete = await this._criticaParametroRepository.destroy({where:{idCriticaParametro: req.params.idCriticaParametro}});

    return RetornoRequest.Response(resultDelete,null,res,HttpStatusCode.OK);
  }

}