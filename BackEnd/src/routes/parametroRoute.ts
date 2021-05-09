import {  ParametroService } from '../services/parametroService'
import express, { Router } from 'express'
import { Parametro } from '../models/parametroModel';
import { Repository } from 'sequelize-typescript';

export class ParametroRoute {


    

    public montaRotas(): Router {

        let router = express.Router();
        
        router.get("",(request: any,response:any)=>{
            let criticaParametroService = new ParametroService();
            return criticaParametroService.listar(request,response);
        });

        return router;
    }
}