CREATE DATABASE  IF NOT EXISTS `eventmatchdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `eventmatchdb`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: eventmatchdb
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(150) NOT NULL,
  `Description` text,
  `EventDate` datetime NOT NULL,
  `City` varchar(50) NOT NULL,
  `Category` varchar(50) NOT NULL,
  `CreatedBy` int DEFAULT NULL,
  `ImageUrl` text,
  PRIMARY KEY (`Id`),
  KEY `CreatedBy` (`CreatedBy`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `users` (`Id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (7,'AI & Future Tech Summit 2026','Join leading experts to discuss the future of Artificial Intelligence, machine learning, and robotics. Networking session included.','2026-02-06 18:30:00','Istanbul','Technology',NULL,'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'),(8,'Summer Jazz Festival','An unforgettable night under the stars with the best jazz bands from around the world. Open air concert experience.','2026-03-19 18:31:00','Izmir','Music',NULL,'https://images.unsplash.com/photo-1511192336575-5a79af67a629'),(9,'Modern Art Exhibition','A unique collection of contemporary art pieces from local and international artists. Workshop starts at 14:00.','2026-02-20 18:31:00','Ankara','Art',NULL,'https://images.unsplash.com/photo-1545989253-02cc26577f88'),(12,'Creative Writing Workshop','Learn how to write compelling stories. A workshop designed for beginners and aspiring authors.','2026-02-12 10:00:00','Istanbul','Education',NULL,'https://images.unsplash.com/photo-1455390582262-044cdead277a'),(13,'Global Startup Networking','Meet investors and entrepreneurs from around the world. Pitch your idea and grow your network.','2026-03-05 15:00:00','Ankara','Business',NULL,'https://images.unsplash.com/photo-1515187029135-18ee286d815b'),(14,'Cappadocia Photography Tour','Capture the magic of hot air balloons at sunrise. A 2-day trip for photography lovers and travelers.','2026-05-10 05:00:00','Nevsehir','Travel',NULL,'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd'),(17,'Street Food Carnival','Taste delicious dishes from all over the world. A perfect weekend event for foodies and families with live music.','2026-06-25 17:00:00','Istanbul','Food',NULL,'https://images.unsplash.com/photo-1555939594-58d7cb561ad1'),(18,'Next-Gen Gaming Expo','Experience the latest VR technology, play upcoming games before anyone else, and meet pro gamers.','2026-08-18 10:00:00','Ankara','Technology',NULL,'https://images.unsplash.com/photo-1593508512255-86ab42a8e620'),(20,'Open Air Jazz Night','An unforgettable night under the stars with the best jazz performers. Enjoy the rhythm and smooth vibes.','2026-06-15 21:00:00','Istanbul','Music',NULL,'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f'),(21,'City Marathon 2026','Challenge yourself! Join thousands of runners in the annual city marathon. Medals for everyone.','2026-04-20 08:00:00','Izmir','Sports',NULL,'https://images.unsplash.com/photo-1530549387789-4c1017266635');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interests`
--

DROP TABLE IF EXISTS `interests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interests` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `TagName` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `TagName` (`TagName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interests`
--

LOCK TABLES `interests` WRITE;
/*!40000 ALTER TABLE `interests` DISABLE KEYS */;
/*!40000 ALTER TABLE `interests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participants` (
  `UserId` int NOT NULL,
  `EventId` int NOT NULL,
  `JoinedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserId`,`EventId`),
  KEY `EventId` (`EventId`),
  CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `participants_ibfk_2` FOREIGN KEY (`EventId`) REFERENCES `events` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES (1,9,'2026-01-05 15:16:11'),(1,14,'2026-01-05 15:39:24'),(2,7,'2026-01-03 18:32:41'),(2,8,'2026-01-03 20:06:25'),(2,9,'2026-01-03 18:32:44');
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinterests`
--

DROP TABLE IF EXISTS `userinterests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinterests` (
  `UserId` int NOT NULL,
  `InterestId` int NOT NULL,
  PRIMARY KEY (`UserId`,`InterestId`),
  KEY `InterestId` (`InterestId`),
  CONSTRAINT `userinterests_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `userinterests_ibfk_2` FOREIGN KEY (`InterestId`) REFERENCES `interests` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinterests`
--

LOCK TABLES `userinterests` WRITE;
/*!40000 ALTER TABLE `userinterests` DISABLE KEYS */;
/*!40000 ALTER TABLE `userinterests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FullName` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `PasswordHash` varchar(255) NOT NULL,
  `Role` varchar(20) DEFAULT 'User',
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Aleyna React','aleyna@test.com','123456_secret','User','2026-01-03 17:40:21'),(2,'Beren ','beren@test.com','12345_secret','User','2026-01-03 17:43:30');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'eventmatchdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-05 15:42:13
