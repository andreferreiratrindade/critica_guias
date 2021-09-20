import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import * as Config from '../config/config.json'
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
export class StoredProcedureCoberturaService {


    public async adicionar(conteudo: _modelsInput.StoredProcedure) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/storedProcedureCobertura",

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

    public async listar(storedProcedureId:number) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + `/storedProcedureCobertura/${storedProcedureId}`,
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.obj;
        } catch (error) {
            return null
        }
    }

}