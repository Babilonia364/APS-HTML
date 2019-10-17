CREATE DATABASE  IF NOT EXISTS `apsjob` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `apsjob`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: apsjob
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aluno`
--

DROP TABLE IF EXISTS `aluno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aluno` (
  `idAluno` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `instituicao` varchar(45) DEFAULT NULL,
  `matricula` varchar(45) DEFAULT NULL,
  `aLogin` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAluno`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_Login_idx` (`aLogin`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno`
--

LOCK TABLES `aluno` WRITE;
/*!40000 ALTER TABLE `aluno` DISABLE KEYS */;
INSERT INTO `aluno` VALUES (1,'asas','asas','asas','asas',NULL),(2,'jv','jv@lixo.br','UECE','12331321',NULL),(3,'jv2','jv@uece.br','UECE','1245543',NULL),(4,'Limão','mateusx5@gmail.com','UECE','6666mole6dura',34),(5,'Comitador','Comitador@yahoo.com','Casa das primas','5656656465',36);
/*!40000 ALTER TABLE `aluno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artigo`
--

DROP TABLE IF EXISTS `artigo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artigo` (
  `idArtigo` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `resumo` text,
  `arquivo` varbinary(16000) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `login` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idArtigo`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artigo`
--

LOCK TABLES `artigo` WRITE;
/*!40000 ALTER TABLE `artigo` DISABLE KEYS */;
INSERT INTO `artigo` VALUES (1,'jv piroca de gato','Lima@gmail.com','Prova de que o jv tem piroca de gato','Mateus',NULL,NULL,NULL),(2,'Por que a camila tem o rabão?','Incognito','Incog@hotmail.com','Neste artigo nos questionamos por que a camila tem o rabão.',NULL,NULL,'phnegao@hotmail.com'),(3,'Titulo','Biroliro','biroliro@hotmail.com','Resumo',NULL,'aguardando revisão','Comitador@yahoo.com'),(4,'Titulo2','Incognito','Incog@hotmail.com','Qualquer coisa aqui',NULL,'aguardando revisão',NULL),(5,'Titulo3','Incognito','Incog@hotmail.com','Qualquer coisa aqui',NULL,'aguardando revisão',NULL),(6,'Titulo4','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(7,'Titulo5','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(8,'Titulo6','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(9,'Titulo7','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(10,'Titulo9','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(11,'Titulo10','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(12,'Tit1','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(13,'Tit2','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(14,'Tit3','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(15,'Tit4','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(16,'Titulo11','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(17,'Titulo111','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(18,'Titulo21','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(19,'Titulo211','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'aguardando revisão','Comitador@yahoo.com'),(20,'Titulo22','Verbena Lucia','verbena2@uece.br','Qualquer coisa aqui',NULL,'Rejeitado','Comitador@yahoo.com');
/*!40000 ALTER TABLE `artigo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artigo_evento`
--

DROP TABLE IF EXISTS `artigo_evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artigo_evento` (
  `idArtigoEvento` int(11) NOT NULL AUTO_INCREMENT,
  `fkArtigo` int(11) DEFAULT NULL,
  `fkEvento` int(11) DEFAULT NULL,
  PRIMARY KEY (`idArtigoEvento`),
  KEY `fk_artigo_idx` (`fkArtigo`),
  KEY `fk_evento_idx` (`fkEvento`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artigo_evento`
--

LOCK TABLES `artigo_evento` WRITE;
/*!40000 ALTER TABLE `artigo_evento` DISABLE KEYS */;
INSERT INTO `artigo_evento` VALUES (1,3,NULL),(2,4,NULL),(3,NULL,NULL),(4,6,NULL),(5,NULL,NULL),(6,4,NULL),(7,NULL,NULL),(8,6,NULL),(9,NULL,NULL),(10,8,NULL),(11,NULL,NULL),(12,10,NULL),(13,NULL,NULL),(14,12,NULL),(15,13,NULL),(16,14,NULL),(17,15,NULL),(18,NULL,NULL),(19,NULL,NULL),(20,18,NULL),(21,19,NULL),(22,20,1);
/*!40000 ALTER TABLE `artigo_evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `idEvento` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `sigla` varchar(45) DEFAULT NULL,
  `data_in` varchar(45) DEFAULT NULL,
  `data_fn` varchar(45) DEFAULT NULL,
  `data_sub_in` varchar(45) DEFAULT NULL,
  `data_sub_fn` varchar(45) DEFAULT NULL,
  `area_conc` varchar(45) DEFAULT NULL,
  `situacao` varchar(45) DEFAULT NULL,
  `login` varchar(45) DEFAULT NULL,
  `data_in_comp` int(11) DEFAULT NULL,
  `data_out_comp` int(11) DEFAULT NULL,
  PRIMARY KEY (`idEvento`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (1,'Balbúrdia','BBD','2019-10-15','2019-10-31','2019-10-17','2019-10-29',NULL,NULL,NULL,NULL,NULL),(2,'Comer pizza na casa do Mateus','CPncdM','2019-10-30','2019-10-31','2019-10-25','2019-10-27','Casa do lima',NULL,NULL,NULL,NULL),(3,'Sacudir o JV na porrada','SJVP','2019-10-31','2019-11-02','2019-10-27','2019-10-29','Casa do JV',NULL,NULL,NULL,NULL),(4,'Rodar caixinha no cdz','RcnCDZ','2019-11-03','2019-11-09','2019-10-30','2019-11-01','UECE',NULL,NULL,NULL,NULL),(5,'Rodar 37 caixinhas e tirar só o sorento','R37CetsS','2019-10-30','2019-10-31','2019-10-23','2019-10-24','Lixo',NULL,NULL,NULL,NULL),(6,'Rodar 45 caixinhas e tirar só cavaleiro negro','R45ctsCN','2019-11-06','2019-11-07','2019-10-25','2019-10-26','Casa do lima',NULL,NULL,NULL,NULL),(7,'Quebrar o PH na porrada','QPHP','2019-10-23','2019-10-25','2019-10-18','2019-10-21','UECE',NULL,NULL,NULL,NULL),(8,'Correr pelado na praia','CPnP','2019-10-29','2019-10-31','2019-10-26','2019-10-27','Praia do oi',NULL,NULL,NULL,NULL),(9,'Irru','IRRU','2019-11-07','2019-11-08','2019-10-31','2019-11-01','Casa do lima',NULL,NULL,NULL,NULL),(11,'Chorar muito','CM','2019-11-03','2019-11-04','2019-10-27','2019-10-28','UECE',NULL,NULL,20191103,20191104);
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `tipo_user` varchar(45) DEFAULT 'aluno',
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (6,'casa','casa','aluno'),(7,'asas','asas','aluno'),(8,'case','caes','aluno'),(9,'Negreiso@MelhorProfessor.com','12345','aluno'),(10,'jv@lixo.br','pirocadegato','aluno'),(11,'jv@uece.br','pirocadegato','aluno'),(12,'admin','admin','admin'),(31,'sujiro@hotmail.com','yakuza','professor'),(30,'verbena2@uece.br','gatos','professor'),(34,'mateusx5@gmail.com','jvteamo','aluno'),(35,'phnegao@hotmail.com','brenda25','professor'),(36,'Comitador@yahoo.com','casa','aluno');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor` (
  `idprofessor` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `senha` varchar(45) DEFAULT NULL,
  `instituicao` varchar(45) DEFAULT NULL,
  `titulacao` varchar(45) DEFAULT NULL,
  `area_pesq` varchar(45) DEFAULT NULL,
  `pLogin` int(11) DEFAULT NULL,
  PRIMARY KEY (`idprofessor`),
  KEY `fk_login_idx` (`pLogin`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
INSERT INTO `professor` VALUES (1,'casa','casa',NULL,'casa',NULL,'casa',NULL),(2,'caes','case',NULL,'case',NULL,'acse',NULL),(3,'Marcos','Negreiso@MelhorProfessor.com',NULL,'Paraíso',NULL,'Pesquisa Operacional',NULL),(19,'Verbena Lucia','verbena2@uece.br',NULL,'UECE','Doutora em gatos','Gatologia',30),(20,'Sujiro Kifuja','sujiro@hotmail.com',NULL,'Universidade de Tókyo','Armas','Anatomia',31),(21,'Pedro Henrique','phnegao@hotmail.com',NULL,'Vida','Doutor','Interior das mulheres',35);
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revisor_artigo`
--

DROP TABLE IF EXISTS `revisor_artigo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revisor_artigo` (
  `idRevisorArtigo` int(11) NOT NULL AUTO_INCREMENT,
  `rArtigo` int(11) DEFAULT NULL,
  `rProfessor` int(11) DEFAULT NULL,
  PRIMARY KEY (`idRevisorArtigo`),
  KEY `fk_artigo_idx` (`rArtigo`),
  KEY `fk_professor_idx` (`rProfessor`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revisor_artigo`
--

LOCK TABLES `revisor_artigo` WRITE;
/*!40000 ALTER TABLE `revisor_artigo` DISABLE KEYS */;
INSERT INTO `revisor_artigo` VALUES (1,2,20),(2,2,20),(3,2,19),(4,2,19),(5,2,20),(6,2,20),(7,2,20),(8,2,20),(9,2,20),(10,2,20),(11,20,20);
/*!40000 ALTER TABLE `revisor_artigo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revisor_evento`
--

DROP TABLE IF EXISTS `revisor_evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revisor_evento` (
  `idRevisor` int(11) NOT NULL AUTO_INCREMENT,
  `rProfessor` int(11) DEFAULT NULL,
  `rEventos` int(11) DEFAULT NULL,
  PRIMARY KEY (`idRevisor`),
  KEY `fk_professor_idx` (`rProfessor`),
  KEY `fk_eventos_idx` (`rEventos`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revisor_evento`
--

LOCK TABLES `revisor_evento` WRITE;
/*!40000 ALTER TABLE `revisor_evento` DISABLE KEYS */;
INSERT INTO `revisor_evento` VALUES (1,20,3),(3,19,2),(2,19,3),(20,21,3),(21,21,1),(22,21,2);
/*!40000 ALTER TABLE `revisor_evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `idTag` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(45) DEFAULT NULL,
  `tEventos` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTag`),
  KEY `fk_eventos_idx` (`tEventos`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'playboy',NULL),(2,'playboy',NULL),(3,'playboy',NULL),(4,'playboy',NULL),(5,'playboy',NULL),(6,'playboy',NULL),(7,'playboy',1),(8,'playgirl',1);
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-17  0:48:23
