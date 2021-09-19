using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SQLCover;
namespace CoberturaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CoberturaController : ControllerBase
    {

        [HttpGet]
        public CoberturaModel Get(int storedProcedureId  )
        {
           
          var connectionString = "Data Source=localhost,1433;Initial Catalog=aplicacao;User ID=sa;Password=myPass123;";
            var dataBaseName = "aplicacao";
            var testeCobetura = new CodeCoverage(connectionString, dataBaseName);
          var cover =  testeCobetura.Cover("dbo.run_teste_por_stored_procedure " + storedProcedureId, storedProcedureId);

          var cobertura = new CoberturaModel{
            
               StoredProcedureId = storedProcedureId,

    TxtHtml  = cover.Html(),

    TotalCoberto = cover.CoveredStatementCount,

    TotalEtapas = cover.StatementCount,

          };

            return cobertura;
        }
    }
}
