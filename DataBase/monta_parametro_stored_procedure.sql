use Aplicacao
go

create or ALTER PROCEDURE monta_parametro_stored_procedure
    @storedProcedureId int = null
AS
BEGIN
    declare @Retorno int = 0



    insert into teste.dbo.StoredProcedureParametro
    select StoredProcedure.StoredProcedureId
    , ParametroTipoId   = ParametroTipo.ParametroTipoId
    , NmeParametro = parametro.name
    from teste.dbo.StoredProcedure StoredProcedure
        inner join sys.parameters parametro
            on  object_id = object_id(StoredProcedure.NmeStoredProcedure)

        inner join teste.dbo.ParametroTipo parametroTipo
            on parametroTipo.NmeParametroTipo = type_name(parametro.user_type_id)
    where parametro.is_output = 0
        and  @storedProcedureId = StoredProcedure.storedProcedureId


    execute aplicacao.dbo.monta_dependencia_stored_procedure
    @storedProcedureId = @storedProcedureId

    return @Retorno

END
GO
