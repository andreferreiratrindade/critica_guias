import { sequelize } from "../instances/sequelize";

export class RepositoryQuery {

  static async RecuperaListagemParametros() {
    return await sequelize.query(
      `SELECT parametro.idParametro
      , parametro.nmeParametro
      ,  tipoParametro.nmeTipoParametro
      , parametro.desCorParametro
      FROM parametro parametro
      inner join tipoParametro tipoParametro
        on tipoParametro.IdTipoParametro = parametro.IdTipoParametro`,
      { type: 'SELECT' });
  }

  static async RecuperaListagemParametroCritica(criticaId: number) {
    return await sequelize.query(
      `SELECT parametro.idParametro
      , parametro.nmeParametro
      ,  tipoParametro.nmeTipoParametro
      , criticaParametro.criticaIdParametro
      , criticaParametro.seqCriticaParametro
      , parametro.desCorParametro
      FROM parametro parametro
      inner join tipoParametro tipoParametro
        on tipoParametro.IdTipoParametro = parametro.IdTipoParametro
      inner join CriticaParametro criticaParametro
		on criticaParametro.IdParametro = parametro.IdParametro
	where criticaParametro.criticaId = :criticaId
  order by criticaParametro.seqCriticaParametro`,
      { replacements: { criticaId: criticaId }, type: 'SELECT' });

  }

  static async RecuperaListagemCasoTeste(criticaId: number) {
    return await sequelize.query(`
    select CasoTeste.casoTesteId,
    CasoTeste.nmeCasoTeste,
     CasoTesteSituacao.nmeCasoTesteSituacao, 
     CasoTeste.nmeEsperado, 
     CasoTeste.nmeAtual
    from PlanoSaude.dbo.CasoTeste CasoTeste
    inner join PlanoSaude.dbo.CasoTesteSituacao CasoTesteSituacao
    on CasoTesteSituacao.CasoTesteSituacaoId = CasoTeste.CasoTesteSituacaoId
    where CasoTeste.criticaId = :criticaId
    order by CasoTeste.CasoTesteId
    `,
      { replacements: { criticaId: criticaId }, type: 'SELECT' });
  }

  static async RecuperaListagemCritica() {
    return await sequelize.query(`
    select critica.criticaId, critica.nmeCritica, critica.desCritica, critica.nroCritica, critica.nmeStoredProcedure
     from PlanoSaude.dbo.Critica critica
    `,
      { type: 'SELECT' });
  }

  static async RecuperaPrestadoresMock() {
    return await sequelize.query(`
    SELECT [prestadorId]
    ,[nmeRazaoSocial]
    ,[enderecoId]
    ,[dtaValidade]
    FROM [PlanoSaude].[dbo].[Prestador_Mock]
    `,
      { type: 'SELECT' });
  }

  static async RecuperaBeneficiariosMock() {
    return await sequelize.query(`
    SELECT  [beneficiarioId]
    ,[nmeBeneficiario]
    ,[cpf]
    FROM [PlanoSaude].[dbo].[Beneficiario_Mock]
    `,
      { type: 'SELECT' });
  }



  static async RecuperaListagemCasoTesteParametroExecucaoPorCasoTeste(casoTesteId: number) {
    return await sequelize.query(`
    select CriticaParametro.criticaParametroId
, CriticaParametro.criticaId
, CriticaParametro.nmeParametro 
, CasoTesteParametroExecucao.casoTesteParametroExecucaoId
, CasoTesteParametroExecucao.valorParametroExecucao
from PlanoSaude.dbo.CriticaParametro CriticaParametro
inner join PlanoSaude.dbo.CasoTeste casoteste
    on casoteste.CriticaId = CriticaParametro.CriticaId
left join PlanoSaude.dbo.CasoTesteParametroExecucao CasoTesteParametroExecucao
    on casoteste.CasoTesteId = CasoTesteParametroExecucao.CasoTesteId
    where casoteste.casoTesteId = :casoTesteId
    `,
      { replacements: { casoTesteId: casoTesteId }, type: 'SELECT' });
  }

  static async RecuperaListagemCasoTesteParametroExecucaoPorCritica(criticaId: number) {
    return await sequelize.query(`

    select CriticaParametro.criticaParametroId
    , CriticaParametro.criticaId
    , CriticaParametro.nmeParametro 
    
    from PlanoSaude.dbo.CriticaParametro CriticaParametro
    
        where CriticaParametro.CriticaId = :criticaId
    `,
      { replacements: { criticaId: criticaId }, type: 'SELECT' });
  }

}