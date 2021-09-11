use Aplicacao
go

create or ALTER PROCEDURE monta_parametro_critica 
AS
BEGIN
declare @Retorno int = 0
   
    delete from  PlanoSaude.dbo.CriticaParametro 

   insert into PlanoSaude.dbo.CriticaParametro 
    select critica.CriticaId
    , ParametroTipoId   = ParametroTipo.ParametroTipoId
    , NmeParametro = parametro.name 
    from PlanoSaude.dbo.Critica critica
    inner join  sys.parameters parametro
        on  object_id = object_id(critica.NmeStoredProcedure)
    inner join PlanoSaude.dbo.ParametroTipo parametroTipo
        on ParametroTipo.NmeParametroTipo = type_name(parametro.user_type_id)
    where parametro.is_output = 0



    return @Retorno

END
GO
