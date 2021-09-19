import {  StoredProcedureService } from '../services/storedProcedureService'
import express, { Router } from 'express'
import { StoredProcedure } from '../models/storedProcedureModel';
import { Repository } from 'sequelize-typescript';
import { StoredProcedureDependenciaService } from '../services/storedProcedureDependenciaService';
import { StoredProcedureDependencia } from '../models/storedProcedureDependenciaModel';

export class StoredProcedureDependenciaRoute {


    public montaRotas(): Router {

        let router = express.Router();
        

        router.get("/:storedProcedureId",(request: any,response:any)=>{
            console.log("listagem");
            let criticaService = new StoredProcedureDependenciaService();
            return criticaService.listar(request,response);
        });
        
        return router;
    }
}