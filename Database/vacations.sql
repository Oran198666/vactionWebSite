CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`userId`,`vacationId`),
  KEY `idx_likes_vacationId` (`vacationId`),
  CONSTRAINT `fk_likes_user` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_likes_vacation` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (2,1),(3,1),(3,2),(2,3),(2,5),(3,5),(4,5),(2,8),(4,8),(3,9),(4,11),(2,12),(4,14);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` tinyint NOT NULL DEFAULT '2',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `uq_users_email` (`email`),
  CONSTRAINT `ck_users_role` CHECK ((`roleId` in (1,2)))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','User','admin@vacations.com','REPLACE_WITH_HASH',1),(2,'Dana','Levi','dana@gmail.com','REPLACE_WITH_HASH',2),(3,'Yossi','Cohen','yossi@gmail.com','REPLACE_WITH_HASH',2),(4,'Maya','Bar','maya@gmail.com','REPLACE_WITH_HASH',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacationId` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `imageName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`vacationId`),
  KEY `idx_vacations_startDate` (`startDate`),
  CONSTRAINT `ck_vacations_dates` CHECK ((`endDate` >= `startDate`)),
  CONSTRAINT `ck_vacations_price` CHECK (((`price` >= 0) and (`price` <= 10000)))
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Rome, Italy','Wander the Roman Forum, the Pantheon and the Colosseum, then lose yourself in Trastevere\'s cobbled lanes over plates of cacio e pepe. Includes a skip-the-line Vatican Museums tour.','2026-06-10','2026-06-18',1931.00,'rome.jpg'),(2,'Rhodes, Greece','Sun, sea and a UNESCO-listed medieval old town. Days split between Pefkos Beach and the Palace of the Grand Master, with a day trip to Lindos Acropolis.','2026-07-05','2026-07-15',1462.00,'rhodes.jpg'),(3,'Prague, Czech Republic','Gothic spires, the Charles Bridge at sunrise and the astronomical clock. Includes a Vltava river cruise and a walking tour of the Jewish Quarter.','2026-08-01','2026-08-09',1120.00,'prague.jpg'),(4,'Barcelona, Spain','Gaudi\'s Sagrada Familia and Park Guell, tapas crawls through the Gothic Quarter, and lazy afternoons on Barceloneta Beach.','2026-08-20','2026-08-29',1655.00,'barcelona.jpg'),(5,'Santorini, Greece','Whitewashed cliffside villages above a flooded caldera. Sunset in Oia, a catamaran cruise to the hot springs, and wine tasting in Megalochori.','2026-08-22','2026-09-02',2210.00,'santorini.jpg'),(6,'Amsterdam, Netherlands','Canal-side cycling, the Van Gogh Museum and the Anne Frank House. Includes a day trip to the windmills of Zaanse Schans.','2026-08-18','2026-08-26',1385.00,'amsterdam.jpg'),(7,'Lisbon, Portugal','Tram 28 through Alfama, pasteis de nata in Belem and fado in a candlelit tavern. Includes a day in the palaces of Sintra.','2026-09-12','2026-09-20',1290.00,'lisbon.jpg'),(8,'Tokyo, Japan','Shibuya Crossing, Senso-ji at dawn and a day trip to Hakone for Mount Fuji views. Includes a 7-day Japan Rail Pass and a Tsukiji food tour.','2026-10-03','2026-10-15',3480.00,'tokyo.jpg'),(9,'Reykjavik, Iceland','Chase the northern lights, soak in the Blue Lagoon and drive the Golden Circle past Gullfoss and Geysir. Includes a glacier hike on Solheimajokull.','2026-11-08','2026-11-16',2640.00,'reykjavik.jpg'),(10,'Marrakesh, Morocco','Get pleasantly lost in the souks of the medina, sip mint tea on a riad rooftop, and ride camels into the Agafay desert for a night under the stars.','2026-11-20','2026-11-28',1075.00,'marrakesh.jpg'),(11,'Bangkok, Thailand','Golden temples, longtail boats through the klongs and the best street food on earth. Includes a day at the Damnoen Saduak floating market.','2026-12-05','2026-12-17',2150.00,'bangkok.jpg'),(12,'New York City, USA','Central Park in the snow, the Met, a Broadway show and the view from the Top of the Rock. Includes a ferry past the Statue of Liberty.','2027-01-09','2027-01-17',2890.00,'newyork.jpg'),(13,'Vienna, Austria','Schonbrunn Palace, coffee-house culture and an evening of Mozart at the Musikverein. Includes a day trip to the Wachau valley.','2027-02-14','2027-02-21',1520.00,'vienna.jpg'),(14,'Kyoto, Japan','Cherry blossom season among 1,600 temples. Fushimi Inari\'s torii gates, the Arashiyama bamboo grove and a tea ceremony in Gion.','2027-03-28','2027-04-07',3310.00,'kyoto.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-24 18:23:05
