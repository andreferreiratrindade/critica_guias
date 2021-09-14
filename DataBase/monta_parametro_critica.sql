use Aplicacao
go

create or ALTER PROCEDURE monta_parametro_critica 
    @criticaId int = null
AS
BEGIN
declare @Retorno int = 0
   
    delete casoTesteParametroExecucao 
    from planoSaude.dbo.CasoTesteParametroExecucao casoTesteParametroExecucao 
        inner join PlanoSaude.dbo.CriticaParametro  CriticaParametro
    on CriticaParametro.CriticaParametroId = casoTesteParametroExecucao.CriticaParametroId
    where @criticaId = CriticaParametro.CriticaId

    delete from  PlanoSaude.dbo.CriticaParametro 
    where @criticaId = CriticaId



   insert into PlanoSaude.dbo.CriticaParametro 
    select critica.criticaId
    , ParametroTipoId   = ParametroTipo.ParametroTipoId
    , NmeParametro = parametro.name 
    from PlanoSaude.dbo.Critica critica
    inner join  sys.parameters parametro
        on  object_id = object_id(critica.NmeStoredProcedure)
    inner join PlanoSaude.dbo.ParametroTipo parametroTipo
        on ParametroTipo.NmeParametroTipo = type_name(parametro.user_type_id)
    where parametro.is_output = 0
    and (@criticaId is null or @criticaId = critica.criticaId)



    return @Retorno

END
GO
