

-- create database PlanoSaude
-- go 
drop table if exists TesteConfiguracaoMock
drop table if exists TesteConfiguracaoColunaMock
drop table if exists CasoTesteMock
drop table if exists CasoTesteColunaMock
drop table if exists CasoTeste
drop table if exists CasoTesteParametroExecucao
drop table if exists CriticaTabelaDependenciaColuna
drop table if exists CriticaTabelaDependencia
drop table if exists CriticaParametro
drop table if exists Critica
drop table if exists ParametroTipo
drop table if exists Item
drop table if exists Guia
drop table if exists Prestador
drop table if exists BeneficiarioEndereco
drop table if exists Endereco
drop table if exists Beneficiario

drop table if exists CasoTesteSituacao

go 
use PlanoSaude
go


create table CasoTesteSituacao(
    CasoTesteSituacaoId smallint primary key, 
    NmeCasoTesteSituacao varchar(250) not null

)

create table Beneficiario(
    BeneficiarioId int identity(1,1) primary key ,
    NmeBeneficiario varchar(250) not null, 
    CPF numeric(11,0) not null
)


create table Endereco(
    EnderecoId int  identity(1,1) primary key ,
    NmeLogradouro varchar(250) not null, 
    NroCEP int not null, 
    NmeCidade varchar(500) not null, 
    NmeUf char(2) not null

)

create table BeneficiarioEndereco(
    BeneficiarioEnderecoId int identity(1,1) primary key ,
    BeneficiarioId int not null, 
    EnderecoId int   not null,

    CONSTRAINT FK_Beneficiario_Endereco_Beneficiario FOREIGN KEY (BeneficiarioId)
    REFERENCES Beneficiario(BeneficiarioId),

    CONSTRAINT FK_Beneficiario_Endereco_Endereco FOREIGN KEY (EnderecoId)
    REFERENCES Endereco(EnderecoId)
)

create table PlanoSaude.dbo.Prestador(
    PrestadorId  int identity(1,1) primary key ,
    NmeRazaoSocial varchar(500) not null, 
    EnderecoId int not null,
    DtaValidade smalldatetime not null,

    CONSTRAINT FK_Prestador_Endereco FOREIGN KEY (EnderecoId)
    REFERENCES Endereco(EnderecoId)
)


create table Guia(
    GuiaId int identity(1,1) primary key,  
    BeneficiarioId int not null,  
    PrestadorId int not null,  
    DtaEntrada smalldatetime not  null, 

    CONSTRAINT FK_Prestador FOREIGN KEY (PrestadorId)
    REFERENCES Prestador(PrestadorId),

    CONSTRAINT FK_Beneficiario FOREIGN KEY (BeneficiarioId)
    REFERENCES Beneficiario(BeneficiarioId),

);

create table Item(
    ItemId int identity(1,1) primary key,  
    GuiaId int not null,  
    VlrItem decimal(15,2) not null, 
    NroServico int not null,

    CONSTRAINT FK_Guia FOREIGN KEY (GuiaId)
    REFERENCES Guia(GuiaId),
);


create table ParametroTipo(
    ParametroTipoId  int  primary key, 
    NmeParametroTipo varchar(10) not null

)

create table Critica(
    criticaId int identity(1,1) primary key, 
    NmeCritica varchar(500) not null, 
    DesCritica text not null, 
    NroCritica int not null, 
    NmeStoredProcedure varchar(max) not null
);


create table CriticaParametro(
    CriticaParametroId int identity(1,1) primary key, 
    CriticaId int not null,
    ParametroTipoId int not null,
    NmeParametro varchar(250) not null, 
    
    CONSTRAINT FK_CriticaParametro_Critica FOREIGN KEY (criticaId)
    REFERENCES Critica(criticaId),

    CONSTRAINT FK_CriticaParametro_ParametroTipo FOREIGN KEY (ParametroTipoId)
    REFERENCES ParametroTipo(ParametroTipoId)
)

create table CriticaTabelaDependencia(
    criticaTabelaDependenciaId int identity(1,1) primary key,
    criticaId int not null,
    NmeTabela varchar(500) not null, 
    
    CONSTRAINT FK_CriticaTabelaDependencia_Critica FOREIGN KEY (criticaId)
    REFERENCES Critica(criticaId),
)

create table CriticaTabelaDependenciaColuna(
    CriticaTabelaDependenciaColunaId int identity(1,1) primary key,
    criticaTabelaDependenciaId int not null,
    NmeColuna varchar(500) not null
    CONSTRAINT FK_CriticaTabelaDependenciaColuna_CriticaTabelaDependencia FOREIGN KEY (criticaTabelaDependenciaId)
    REFERENCES CriticaTabelaDependencia(criticaTabelaDependenciaId),
)




create table CasoTeste(
    CasoTesteId int identity(1,1) primary key, 
    criticaId int not null,
    CasoTesteSituacaoId smallint not null,
    NmeCasoTeste varchar(250) not null, 
    NmeEsperado varchar(500), 
    NmeAtual varchar(500),

    CONSTRAINT FK_CasoTeste_Critica FOREIGN KEY (criticaId)
    REFERENCES Critica(criticaId),

    CONSTRAINT FK_CasoTeste_CasoTesteSituacao FOREIGN KEY (CasoTesteSituacaoId)
    REFERENCES CasoTesteSituacao(CasoTesteSituacaoId),

    
)

create table CasoTesteColunaMock(
    CasoTesteColunaMockId int identity(1,1) primary key, 
    CasoTesteId int not null, 
    CriticaTabelaDependenciaColunaId int not null,
    ValorColunaMock varchar(500),

    CONSTRAINT FK_CasoTesteColunaMock_CriticaTabelaDependenciaColuna FOREIGN KEY (CriticaTabelaDependenciaColunaId)
    REFERENCES CriticaTabelaDependenciaColuna(CriticaTabelaDependenciaColunaId),

    CONSTRAINT FK_CasoTesteColunaMock_CasoTeste FOREIGN KEY (CasoTesteId)
    REFERENCES CasoTeste(CasoTesteId)
)

create table CasoTesteParametroExecucao(

    CasoTesteParametroExecucaoId int identity(1,1) primary key, 
    CasoTesteId int not null, 
    CriticaParametroId int not null,
    ValorParametroExecucao varchar(500),

        CONSTRAINT FK_CasoTeste FOREIGN KEY (CasoTesteId)
    REFERENCES CasoTeste(CasoTesteId)
)


insert  into CasoTesteSituacao values(1, 'Aguardando processamento')
insert  into CasoTesteSituacao values(2, 'Processando')
insert  into CasoTesteSituacao values(3, 'Passou')
insert  into CasoTesteSituacao values(4, 'Falhou')
insert  into CasoTesteSituacao values(5, 'Erro')
insert  into CasoTesteSituacao values(6, 'Em edição')

delete from Beneficiario_Mock
insert into Beneficiario_Mock values(100,'André', 09891023605)
insert into Beneficiario_Mock values(102,'Gustavo', 09891023605)
insert into Beneficiario_Mock values(103,'Taís', 09891023605)

delete from Prestador_Mock
insert into Prestador_Mock values(1, 'Prestador 1', 1, '20210909')
insert into Prestador_Mock values(2, 'Prestador 2', 2, '20210909')




insert into ParametroTipo values(1, 'int')
insert into ParametroTipo values(2, 'varchar')
insert into ParametroTipo values(3, 'char')
insert into ParametroTipo values(4, 'decimal')





-- Criando primeiro teste

declare @TesteConfiguracaoMockId int = 0
,   @CriticaId int = 0
,   @CasoTesteId int = 0
,   @CriticaTabelaDependenciaColunaId int = 0
insert into Critica values('0001 - Prestador não encontrado', 'Valida se contem prestador na base de dados', 1,'critica_ans_0001')

set @CriticaId = @@IDENTITY

insert into Critica values('0002 - Beneficiario não encontrado', 'Valida se contem beneficiário na base de dados', 2,'critica_ans_0002')


insert into CasoTeste values(@CriticaId, 1, 'Valida prestador', '', null)
set @CasoTesteId = @@IDENTITY

execute aplicacao.dbo.monta_parametro_critica
execute aplicacao.dbo.monta_critica_tabela_dependencia


select top 1 @CriticaTabelaDependenciaColunaId =  coluna.CriticaTabelaDependenciaColunaId
from PlanoSaude.dbo.CriticaTabelaDependenciaColuna coluna
    inner join PlanoSaude.dbo.CriticaTabelaDependencia tabela 
        on tabela.criticaTabelaDependenciaId    = coluna.criticaTabelaDependenciaId
where 'PrestadorId' = NmeColuna
and tabela.NmeTabela = 'planosaude.dbo.prestador'

insert into CasoTesteColunaMock values(@CasoTesteId, @CriticaTabelaDependenciaColunaId,'123')


insert into CasoTesteParametroExecucao values(@CasoTesteId,1, '1')


insert into CasoTeste values(@CriticaId, 1 , 'Valida prestador não encontrado na base', 'Prestador não encontrado', null)
set @CasoTesteId = @@IDENTITY

select top 1 @CriticaTabelaDependenciaColunaId =  coluna.CriticaTabelaDependenciaColunaId
from PlanoSaude.dbo.CriticaTabelaDependenciaColuna coluna
    inner join PlanoSaude.dbo.CriticaTabelaDependencia tabela 
        on tabela.criticaTabelaDependenciaId    = coluna.criticaTabelaDependenciaId
where 'beneficiarioId' = NmeColuna
and tabela.NmeTabela = 'planosaude.dbo.beneficiario'

insert into CasoTesteColunaMock values(@CasoTesteId, @CriticaTabelaDependenciaColunaId,'123')


insert into CasoTesteParametroExecucao values(@CasoTesteId,1, '7')


