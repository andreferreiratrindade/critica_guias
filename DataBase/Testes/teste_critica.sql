use Aplicacao
go

create or ALTER PROCEDURE teste_critica
    @CasoTesteId int,
    @Atual varchar(max) output
AS
BEGIN
    declare @Parametros nvarchar(max)
, @Sp_Critica Nvarchar(max)
, @query nvarchar(max)

    -- Recupera parametros para execução
    SELECT @Parametros = COALESCE(@Parametros + ', ', '') +  StoredProcedureParametro.NmeParametro + ' = ' +  casoTesteParametroExecucao.ValorParametroExecucao
    from teste.dbo.CasoTesteParametroExecucao  casoTesteParametroExecucao
        inner join teste.dbo.StoredProcedureParametro StoredProcedureParametro
        on StoredProcedureParametro.StoredProcedureParametroid = casoTesteParametroExecucao.StoredProcedureParametroid
    where CasoTesteId = @CasoTesteId


    -- Recupera critica para execucao
    select @Sp_Critica = 'aplicacao.dbo.' + StoredProcedure.NmeStoredProcedure
    from teste.dbo.CasoTeste casoTeste
        inner join teste.dbo.StoredProcedure StoredProcedure
        on StoredProcedure.StoredProcedureId = casoTeste.StoredProcedureId
    where casoTeste.CasoTesteId = @CasoTesteId

    set @query =  @Sp_Critica + ' ' + @Parametros + ', @MsgRetorno = @Atual output'


    EXECUTE sp_executesql @query, N'@Atual varchar(max) output', @Atual=@Atual OUTPUT;

end 
go 
