import * as Jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator';
import { StoredProcedureParametro } from '../models/storedProcedureParametroModel';
import { Repository } from 'sequelize-typescript';
import { RetornoRequest } from '../utils/retornoRequest';
import HttpStatusCode from '../constants/HttpStatusCode';
import { Config } from '../config/Config';
import { RepositoryQuery } from '../repositories/repositoryQuery';


export class StoredProcedureParametroService {

  private readonly _storedProcedureParametroRepository !: Repository<StoredProcedureParametro>

  constructor(storedProcedureParametroRepository: Repository<StoredProcedureParametro>) {
    this._storedProcedureParametroRepository = storedProcedureParametroRepository;
  }

  public async adicionarValidation(req: any) {
    await check("idParametro")
      .notEmpty()
      .withMessage("Campo de preenchimento obrigatório")
      .run(req);

    await check("seqStoredProcedureParametro")
      .notEmpty()
      .withMessage("Campo de preenchimento obrigatório")
      .run(req);

      await check("storedProcedureId")
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
      let storedProcedureParametro = {
        idParametro: req.body.idParametro,
        seqStoredProcedureParametro: req.body.seqStoredProcedureParametro,
        storedProcedureId: req.body.storedProcedureId,
      };
      console.log("Salvando");

      let resultCreate = await this._storedProcedureParametroRepository.create(storedProcedureParametro, { isNewRecord: true })

      return RetornoRequest.Response(resultCreate, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  private async listagemValidacao(req: any){
    await check("storedProcedureId")
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

  
      const parametros  =  await RepositoryQuery.RecuperaListagemParametroStoredProcedure(req.params.storedProcedureId); 

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }
  public async atualizarValidacao(req: any){
    await check("storedProcedureIdParametro")
    .notEmpty()
    .withMessage("Campo é de preenchimento obrigatório")
    .run(req);

    await check("seqStoredProcedureParametro")
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
    let storedProcedureParametro = {seqStoredProcedureParametro : req.body.seqStoredProcedureParametro };
    let resultUpdate= await this._storedProcedureParametroRepository.update(storedProcedureParametro, {where:{storedProcedureIdParametro:req.body.storedProcedureIdParametro}});

    return RetornoRequest.Response(resultUpdate,null,res,HttpStatusCode.OK);
  }

  public async deletarValidacao(req: any){
    await check("storedProcedureParametroId")
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

    const resultDelete = await this._storedProcedureParametroRepository.destroy({where:{storedProcedureIdParametro: req.params.storedProcedureIdParametro}});

    return RetornoRequest.Response(resultDelete,null,res,HttpStatusCode.OK);
  }

}