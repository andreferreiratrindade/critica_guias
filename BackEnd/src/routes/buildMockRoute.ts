import express, { Router } from 'express'
import { BuildMockService } from '../services/buildMockService';

export class BuildMockRoute {
    public montaRotas(): Router {

        let router = express.Router();
       

        router.get("/RecuperaBeneficiarios",(request: any,response:any)=>{
            console.log("RecuperaBeneficiarios");
            let buildMOckService = new BuildMockService();
            return buildMOckService.recuperaBeneficiarios(request,response);
        });

        router.get("/RecuperaPrestadores",(request: any,response:any)=>{
            console.log("RecuperaBeneficiarios");
            let buildMOckService = new BuildMockService();
            return buildMOckService.recuperaPrestadores(request,response);
        });
        
        return router;
    }
}