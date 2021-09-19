import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import * as Config from '../config/config.json'
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
export class CasoTesteColunaMockService {
    


    public async listar(casoTesteId : number, storedProcedureDependenciaId: number) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + `/casoTesteColunaMock/${casoTesteId}/${storedProcedureDependenciaId}`,
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.obj;
        } catch (error) {
            return null
        }
    }

    public async adicionar(conteudo: _modelsInput.CasoTesteDependenciaColuna) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/casoTesteColunaMock",
            requiresToken: true,
            payload: conteudo
        }
        try {
            let result = await HttpClient.post(parameters);
            let notify = result.ok ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);

            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }
}