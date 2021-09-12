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
    SELECT @Parametros = COALESCE(@Parametros + ', ', '') +  criticaParametro.NmeParametro + ' = ' +  casoTesteParametroExecucao.ValorParametroExecucao
    from PlanoSaude.dbo.CasoTesteParametroExecucao  casoTesteParametroExecucao
        inner join PlanoSaude.dbo.CriticaParametro criticaParametro
        on criticaParametro.CriticaParametroId = casoTesteParametroExecucao.CriticaParametroId
    where CasoTesteId = @CasoTesteId


    -- Recupera critica para execucao
    select @Sp_Critica = 'aplicacao.dbo.' + critica.NmeStoredProcedure
    from PlanoSaude.dbo.CasoTeste casoTeste
        inner join PlanoSaude.dbo.Critica critica
        on critica.criticaId = casoTeste.criticaId
    where casoTeste.CasoTesteId = @CasoTesteId

    set @query =  @Sp_Critica + ' ' + @Parametros + ', @MsgRetorno = @Atual output'


    EXECUTE sp_executesql @query, N'@Atual varchar(max) output', @Atual=@Atual OUTPUT;

end 
go 
