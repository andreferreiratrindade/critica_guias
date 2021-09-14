import HttpStatusCode from '../constants/HttpStatusCode';
import { RepositoryQuery } from '../repositories/repositoryQuery';
import { RetornoRequest } from '../utils/retornoRequest';


export class TesteValidacaoService {


  public async executarTestePorCasoTeste(req: any, res: any) {
    try {
      console.log("Teste de nome caso teste");
      console.log(req.body);

      let casoTeste = {
        nmeCasoTeste: req.body.casoTesteId
      };

      const parametros = await RepositoryQuery.ExecuteGerarCasoTeste(req.body.casoTesteId);


      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

  public async executarTestePorCritica(req: any, res: any) {
    try {
      console.log("Teste de nome caso teste");
      console.log(req.body);

      let critica = {
        criticaId: req.body.criticaId
      };

      const parametros = await RepositoryQuery.ExecutaMonta_parametro_critica(req.body.criticaId);


      return RetornoRequest.Response(parametros, null, res, HttpStatusCode.OK);
    } catch (error: any) {
      RetornoRequest.Response(error, null, res, HttpStatusCode.BAD_REQUEST);
    }
  }

}
