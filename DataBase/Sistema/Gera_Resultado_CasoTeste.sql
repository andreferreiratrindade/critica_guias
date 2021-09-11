use Aplicacao
go

create or ALTER PROCEDURE Gera_Resultado_CasoTeste 
    @CasoTesteId int,
    @NmeAtual varchar(500) = null
AS
BEGIN
declare @Retorno int = 0
, @nmeEsperado varchar(500) = ''
, @CasoTesteSituacaoId smallint = 0
, @CasoTesteSituacaoId_Passou smallint = 3
, @CasoTesteSituacaoId_Falou smallint = 4
select @nmeEsperado = trim(NmeEsperado)
from PlanoSaude.dbo.CasoTeste
where CasoTesteId = @CasoTesteId


if(trim(isnull(@nmeEsperado,'')) = trim(isnull(@NmeAtual,'')))begin 
    set @CasoTesteSituacaoId = @CasoTesteSituacaoId_Passou
    set @NmeAtual = @nmeEsperado
end else begin 
    set @CasoTesteSituacaoId = @CasoTesteSituacaoId_Falou
end 

    update PlanoSaude.dbo.CasoTeste
    set CasoTesteSituacaoId = @CasoTesteSituacaoId
    ,   NmeAtual = @NmeAtual
    where CasoTesteId = @CasoTesteId

    return @Retorno

END
GO
