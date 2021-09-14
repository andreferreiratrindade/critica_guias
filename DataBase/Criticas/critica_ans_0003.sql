use Aplicacao
go

create or ALTER PROCEDURE critica_ans_0003 
    @BeneficiarioId int,
    @PrestadorId int,
    @MsgRetorno varchar(max) = '' output
AS
BEGIN
declare @Retorno int = 0
    if(not exists(select 1 
                 from PlanoSaude.dbo.Beneficiario 
                 where BeneficiarioId = @BeneficiarioId))begin 

        set @MsgRetorno = 'Beneficiario não encontrado'
        set @Retorno = 1

    end 

       
    if(not exists(select 1 from PlanoSaude.dbo.Prestador where PrestadorId = @PrestadorId))begin 

        set @MsgRetorno = 'Prestador não encontrado'
        set @Retorno = 1

    end 

    return @Retorno

END
GO
