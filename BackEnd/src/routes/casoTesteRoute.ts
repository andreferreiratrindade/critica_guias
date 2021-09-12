import {  CriticaService } from '../services/criticaService'
import express, { Router } from 'express'
import { Critica } from '../models/criticaModel';
import { Repository } from 'sequelize-typescript';
import { CasoTesteService } from '../services/casoTesteService';
import { CasoTeste } from '../models/casoTesteModel';

export class CasoTesteRoute {

    private readonly _casoTesteRepository !: Repository<CasoTeste>

    constructor(casoTesteRepository: Repository<CasoTeste>) {
      this._casoTesteRepository = casoTesteRepository;
    }
    

    public montaRotas(): Router {

        let router = express.Router();
        
        router.post("",(request: any,response:any)=>{
            console.log("adicionar caso teste");
            let casoTesteService = new CasoTesteService(this._casoTesteRepository);
            return casoTesteService.adicionar(request,response);
        });

        router.get("/:criticaId",(request: any,response:any)=>{
            console.log("listagem");
            let casoTesteService = new CasoTesteService(this._casoTesteRepository);
            return casoTesteService.listar(request,response);
        });
        
        return router;
    }
}