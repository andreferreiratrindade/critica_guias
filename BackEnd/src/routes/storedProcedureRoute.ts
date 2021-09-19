import {  StoredProcedureService } from '../services/storedProcedureService'
import express, { Router } from 'express'
import { StoredProcedure } from '../models/storedProcedureModel';
import { Repository } from 'sequelize-typescript';

export class StoredProcedureRoute {

    private readonly _storedProcedureRepository !: Repository<StoredProcedure>

    constructor(storedProcedureRepository: Repository<StoredProcedure>) {
      this._storedProcedureRepository = storedProcedureRepository;
    }
    

    public montaRotas(): Router {

        let router = express.Router();
        
        router.post("",(request: any,response:any)=>{
            console.log("adicionar critica");
            let criticaService = new StoredProcedureService(this._storedProcedureRepository);
            return criticaService.adicionar(request,response);
        });


        router.get("",(request: any,response:any)=>{
            console.log("listagem");
            let criticaService = new StoredProcedureService(this._storedProcedureRepository);
            return criticaService.listar(request,response);
        });
        
        return router;
    }
}