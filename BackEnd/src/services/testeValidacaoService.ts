import HttpStatusCode from '../constants/HttpStatusCode'
import { RepositoryQuery } from '../repositories/repositoryQuery'
import { RetornoRequest } from '../utils/retornoRequest'
import { IHttpClientRequestParameters } from './interfaces/IHttpClientRequestParameters'
import { Config } from '../config/Config'
import { Repository } from 'sequelize-typescript'
import { StoredProcedureCobertura } from '../models/storedProcedureCoberturaModel'
import { HttpClient } from './HttpClientService'
export class TesteValidacaoService {
  private readonly _storedProcedureCoberturaRepository!: Repository<
    StoredProcedureCobertura
  >

  constructor(
    storedProcedureCoberturaRepository: Repository<StoredProcedureCobertura>,
  ) {
    this._storedProcedureCoberturaRepository = storedProcedureCoberturaRepository
  }
  public async executarTestePorCasoTeste(req: any, res: any) {
    try {
      console.log('Teste de nome caso teste')
      console.log(req.body)

      let casoTeste = {
        nmeCasoTeste: req.body.casoTesteId,
      }

      const parametros = await RepositoryQuery.ExecuteGerarCasoTeste(
        req.body.casoTesteId,
      )

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK)
    } catch (error) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST)
    }
  }

  public async executarTestePorStoredProcedure(req: any, res: any) {
    try {
      console.log('Teste de nome caso teste')
      console.log(req.body)

      try {
        let parameters: IHttpClientRequestParameters = {
          url:
            Config.environmentCurrently().apiCobertura +
            `Cobertura?storedProcedureId=${req.body.storedProcedureId}`,
          requiresToken: false,
        }

        let result = await HttpClient.get(parameters)
        let storedProcedureCobertura = {
          storedProcedureId: req.body.storedProcedureId,
          totalCoberto: result.data.totalCoberto,
          totalEtapa: result.data.totalEtapas,
          coberturaHtml: result.data.txtHtml,
        }

        let consulta = await this._storedProcedureCoberturaRepository.findOne({
          where: { storedProcedureId: req.body.storedProcedureId },
        })

        let resultCreate = {}
        if (!consulta) {
          resultCreate = await this._storedProcedureCoberturaRepository.create(
            storedProcedureCobertura,
            { isNewRecord: true },
          )
        } else {
          resultCreate = await this._storedProcedureCoberturaRepository.update(
            storedProcedureCobertura,
            { where: { storedProcedureId: req.body.storedProcedureId } },
          )
        }
      } catch (error) {
        RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST)
      }

      const parametros = {} // await RepositoryQuery.ExecutaMontaStoredProcedureDependencias(req.body.storedProcedureId);

      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK)
    } catch (error) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST)
    }
  }
}
