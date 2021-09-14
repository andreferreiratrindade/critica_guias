import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import * as Config from '../config/config.json'
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
export class TesteValidacaoService {



    public async executarTestePorCasoTeste(conteudo: _modelsInput.CasoTeste) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/testeValidacao/executarTestePorCasoTeste",
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

    

    public async executarTestePorCritica(conteudo: _modelsInput.Critica) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/testeValidacao/executarTestePorCritica",
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