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
            console.log("adicionar Avaliação");
            let criticaService = new CriticaService(this._criticaRepository);
            return criticaService.adicionar(request,response);
        });

        
        return router;
    }
}