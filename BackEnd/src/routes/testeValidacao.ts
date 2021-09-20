import express, { Router } from 'express'
import { Repository } from 'sequelize-typescript';
import { StoredProcedureCobertura } from '../models/storedProcedureCoberturaModel';
import { TesteValidacaoService } from '../services/testeValidacaoService';

export class TesteValidacaoRoute {
    private readonly _storedProcedureCoberturaRepository !: Repository<StoredProcedureCobertura>

    constructor(storedProcedureCoberturaRepository: Repository<StoredProcedureCobertura>) {
      this._storedProcedureCoberturaRepository = storedProcedureCoberturaRepository;
    }
    
    public montaRotas(): Router {

        let router = express.Router();
        router.post("/executarTestePorCasoTeste",(request: any,response:any)=>{
            console.log("atualiza NmeEsperado");
            let casoTesteService = new TesteValidacaoService(this._storedProcedureCoberturaRepository);
            return casoTesteService.executarTestePorCasoTeste(request,response);
        });


        router.post("/executarTestePorStoredProcedure",(request: any,response:any)=>{
            console.log("executarTestePorStoredProcedure");
            let casoTesteService = new TesteValidacaoService(this._storedProcedureCoberturaRepository);
            return casoTesteService.executarTestePorStoredProcedure(request,response);
        });

        return router;
    }
}