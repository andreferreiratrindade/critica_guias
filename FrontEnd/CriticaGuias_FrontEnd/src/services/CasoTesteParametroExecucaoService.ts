import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import * as Config from '../config/config.json'
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
export class CasoTesteParametroExecucaoService {


    public async adicionar(conteudo: _modelsInput.CasoTesteParametroExecucao) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/casoTesteParametroExecucao",

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

    public async listarPorCasoTeste(casoTesteIdId : number) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + `/casoTesteParametroExecucao/RecuperaPorCasoTeste/${casoTesteIdId}`,
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.obj;
        } catch (error) {
            return null
        }
    }

    public async listarPorCritica(criticaId : number) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + `/casoTesteParametroExecucao/RecuperaPorCritica/${criticaId}`,
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