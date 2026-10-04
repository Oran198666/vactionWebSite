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
INSERT INTO `likes` VALUES (2,1),(3,1),(3,2),(2,3),(2,5),(3,5),(4,5),(2,8),(4,8),(3,9),(4,11),(2,12),(4,14),(2,34);
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','User','admin@vacations.com','$2b$10$Y/BvLksO8PDzhFm/huHC3OMoF28ogc2gjFyzKiK2xxKe0Rqcuvg3u',1),(2,'Dana','Levi','dana@gmail.com','$2b$10$Y/BvLksO8PDzhFm/huHC3OMoF28ogc2gjFyzKiK2xxKe0Rqcuvg3u',2),(3,'Yossi','Cohen','yossi@gmail.com','$2b$10$Y/BvLksO8PDzhFm/huHC3OMoF28ogc2gjFyzKiK2xxKe0Rqcuvg3u',2),(4,'Maya','Bar','maya@gmail.com','$2b$10$Y/BvLksO8PDzhFm/huHC3OMoF28ogc2gjFyzKiK2xxKe0Rqcuvg3u',2),(17,'oran','sasson','oran86@gmail.com','$2b$10$Y/BvLksO8PDzhFm/huHC3OMoF28ogc2gjFyzKiK2xxKe0Rqcuvg3u',2);
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
  `continent` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `description` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `imageName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`vacationId`),
  KEY `idx_vacations_startDate` (`startDate`),
  CONSTRAINT `ck_vacations_dates` CHECK ((`endDate` >= `startDate`)),
  CONSTRAINT `ck_vacations_price` CHECK (((`price` >= 0) and (`price` <= 10000)))
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Rome, Italy','Europe','Wander the Roman Forum, the Pantheon and the Colosseum, then lose yourself in Trastevere\'s cobbled lanes over plates of cacio e pepe. Includes a skip-the-line Vatican Museums tour.','2026-11-02','2026-11-10',1931.00,'43a3822f-d75a-412f-abc3-796f81876414.jpg'),(2,'Rhodes, Greece','Europe','Sun, sea and a UNESCO-listed medieval old town. Days split between Pefkos Beach and the Palace of the Grand Master, with a day trip to Lindos Acropolis.','2026-11-16','2026-11-26',1462.00,'832a08ad-96fe-424a-b8f6-56ecea1c33a5.jpg'),(3,'Prague, Czech Republic','Europe','Gothic spires, the Charles Bridge at sunrise and the astronomical clock. Includes a Vltava river cruise and a walking tour of the Jewish Quarter.','2026-12-01','2026-12-09',1120.00,'b0190ba2-12c9-42ec-a555-233a90646b8a.jpg'),(4,'Barcelona, Spain','Europe','Gaudi\'s Sagrada Familia and Park Guell, tapas crawls through the Gothic Quarter, and lazy afternoons on Barceloneta Beach.','2026-12-14','2026-12-25',1655.00,'6c402fbf-eafa-4c59-be90-fd5851436601.jpg'),(5,'Santorini, Greece','Europe','Whitewashed cliffside villages above a flooded caldera. Sunset in Oia, a catamaran cruise to the hot springs, and wine tasting in Megalochori.','2027-01-05','2027-01-16',2210.00,'9b7d5ee3-dee5-4fde-8c20-765ef4a9302b.jpg'),(6,'Amsterdam, Netherlands','Europe','Canal-side cycling, the Van Gogh Museum and the Anne Frank House. Includes a day trip to the windmills of Zaanse Schans.','2027-01-20','2027-02-01',1385.00,'22632d18-d1ce-46be-aff6-1cc52f1b2083.jpg'),(7,'Lisbon, Portugal','Europe','Tram 28 through Alfama, pasteis de nata in Belem and fado in a candlelit tavern. Includes a day in the palaces of Sintra.','2027-02-08','2027-02-16',1290.00,'5d9e7f97-2cfd-407b-a662-74b8518919e4.jpg'),(8,'Tokyo, Japan','Asia','Shibuya Crossing, Senso-ji at dawn and a day trip to Hakone for Mount Fuji views. Includes a 7-day Japan Rail Pass and a Tsukiji food tour.','2027-02-22','2027-03-06',3480.00,'1ce02fc3-12a8-45f0-8f7b-7b0ba0011054.jpg'),(9,'Reykjavik, Iceland','Europe','Chase the northern lights, soak in the Blue Lagoon and drive the Golden Circle past Gullfoss and Geysir. Includes a glacier hike on Solheimajokull.','2027-03-15','2027-03-23',2640.00,'8c92d33e-69f4-43a3-8716-ba2e1c0dbb82.jpg'),(10,'Marrakesh, Morocco','Africa','Get pleasantly lost in the souks of the medina, sip mint tea on a riad rooftop, and ride camels into the Agafay desert for a night under the stars.','2027-04-05','2027-04-13',1075.00,'dd6d5844-df58-4875-b0a5-f478f2fefc8d.jpg'),(11,'Bangkok, Thailand','Asia','Golden temples, longtail boats through the klongs and the best street food on earth. Includes a day at the Damnoen Saduak floating market.','2027-04-19','2027-05-01',2150.00,'c69ce018-4065-4d6f-936e-b9bab4abccaf.jpg'),(12,'New York City, USA','North America','Central Park in the snow, the Met, a Broadway show and the view from the Top of the Rock. Includes a ferry past the Statue of Liberty.','2027-05-10','2027-05-18',2890.00,'e187a292-ec08-4099-b2b2-278297161fe6.jpg'),(13,'Vienna, Austria','Europe','Schonbrunn Palace, coffee-house culture and an evening of Mozart at the Musikverein. Includes a day trip to the Wachau valley.','2027-06-01','2027-06-08',1520.00,'492fe733-f1a1-4b3e-a670-3005284ca1b0.jpg'),(14,'Kyoto, Japan','Asia','Cherry blossom season among 1,600 temples. Fushimi Inari\'s torii gates, the Arashiyama bamboo grove and a tea ceremony in Gion.','2027-06-21','2027-07-01',3310.00,'c650463b-565c-44c8-b908-d8848c2d0ce6.jpg'),(16,'Split, Croatia','Europe','Diocletian\'s Palace, the Marjan hill trails and island-hopping day trips to Hvar and Brac from the old harbour','2027-07-14','2027-07-23',1840.00,'1f4ed8a3-0dfe-459e-88e6-880068fb7a8a.jpg'),(18,'Dubrovnik, Croatia','Europe','Walk the medieval city walls at sunrise, kayak beneath the ramparts and take the cable car up Mount Srd for the whole Adriatic coast.','2026-06-16','2026-06-25',1581.00,'5e3d9f41-44f6-48aa-8bb5-e038c800daee.jpg'),(19,'Edinburgh, Scotland','Europe','The castle on its volcanic rock, the closes of the Old Town and a whisky tasting in Leith. Includes a day in the Highlands and Loch Ness.','2026-07-01','2026-07-09',1450.00,'58c21db2-6316-4123-a049-5b588a1ec78c.jpg'),(20,'Hanoi, Vietnam','Asia','Street food in the Old Quarter, the Temple of Literature and an overnight cruise through the limestone karsts of Ha Long Bay.','2026-07-12','2026-07-23',1890.00,'582657ab-b82b-41e0-8f3d-ccfe929d0972.jpg'),(21,'Cape Town, South Africa','Africa','Table Mountain by cable car, penguins at Boulders Beach and the winelands of Stellenbosch. Includes a drive along Chapman\'s Peak.','2026-07-20','2026-08-02',2760.00,'32c2acc9-d935-4b18-8d94-363fc71e6199.jpg'),(22,'Copenhagen, Denmark','Europe','Nyhavn\'s painted houses, Tivoli Gardens after dark and the best bakeries in Scandinavia. Includes a canal tour and a day in Malmo.','2026-08-03','2026-08-11',1695.00,'e70502ee-add5-4981-afef-a955910d2329.jpg'),(23,'Cairo, Egypt','Africa','The Giza pyramids at dawn, the Egyptian Museum and a felucca on the Nile. Includes a domestic flight to Luxor and the Valley of the Kings.','2026-08-08','2026-08-18',1980.00,'404a6439-2ea3-49d5-b03e-7511e9a1dfd6.jpg'),(24,'Budapest, Hungary','Europe','Thermal baths at Szechenyi, the Parliament lit up from across the Danube and ruin bars in the Jewish Quarter.','2026-08-20','2026-08-28',1150.00,'a7e65b5d-fea5-4cd2-a4a9-24e1b199c848.jpg'),(25,'Seoul, South Korea','Asia','Gyeongbokgung Palace, the night markets of Myeongdong and a DMZ day tour. Includes a cooking class and a stay in a traditional hanok.','2026-08-25','2026-09-05',2480.00,'ec2f7b5b-dc2e-4c23-9bfe-21af4aa1d40b.jpg'),(26,'Porto, Portugal','Europe','Port houses along the Douro, azulejo tiles at Sao Bento station and a river cruise through the terraced vineyards of the valley.','2026-09-01','2026-09-11',1210.00,'c6c0bf48-4846-456e-96a8-1d1c60dd2096.jpg'),(27,'Bali, Indonesia','Asia','Rice terraces at Tegallalang, temple ceremonies in Ubud and surf breaks along the Bukit peninsula. A long stay with time to slow down.','2026-08-18','2026-11-30',2340.00,'dc98ff6f-05ed-4ab3-9965-b73678e9d3e6.jpg'),(28,'Queenstown, New Zealand','Oceania','Bungee jumping over the Kawarau, hiking the Routeburn Track and a jet boat through the Shotover canyons. Includes a trip to Milford Sound.','2026-08-25','2026-12-10',3620.00,'31694093-ce38-4f25-b5c0-418ab398f865.jpg'),(29,'Cusco, Peru','South America','Acclimatise in the old Inca capital, hike the Sacred Valley and reach Machu Picchu by rail. Includes a guided tour of Rainbow Mountain.','2026-09-01','2026-11-20',2890.00,'c0d041a5-3731-4d54-b3c4-7a7ce902574b.jpg'),(30,'Chiang Mai, Thailand','Asia','Mountain temples, an ethical elephant sanctuary and a Sunday walking market. Includes a northern Thai cooking course over several days.','2026-09-04','2026-12-18',1760.00,'d3485c31-8ce8-44f3-9022-e9645de11519.jpg'),(31,'Reykjanes, Iceland','Europe','A long autumn stay for the northern lights, with geothermal spas, lava fields and the volcanic coastline of the Reykjanes peninsula.','2026-09-08','2026-12-01',2950.00,'b828d564-a9b0-4b7c-a56c-401720f46b0b.jpg'),(32,'Buenos Aires, Argentina','South America','Tango in San Telmo, steak in Palermo and a day at the Recoleta cemetery. Includes a weekend in the wine country around Mendoza.','2026-09-10','2026-11-15',2410.00,'65dc5580-9127-410f-97d6-91c11b5201aa.jpg'),(33,'Zanzibar, Tanzania','Africa','Stone Town\'s carved doors and spice markets, then the east coast beaches. Includes a dhow sunset cruise and a safari extension.','2026-09-12','2026-11-28',2180.00,'ee6b929b-0932-4d0a-a45c-7815063b1afb.jpg'),(34,'Sicily, Italy','Europe','Autumn in Palermo, Etna by cable car and the Greek temples of Agrigento. Includes the baroque towns of the Val di Noto.','2026-09-14','2026-10-30',1640.00,'23f3fa80-d15a-44e3-9e92-d589bc2597f0.jpg'),(35,'Montreal, Canada','North America','Autumn colours in Mont-Royal park, bagels in Mile End and the old port. Includes a driving trip to Quebec City and the Laurentians.','2026-09-05','2026-11-08',1930.00,'efb44c64-c5c2-4569-bfd7-9e5cb0f79777.jpg'),(36,'Kathmandu, Nepal','Asia','The stupas of Boudhanath and Swayambhunath, then the peak trekking season in the Annapurna foothills with a licensed mountain guide.','2026-09-02','2026-12-05',2070.00,'7ad3d82c-ee6d-4397-b14c-991126c7ca98.jpg'),(38,'Antarctic Expedition Cruise','Antarctica','land by zodiac among penguin colonies, and watch whales in the Antarctic Peninsula. Includes all meals, polar gear and expert guides on board.','2027-01-10','2027-01-28',10000.00,'cc03d727-ac8d-417a-8ae5-88cc1dc9e12a.jpg'),(39,'Paris, France - outside deals','Europe','A quick overnight escape to Paris. Watch the Eiffel Tower sparkle after dark, stroll through Montmartre and the Latin Quarter, and enjoy croissants at a sidewalk café before heading home. Includes one night in a central boutique hotel.','2027-03-01','2027-03-02',320.00,'2c496ccd-5573-4f98-98ae-3d7c5c345016.jpg'),(40,'Ittoqqortoormiit, Sermersooq, Northeast Greenland National Park Gateway Settlement, Greenland','North America','One of the most remote settlements on Earth, gateway to the world\'s largest national park. Dog-sled across frozen fjords, spot musk oxen and seals, and watch the northern lights over the ice. Includes local guides and cold-weather gear.','2027-02-01','2027-02-12',4200.00,'18945285-1053-47c3-959a-8517250f7001.jpg'),(42,'israel jerusalem','Asia','Explore the ancient history, iconic landmarks, vibrant markets, and rich cultural heritage of Jerusalem.','2026-10-10','2026-10-28',1200.00,'81f53a4c-cf31-4261-bb9d-5cdd36a151e9.jpg'),(43,'Oslo, Norway','Europe','Fjord cruises, the Viking Ship Museum and the Vigeland sculpture park','2027-07-01','2027-07-09',2400.00,'dbe5c686-f21f-4bfb-ae71-d62639650d13.jpg'),(45,'cyprus nicosia','Europe','flight to marry your partner cheaply','2026-12-01','2026-12-05',0.00,'ca60e7a2-3518-4086-9165-4060405179d6.jpg'),(51,'Edinburgh, Scotland','Europe','Edinburgh, Scotland familiy trip with buses','2026-12-06','2026-12-26',2101.00,'2a9cd5f9-779b-4b5a-a480-79038d6c2ca8.jpg'),(53,'israel Yahud','Asia','Welcome to Yahud ya zaleme','2027-05-05','2027-06-05',1750.00,'c493b783-71d7-47ed-bf19-29ec8abb1203.jpg');
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

-- Dump completed on 2026-09-25 12:50:52
