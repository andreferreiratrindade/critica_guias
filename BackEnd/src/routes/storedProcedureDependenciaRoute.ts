import express, { Router } from 'express'
import { Repository } from 'sequelize-typescript';
import { StoredProcedureCobertura } from '../models/storedProcedureCoberturaModel';
import { StoredProcedureDependenciaService } from '../services/storedProcedureDependenciaService';

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