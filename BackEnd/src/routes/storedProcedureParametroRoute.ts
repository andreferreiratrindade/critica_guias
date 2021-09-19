import {  StoredProcedureParametroService } from '../services/storedProcedureParametroService'
import express, { Router } from 'express'
import { StoredProcedureParametro } from '../models/storedProcedureParametroModel';
import { Repository } from 'sequelize-typescript';

export class StoredProcedureParametroRoute {

    private readonly _storedProcedureParametroRepository !: Repository<StoredProcedureParametro>

    constructor(storedProcedureParametroRepository: Repository<StoredProcedureParametro>) {
      this._storedProcedureParametroRepository = storedProcedureParametroRepository;
    }
    

    public montaRotas(): Router {

        let router = express.Router();
        
        router.post("",(request: any,response:any)=>{
            console.log("adicionar Avaliação");
            let storedProcedureParametroService = new StoredProcedureParametroService(this._storedProcedureParametroRepository);
            return storedProcedureParametroService.adicionar(request,response);
        });

        router.get("/:storedProcedureId",(request: any,response:any)=>{
            console.log("listagem");
            let storedProcedureParametroService = new StoredProcedureParametroService(this._storedProcedureParametroRepository);
            return storedProcedureParametroService.listar(request,response);
        });

        router.put("",(request: any,response:any)=>{
            console.log("Atualiza");
            let storedProcedureParametroService = new StoredProcedureParametroService(this._storedProcedureParametroRepository);
            return storedProcedureParametroService.atualizar(request,response);
        });
        router.delete("/:storedProcedureIdParametro",(request: any,response:any)=>{
            console.log("Deleta");
            let storedProcedureParametroService = new StoredProcedureParametroService(this._storedProcedureParametroRepository);
            return storedProcedureParametroService.deletar(request,response);
        });
        return router;
    }
}