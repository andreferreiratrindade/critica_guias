import {  CriticaService } from '../services/criticaService'
import express, { Router } from 'express'
import { Critica } from '../models/criticaModel';
import { Repository } from 'sequelize-typescript';
import { CriticaTabelaDependenciaService } from '../services/criticaTabelaDependenciaService';
import { CriticaTabelaDependencia } from '../models/criticaTabelaDependenciaModel';

export class CriticaTabelaDependenciaRoute {


    public montaRotas(): Router {

        let router = express.Router();
        

        router.get("/:criticaId",(request: any,response:any)=>{
            console.log("listagem");
            let criticaService = new CriticaTabelaDependenciaService();
            return criticaService.listar(request,response);
        });
        
        return router;
    }
}