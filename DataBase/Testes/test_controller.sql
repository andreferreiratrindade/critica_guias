use Aplicacao
go


create or ALTER PROCEDURE test_controller 
AS
BEGIN
declare @Retorno int = 0
,   @CriticaId int = 2
,   @TesteId int = 0
,   @NmeEsperado varchar(500)
,   @CasoTesteId int 
,   @NmeStoredProcedure varchar(500)
,   @query nvarchar(max) = 'aplicacao.dbo.'
,   @atual varchar(max) = ''
,   @NmeCriticaTeste varchar(500) = 'teste_'
,   @CasoTesteSituacao_Aguardando smallint = 1
,   @CasoTesteSituacao_Processando smallint = 2
drop table if exists #CasoTeste 
select casoTeste.CasoTesteId
, query =  'aplicacao.dbo.teste_' + critica.NmeStoredProcedure
into #CasoTeste 
from PlanoSaude.dbo.Teste Teste
    inner join PlanoSaude.dbo.CasoTeste casoTeste   
        on casoTeste.TesteId = Teste.TesteId
    inner join PlanoSaude.dbo.Critica critica
        on critica.CriticaId = Teste.CriticaId
where casoTeste.CasoTesteSituacaoId = @CasoTesteSituacao_Aguardando 

while(exists(select 1 from #CasoTeste))begin 
    select top 1   @CasoTesteId    = CasoTesteId
    ,   @query = query + ' ' + cast(CasoTesteId as varchar)
    from #CasoTeste

    delete from  #CasoTeste
    where @CasoTesteId = CasoTesteId

    update PlanoSaude.dbo.CasoTeste   
    set CasoTesteSituacaoId = @CasoTesteSituacao_Processando
    where  @CasoTesteId = CasoTesteId

    exec(@query)     
end 
END
GO

