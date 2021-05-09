import {  CriticaParametroService } from '../services/criticaParametroService'
import express, { Router } from 'express'
import { CriticaParametro } from '../models/criticaParametroModel';
import { Repository } from 'sequelize-typescript';

export class CriticaParametroRoute {

    private readonly _criticaParametroRepository !: Repository<CriticaParametro>

    constructor(criticaParametroRepository: Repository<CriticaParametro>) {
      this._criticaParametroRepository = criticaParametroRepository;
    }
    

    public montaRotas(): Router {

        let router = express.Router();
        
        router.post("",(request: any,response:any)=>{
            console.log("adicionar Avaliação");
            let criticaParametroService = new CriticaParametroService(this._criticaParametroRepository);
            return criticaParametroService.adicionar(request,response);
        });

        router.get("/:idCritica",(request: any,response:any)=>{
            console.log("listagem");
            let criticaParametroService = new CriticaParametroService(this._criticaParametroRepository);
            return criticaParametroService.listar(request,response);
        });

        router.put("",(request: any,response:any)=>{
            console.log("Atualiza");
            let criticaParametroService = new CriticaParametroService(this._criticaParametroRepository);
            return criticaParametroService.atualizar(request,response);
        });

        return router;
    }
}