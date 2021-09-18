use Aplicacao
go

create or ALTER PROCEDURE critica_ans_0003 
    @BeneficiarioId int,
    @PrestadorId int,
    @MsgRetorno varchar(max) = '' output
AS
BEGIN
declare @Retorno int = 0
, @ErroCount int = 0


    execute @Retorno =  aplicacao.dbo.critica_ans_0001 
    @PrestadorId = @PrestadorId,
    @MsgRetorno  = @MsgRetorno output

    set @ErroCount = @ErroCount + @Retorno

    execute @Retorno =  aplicacao.dbo.critica_ans_0002
    @BeneficiarioId = @BeneficiarioId,
    @MsgRetorno  = @MsgRetorno output


    set @ErroCount = @ErroCount + @Retorno



    return @ErroCount

END
GO
