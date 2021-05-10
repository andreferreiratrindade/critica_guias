create database CriticaGuia;

use CriticaGuia;


create table Critica(

    IdCritica int auto_increment primary key, 
    NmeCritica varchar(500) not null, 
    DesCritica text not null, 
    NroCritica int not null, 
    DtaInclusao TIMESTAMP  default current_timestamp
);


create table TipoParametro(

    IdTipoParametro tinyint primary key not null, 
    NmeTipoParametro varchar(100) not null
);

create table TipoDado(

    IdTipoDado int primary key not null, 
    NmeTipoDado varchar(50) not null, 
    DesTipoDado varchar(500) not null
);



create table Parametro(
    IdParametro int auto_increment primary key,  
    NmeParametro varchar(50) not null, 
    IdTipoParametro tinyint not null, 
    DesCorParametro varchar(50) not null,
    FOREIGN KEY (IdTipoParametro)
    REFERENCES TipoParametro (IdTipoParametro)
    ON UPDATE RESTRICT ON DELETE CASCADE
);

create table TipoParametroConsulta(
	IdTipoParametroConsulta tinyint not null primary key, 
    NmeTipoParametroConsulta varchar(50) not null
);




create table ParametroConsulta(
    IdParametroConsulta int auto_increment primary key, 
    IdParametro int not null, 
    IdTipoParametroConsulta tinyint not null, -- Caso parametro esteja relacionado ao beneficiário, prestador, conveniada
    IdTipoDado  int not null, 
    TxtSelect   text not null, 
    TxtFrom     text not null, 
    TxtWhere    text null, 
    DtaInclusao TIMESTAMP  default current_timestamp,

    FOREIGN KEY (IdParametro)
    REFERENCES Parametro (IdParametro)
    ON UPDATE RESTRICT ON DELETE CASCADE,
    
	FOREIGN KEY (IdTipoParametroConsulta)
    REFERENCES TipoParametroConsulta (IdTipoParametroConsulta)
    ON UPDATE RESTRICT ON DELETE CASCADE, 

    FOREIGN KEY (IdTipoDado)
    REFERENCES TipoDado (IdTipoDado)
    ON UPDATE RESTRICT ON DELETE CASCADE
);

create table ParametroGeral(
    IdParametroGeral int auto_increment primary key, 
    IdParametro int not null, 
    TxtParametroGeral varchar(500) not null,
    DtaInclusao TIMESTAMP  default current_timestamp,

    FOREIGN KEY (IdParametro)
    REFERENCES Parametro (IdParametro)
    ON UPDATE RESTRICT ON DELETE CASCADE
);



create table CriticaParametro(

    IdCriticaParametro int auto_increment primary key,
    IdCritica int not null, 
    IdParametro int not null, 
    SeqCriticaParametro int not null, 
    DtaInclusao TIMESTAMP  default current_timestamp,

    FOREIGN KEY (IdParametro)
    REFERENCES Parametro (IdParametro)
    ON UPDATE RESTRICT ON DELETE CASCADE,

    FOREIGN KEY (IdCritica)
    REFERENCES Critica (IdCritica)
    ON UPDATE RESTRICT ON DELETE CASCADE
);


create table Beneficiario(
    IdBeneficiario int auto_increment primary key,  
    NmeBeneficiario varchar(100) not null, 
    DtaNascimento TIMESTAMP not null,
    DtaInicioValidade TIMESTAMP not null, 
    DtaFimValidade TIMESTAMP
);

create table Prestador(
    IdPrestador int auto_increment primary key,  
    NmeRazaoSocial varchar(500) not null, 
    NroCNPJ int not null
);

create table Guia(
    IdGuia int auto_increment primary key,  
    IdBeneficiario int not null,  
    IdPrestador int not null,  

    DtaEntrada TIMESTAMP not  null, 

    FOREIGN KEY (IdPrestador)
    REFERENCES Prestador (IdPrestador)
    ON UPDATE RESTRICT ON DELETE CASCADE,

    FOREIGN KEY (IdBeneficiario)
    REFERENCES Beneficiario (IdBeneficiario)
    ON UPDATE RESTRICT ON DELETE CASCADE
);

create table Item(
    IdItem int auto_increment primary key,  
    IdGuia int not null,  
    VlrItem decimal(15,2) not null, 
    NroServico int not null,

    FOREIGN KEY (IdGuia)
    REFERENCES Guia (IdGuia)
    ON UPDATE RESTRICT ON DELETE CASCADE

);

create table CriticaTeste(
    IdCriticaTeste int auto_increment primary key,  
    IdCritica   int not null,
    DesCriticaTeste text not null,
    StaResultadoEsperado bit not null, 
    StaResultadoObtido bit,
    DtaAtualizacao TIMESTAMP  default current_timestamp,
    FOREIGN KEY (IdCritica)
    REFERENCES Critica (IdCritica)
    ON UPDATE RESTRICT ON DELETE CASCADE
);


create table CriticaTesteParametro(
    IdCriticaTesteParametro int auto_increment primary key,
    IdCriticaTeste int not null, 
    IdCriticaParametro int not null, 
    TxtParametroTeste text not null,

    FOREIGN KEY (IdCriticaParametro)
    REFERENCES CriticaParametro (IdCriticaParametro)
    ON UPDATE RESTRICT ON DELETE CASCADE,

    FOREIGN KEY (IdCriticaTeste)
    REFERENCES CriticaTeste (IdCriticaTeste)
    ON UPDATE RESTRICT ON DELETE CASCADE

);


insert into TipoDado values(1,'int', 'numerico');
insert into TipoDado values(2,'varchar(100)', 'texto');
insert into TipoDado values(3,'TIMESTAMP', 'data');

insert into TipoParametroConsulta values(1, 'Beneficiário');
insert into TipoParametroConsulta values(2, 'Prestador');
insert into TipoParametroConsulta values(3, 'Guia');

insert into TipoParametro values(1, 'Operadores Lógicos / Recursos do sistema');
insert into TipoParametro values(2, 'Consulta');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`) VALUES ( '(', 1, 'purple-3' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'(');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES (')', 1, 'purple-3' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),')');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES ('e', 1, 'purple-3' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'&&');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES ('ou', 1, 'purple-3' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'||');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`) VALUES ('maior que', 1, 'purple-3' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'>');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES ('maior ou igual que', 1, 'purple-3' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'>=');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`) VALUES ('menor que', 1, 'purple-3' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'<');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES ('menor ou igual que', 1, 'purple-3' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'<=');


INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES ('data atual', 1, 'green-5' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'now()');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES ('data fim de validade do beneficiário', 2, 'indigo-2' );
INSERT INTO `criticaguia`.`parametroconsulta`
(
`IdParametro`,
`IdTipoParametroConsulta`,
`TxtSelect`,
`TxtFrom`,
`TxtWhere`)
VALUES
(
LAST_INSERT_ID(),
1,
'beneficiario.DtaFimValidade',
'Beneficiario beneficiario 
	inner join Guia guia 
    on guia.IdBeneficiario = beneficiario.IdBeneficiario',
'guia.IdGuia = :idGuia');


INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES ('data de entrada da guia', 2, 'amber-2' );

INSERT INTO `criticaguia`.`parametroconsulta`
(
`IdParametro`,
`IdTipoParametroConsulta`,
`TxtSelect`,
`TxtFrom`,
`TxtWhere`)
VALUES
(
LAST_INSERT_ID(),
3,
'guia.DtaEntrada',
'Guia guia',
'guia.IdGuia = :idGuia');