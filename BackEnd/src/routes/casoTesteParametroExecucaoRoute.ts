import express, { Router } from 'express'
import { Repository } from 'sequelize-typescript';
import { CasoTesteParametroExecucao } from '../models/casoTesteParametroExecucaoModel';
import { CasoTesteParametroExecucaoService } from '../services/casoTesteParametroExecucaoService';

export class CasoTesteParametroExecucaoRoute {

    private readonly _casoTesteParametroExecucaoRepository !: Repository<CasoTesteParametroExecucao>

    constructor(_casoTesteParametroExecucaoRepository: Repository<CasoTesteParametroExecucao>) {
      this._casoTesteParametroExecucaoRepository = _casoTesteParametroExecucaoRepository;
    }
    

    public montaRotas(): Router {

        let router = express.Router();
        
        router.post("",(request: any,response:any)=>{
            console.log("adicionar caso teste parametro execução");
            let casoTesteParametroExecucaoService = new CasoTesteParametroExecucaoService(this._casoTesteParametroExecucaoRepository);
            return casoTesteParametroExecucaoService.adicionar(request,response);
        });

        router.get("/RecuperaPorCritica/:criticaId",(request: any,response:any)=>{
            let casoTesteParametroExecucaoService = new CasoTesteParametroExecucaoService(this._casoTesteParametroExecucaoRepository);
            return casoTesteParametroExecucaoService.listarPorCritica(request,response);
        });

        router.get("/RecuperaPorCasoTeste/:casoTesteId",(request: any,response:any)=>{
            let casoTesteParametroExecucaoService = new CasoTesteParametroExecucaoService(this._casoTesteParametroExecucaoRepository);
            return casoTesteParametroExecucaoService.listarPorCasoTeste(request,response);
        });
        
        return router;
    }
}