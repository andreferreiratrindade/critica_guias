

-- create database PlanoSaude
-- go 
drop table if exists TesteConfiguracaoMock
drop table if exists TesteConfiguracaoColunaMock
drop table if exists CasoTesteMock
drop table if exists CasoTesteColunaMock
drop table if exists CasoTeste
drop table if exists CasoTesteParametroExecucao
drop table if exists Teste

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
    CriticaId int identity(1,1) primary key, 
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
    
    CONSTRAINT FK_Critica FOREIGN KEY (CriticaId)
    REFERENCES Critica(CriticaId),

    CONSTRAINT FK_ParametroTipo FOREIGN KEY (ParametroTipoId)
    REFERENCES ParametroTipo(ParametroTipoId)
)

create table Teste(
    TesteId int identity(1,1) primary key, 
    CriticaId int not null,
    CONSTRAINT FK_Teste_Critica FOREIGN KEY (CriticaId)
    REFERENCES Critica(CriticaId),

)

create table TesteConfiguracaoMock(
    TesteConfiguracaoMockId int identity(1,1) primary key,  
    TesteId int not null,
    NmeTabela varchar(500) not null,

    CONSTRAINT FK_TesteConfiguracaoMock_Teste FOREIGN KEY (TesteId)
    REFERENCES Teste(TesteId),

)

create table TesteConfiguracaoColunaMock(
    TesteConfiguracaoColunaMockId int identity(1,1) primary key, 
    TesteConfiguracaoMockId  int not null,
    ParametroTipoId int not null,
    NmeColuna varchar(500) not null,

    CONSTRAINT FK_TesteConfiguracaoMock_TesteConfiguracaoColunaMock FOREIGN KEY (TesteConfiguracaoMockId)
    REFERENCES TesteConfiguracaoMock(TesteConfiguracaoMockId),

    CONSTRAINT FK_TesteConfiguracaoMock_ParametroTipo FOREIGN KEY (ParametroTipoId)
    REFERENCES ParametroTipo(ParametroTipoId),
)


create table CasoTeste(
    CasoTesteId int identity(1,1) primary key, 
    TesteId int not null,
    CasoTesteSituacaoId smallint not null,
    NmeCasoTeste varchar(250) not null, 
    NmeEsperado varchar(500), 
   
    CONSTRAINT FK_CasoTeste_Teste FOREIGN KEY (TesteId)
    REFERENCES Teste(TesteId),

    CONSTRAINT FK_CasoTeste_CasoTesteSituacao FOREIGN KEY (CasoTesteSituacaoId)
    REFERENCES CasoTesteSituacao(CasoTesteSituacaoId),

    
)

create table CasoTesteColunaMock(
    CasoTesteColunaMockId int identity(1,1) primary key, 
    CasoTesteId int not null, 
    TesteConfiguracaoColunaMockId int not null,
    ValorColunaMock varchar(500),

    CONSTRAINT FK_TesteConfiguracaoColunaMock_CasoTesteColunaMock FOREIGN KEY (TesteConfiguracaoColunaMockId)
    REFERENCES TesteConfiguracaoColunaMock(TesteConfiguracaoColunaMockId),

    CONSTRAINT FK_TesteConfiguracaoColunaMock_CasoTeste FOREIGN KEY (CasoTesteId)
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


insert into Beneficiario_Mock values(1,'André', 09891023605)
insert into Beneficiario_Mock values(2,'Gustavo', 09891023605)
insert into Beneficiario_Mock values(3,'Taís', 09891023605)


insert into Prestador_Mock values(1, 'Prestador 1', 1, '20210909')
insert into Prestador_Mock values(2, 'Prestador 2', 2, '20210909')


insert into Critica values('0001 - Prestador não encontrado', 'Valida se contem prestador na base de dados', 1,'critica_ans_0001')
insert into Critica values('0002 - Beneficiario não encontrado', 'Valida se contem beneficiário na base de dados', 2,'critica_ans_0002')

insert into ParametroTipo values(1, 'int')
insert into ParametroTipo values(2, 'varchar')
insert into ParametroTipo values(3, 'char')
insert into ParametroTipo values(4, 'decimal')



execute aplicacao.dbo.monta_parametro_critica

-- Criando primeiro teste

declare @TesteConfiguracaoMockId int = 0
,   @TesteId int = 0
,   @CasoTesteId int = 0
,   @TesteConfiguracaoColunaMockId int = 0
insert into Teste values(1)
set @TesteId = @@IDENTITY

insert into TesteConfiguracaoMock values(@TesteId, 'PlanoSaude.dbo.Prestador')

set @TesteConfiguracaoMockId = @@IDENTITY

insert into TesteConfiguracaoColunaMock values(@TesteConfiguracaoMockId, 1,  'PrestadorId')
set @TesteConfiguracaoColunaMockId = @@IDENTITY

insert into CasoTeste values(@TesteId, 1, 'Valida prestador', 'Prestador não encontrado')
set @CasoTesteId = @@IDENTITY

insert into CasoTesteColunaMock values(@CasoTesteId, @TesteConfiguracaoColunaMockId,'123')


insert into CasoTesteParametroExecucao values(@CasoTesteId,1, '123')

