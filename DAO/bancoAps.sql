CREATE DATABASE  IF NOT EXISTS `apsjob` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `apsjob`;
-- MySQL dump 10.13  Distrib 5.7.24, for Win64 (x86_64)
--
-- Host: localhost    Database: apsjob
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno`
--

LOCK TABLES `aluno` WRITE;
/*!40000 ALTER TABLE `aluno` DISABLE KEYS */;
INSERT INTO `aluno` VALUES (1,'asas','asas','asas','asas',NULL),(2,'jv','jv@lixo.br','UECE','12331321',NULL),(3,'jv2','jv@uece.br','UECE','1245543',NULL),(4,'Limão','mateusx5@gmail.com','UECE','6666mole6dura',34);
/*!40000 ALTER TABLE `aluno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artigo`
--

DROP TABLE IF EXISTS `artigo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artigo`
--

LOCK TABLES `artigo` WRITE;
/*!40000 ALTER TABLE `artigo` DISABLE KEYS */;
INSERT INTO `artigo` VALUES (1,'jv piroca de gato','Lima@gmail.com','Prova de que o jv tem piroca de gato','Mateus',NULL,NULL,NULL),(2,'pq o lima eh lixo','jv@lindu','jv@uece.com','lima eh lixux',NULL,NULL,'jv');
/*!40000 ALTER TABLE `artigo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eventos` (
  `idEvento` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `sigla` varchar(45) DEFAULT NULL,
  `data_in` date DEFAULT NULL,
  `data_fn` date DEFAULT NULL,
  `data_sub_in` date DEFAULT NULL,
  `data_sub_fn` date DEFAULT NULL,
  `area_conc` varchar(45) DEFAULT NULL,
  `situacao` varchar(45) DEFAULT NULL,
  `eTag` int(11) DEFAULT NULL,
  PRIMARY KEY (`idEvento`),
  KEY `fk_tag_idx` (`eTag`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (1,'Balbúrdia','BBD','2019-10-15','2019-10-31','2019-10-17','2019-10-29',NULL,NULL,NULL),(2,'Comer pizza na casa do Mateus','CPncdM','2019-10-30','2019-10-31','2019-10-25','2019-10-27','Casa do lima',NULL,NULL),(3,'Sacudir o JV na porrada','SJVP','2019-10-31','2019-11-02','2019-10-27','2019-10-29','Casa do JV',NULL,NULL);
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `tipo_user` varchar(45) DEFAULT 'aluno',
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (6,'jv','jv','aluno'),(7,'lima','lima','professor'),(8,'alan','alan','admin'),(9,'Negreiso@MelhorProfessor.com','12345','aluno'),(10,'jv@lixo.br','pirocadegato','aluno'),(11,'jv@uece.br','pirocadegato','aluno'),(12,'admin','admin','admin'),(31,'sujiro@hotmail.com','yakuza','professor'),(30,'verbena2@uece.br','gatos','professor'),(34,'mateusx5@gmail.com','jvteamo','aluno');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
INSERT INTO `professor` VALUES (1,'casa','casa',NULL,'casa',NULL,'casa',NULL),(2,'caes','case',NULL,'case',NULL,'acse',NULL),(3,'Marcos','Negreiso@MelhorProfessor.com',NULL,'Paraíso',NULL,'Pesquisa Operacional',NULL),(19,'Verbena Lucia','verbena2@uece.br',NULL,'UECE','Doutora em gatos','Gatologia',30),(20,'Sujiro Kifuja','sujiro@hotmail.com',NULL,'Universidade de Tókyo','Armas','Anatomia',31);
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revisor`
--

DROP TABLE IF EXISTS `revisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `revisor` (
  `idRevisor` int(11) NOT NULL,
  `rProfessor` int(11) DEFAULT NULL,
  `rEventos` int(11) DEFAULT NULL,
  PRIMARY KEY (`idRevisor`),
  KEY `fk_professor_idx` (`rProfessor`),
  KEY `fk_eventos_idx` (`rEventos`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revisor`
--

LOCK TABLES `revisor` WRITE;
/*!40000 ALTER TABLE `revisor` DISABLE KEYS */;
/*!40000 ALTER TABLE `revisor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `idTag` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTag`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
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

-- Dump completed on 2019-10-15 21:32:49
