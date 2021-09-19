import {  ParametroService } from '../services/parametroService'
import express, { Router } from 'express'

export class ParametroRoute {


    

    public montaRotas(): Router {

        let router = express.Router();
        
        router.get("",(request: any,response:any)=>{
            let storedProcedureParametroService = new ParametroService();
            return storedProcedureParametroService.listar(request,response);
        });

        return router;
    }
}