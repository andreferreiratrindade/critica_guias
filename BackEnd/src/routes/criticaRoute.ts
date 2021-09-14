import {  CriticaService } from '../services/criticaService'
import express, { Router } from 'express'
import { Critica } from '../models/criticaModel';
import { Repository } from 'sequelize-typescript';

export class CriticaRoute {

    private readonly _criticaRepository !: Repository<Critica>

    constructor(criticaRepository: Repository<Critica>) {
      this._criticaRepository = criticaRepository;
    }
    

    public montaRotas(): Router {

        let router = express.Router();
        
        router.post("",(request: any,response:any)=>{
            console.log("adicionar critica");
            let criticaService = new CriticaService(this._criticaRepository);
            return criticaService.adicionar(request,response);
        });


        router.get("",(request: any,response:any)=>{
            console.log("listagem");
            let criticaService = new CriticaService(this._criticaRepository);
            return criticaService.listar(request,response);
        });
        
        return router;
    }
}