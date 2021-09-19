import express, { Router } from 'express'
import { CasoTesteColunaMock } from '../models/CasoTesteColunaMockModel';
import { CasoTesteColunaMockService } from '../services/casoTesteColunaMockService';
import { Repository } from 'sequelize-typescript';

export class CasoTesteColunaMockRoute {


    private readonly _casoTesteColunaMockRepository !: Repository<CasoTesteColunaMock>

    constructor(casoTesteColunaMockRepository: Repository<CasoTesteColunaMock>) {
      this._casoTesteColunaMockRepository = casoTesteColunaMockRepository;
    }
    public montaRotas(): Router {

        let router = express.Router();
        

        router.get("/:casoTesteId/:storedProcedureDependenciaId",(request: any,response:any)=>{
            console.log("CasoTesteColunaMockRoute - listagem");
            let casoTesteColunaMock = new CasoTesteColunaMockService(this._casoTesteColunaMockRepository);
            return casoTesteColunaMock.listar(request,response);
        });

        router.post("",(request: any,response:any)=>{
            console.log("adicionar");
            let casoTesteColunaMock = new CasoTesteColunaMockService(this._casoTesteColunaMockRepository);
            return casoTesteColunaMock.adicionar(request,response);
        });
        
        return router;
    }
}