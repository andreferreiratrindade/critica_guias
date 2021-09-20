import express, { Router } from 'express'
import { Repository } from 'sequelize-typescript';
import { StoredProcedureCobertura } from '../models/storedProcedureCoberturaModel';
import { StoredProcedureCoberturaService } from '../services/storedProcedureCoberturaService';

export class StoredProcedureCoberturaRoute {


    private readonly _storedProcedureCoberturaRepository !: Repository<StoredProcedureCobertura>

    constructor(storedProcedureCoberturaRepository: Repository<StoredProcedureCobertura>) {
      this._storedProcedureCoberturaRepository = storedProcedureCoberturaRepository;
    }
    public montaRotas(): Router {

        let router = express.Router();
        

        router.get("/:storedProcedureId",(request: any,response:any)=>{
            console.log("listagem");
            let criticaService = new StoredProcedureCoberturaService(this._storedProcedureCoberturaRepository);
            return criticaService.listar(request,response);
        });
        
        return router;
    }
}