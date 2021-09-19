import * as Jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
import { Parametro } from '../models/parametroModel'
import { Repository } from 'sequelize-typescript'
import { RetornoRequest } from '../utils/retornoRequest'
import HttpStatusCode from '../constants/HttpStatusCode'
import { Config } from '../config/Config'
import { RepositoryQuery } from '../repositories/repositoryQuery'
import { StoredProcedureCobertura } from '../models/storedProcedureCoberturaModel'

export class StoredProcedureCoberturaService {
  private readonly _storedProcedureCoberturaRepository!: Repository<
    StoredProcedureCobertura
  >

  constructor(
    storedProcedureCoberturaRepository: Repository<StoredProcedureCobertura>,
  ) {
    this._storedProcedureCoberturaRepository = storedProcedureCoberturaRepository
  }

  public async listar(req: any, res: any) {
    try {
      let consulta = await this._storedProcedureCoberturaRepository.findOne({
        where: { storedProcedureId: req.params.storedProcedureId },
      })
      return RetornoRequest.Response(consulta, null, res, HttpStatusCode.OK)
    } catch (error) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST)
    }
  }
}
