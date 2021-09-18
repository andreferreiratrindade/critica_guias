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
,   @query nvarchar(max) = ''
,   @atual varchar(max) = ''
,   @NmeCriticaTeste varchar(500) = 'teste_'
,   @CasoTesteSituacao_Aguardando smallint = 1
,   @CasoTesteSituacao_Processando smallint = 2
    
    update teste.dbo.CasoTeste   
    set CasoTesteSituacaoId = @CasoTesteSituacao_Processando
    where  @CasoTesteId = CasoTesteId

    execute aplicacao.dbo.test_controller @casoTesteId

    return @Retorno
END
GO

