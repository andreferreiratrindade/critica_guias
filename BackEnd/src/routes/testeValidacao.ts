import express, { Router } from 'express'
import { TesteValidacaoService } from '../services/testeValidacaoService';

export class TesteValidacaoRoute {

    

    public montaRotas(): Router {

        let router = express.Router();
        


        router.post("/executarTestePorCasoTeste",(request: any,response:any)=>{
            console.log("atualiza NmeEsperado");
            let casoTesteService = new TesteValidacaoService();
            return casoTesteService.executarTestePorCasoTeste(request,response);
        });

      
        return router;
    }
}