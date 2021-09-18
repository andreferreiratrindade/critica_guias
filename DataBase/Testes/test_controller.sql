use Aplicacao
go


create or ALTER PROCEDURE test_controller
    @CasoTesteId int

AS
BEGIN

    declare @Retorno int = 0
, @PrestadorId int = NULL
, @Atual varchar(500) = NULL
, @Parametros nvarchar(max)

begin try
begin transaction

         -- Responsavel por montar toda estrutura de dependencias de tabelas com dados falsos pré montados
         execute aplicacao.dbo.teste_monta_dependencia_mock
        
         -- Responsavel por montar toda estrutura de dependencias (tabelas e stored procedures falsos)
         execute aplicacao.dbo.teste_monta_dependencia
            @CasoTesteId = @CasoTesteId
        
         -- Executa critica
         execute aplicacao.dbo.teste_critica
         @CasoTesteId  = @CasoTesteId,
         @Atual = @Atual output

end try 

begin CATCH
    set @Atual = @Atual + '-- Erro -- ' + ERROR_MESSAGE()
end catch

    ROLLBACK

    -- 
    execute aplicacao.dbo.Gera_Resultado_CasoTeste 
    @CasoTesteId = @CasoTesteId,
    @NmeAtual = @Atual

    return @Retorno
END
go

