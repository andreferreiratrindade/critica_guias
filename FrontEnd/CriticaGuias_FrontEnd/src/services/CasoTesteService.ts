import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import * as Config from '../config/config.json'
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
export class CasoTesteService {
    

   
    public async recuperaPorId(casoTesteId : number) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + `/casoTeste/${casoTesteId}`,
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.obj;
        } catch (error) {
            return null
        }
    }

    public async adicionar(conteudo: _modelsInput.CasoTeste) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/casoTeste",
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

    public async atualizaNmeCasoTeste(conteudo: _modelsInput.CasoTeste) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/casoTeste/atualizarNmeCasoTeste",
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

    public async atulaizaNmeEsperado(conteudo: _modelsInput.CasoTeste) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + "/casoTeste/atualizarNmeEsperado",
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

    public async listar(criticaId : number) {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + `/casoTeste/listagem/${criticaId}`,
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