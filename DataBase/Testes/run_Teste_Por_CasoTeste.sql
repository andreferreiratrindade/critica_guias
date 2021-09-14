use Aplicacao
go


create or ALTER PROCEDURE run_Teste_Por_CasoTeste
    @casoTesteId int
AS
BEGIN
    declare @Retorno int = 0
,   @criticaId int = 2
,   @NmeEsperado varchar(500)
,   @NmeStoredProcedure varchar(500)
,   @query nvarchar(max) = 'aplicacao.dbo.'
,   @atual varchar(max) = ''
,   @NmeCriticaTeste varchar(500) = 'teste_'
,   @CasoTesteSituacao_Aguardando smallint = 1
,   @CasoTesteSituacao_Processando smallint = 2
    
    select top 1 @query =  'aplicacao.dbo.teste_' + critica.NmeStoredProcedure + ' ' + cast(@casoTesteId as varchar)
    from PlanoSaude.dbo.CasoTeste casoTeste
        inner join PlanoSaude.dbo.Critica critica
        on critica.criticaId = casoTeste.criticaId
    where casoTeste.casoTesteId = @casoTesteId

    update PlanoSaude.dbo.CasoTeste   
    set CasoTesteSituacaoId = @CasoTesteSituacao_Processando
    where  @CasoTesteId = CasoTesteId

    exec(@query)
END
GO

