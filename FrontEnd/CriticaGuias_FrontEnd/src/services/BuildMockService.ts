import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import * as Config from '../config/config.json'
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
export class BuildMockService {

    public async listarPrestadores() {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + `/BuildMock/RecuperaPrestadores`,
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.obj;
        } catch (error) {
            return null
        }
    }

    public async listarBeneficiarios() {
        let parameters: IHttpClientRequestParameters
            = {
            url: Config.api + `/BuildMock/RecuperaBeneficiarios`,
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