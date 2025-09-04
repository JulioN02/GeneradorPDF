-- MySQL dump 10.13  Distrib 8.4.5, for Linux (x86_64)
--
-- Host: localhost    Database: facturas-db
-- ------------------------------------------------------
-- Server version	8.4.5

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
-- Table structure for table `facturaProductos`
--

DROP TABLE IF EXISTS `facturaProductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturaProductos` (
  `idproducto` int NOT NULL AUTO_INCREMENT,
  `factura_id` int NOT NULL,
  `producto` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `cantidad` int NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `descuento` decimal(10,2) DEFAULT '0.00',
  `observacion` text COLLATE utf8mb4_spanish2_ci,
  PRIMARY KEY (`idproducto`),
  KEY `factura_id_idx` (`factura_id`),
  CONSTRAINT `facturas_productos_id` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`idfacturas`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturaProductos`
--

LOCK TABLES `facturaProductos` WRITE;
/*!40000 ALTER TABLE `facturaProductos` DISABLE KEYS */;
INSERT INTO `facturaProductos` VALUES (13,14,'Cable USB Type C',2,10000.00,10.00,'Na'),(14,15,'Aire',1,1200000.00,10.00,''),(15,16,'Mouse',4,23000.00,10.00,'Na'),(16,17,'Teclado',5,30000.00,15.00,'Na');
/*!40000 ALTER TABLE `facturaProductos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturas` (
  `idfacturas` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) COLLATE utf32_spanish2_ci NOT NULL,
  `apellidos` varchar(100) COLLATE utf32_spanish2_ci NOT NULL,
  `celular` varchar(20) COLLATE utf32_spanish2_ci DEFAULT NULL,
  `correo` varchar(100) COLLATE utf32_spanish2_ci DEFAULT NULL,
  `total_subtotal` decimal(10,2) NOT NULL,
  `total_descuento` decimal(10,2) NOT NULL,
  `total_final` decimal(10,2) NOT NULL,
  `observacion` text COLLATE utf32_spanish2_ci,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idfacturas`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` VALUES (14,'Julio','Manuel','100000000000','J@nieto.com',20000.00,18000.00,21420.00,'Efectivo','2025-09-04 01:01:25'),(15,'Julian','Manuel','30000000','julian@gmail.com',1200000.00,1080000.00,1285200.00,'Tarjeta Credito','2025-09-04 01:10:06'),(16,'Manuel','Villeras','100000000000','jnieto@gmail.com',92000.00,0.00,8280000.00,'Transferencia','2025-09-04 01:33:38'),(17,'Manuel','Villeras','100000000000','jnieto@gmail.com',150000.00,0.00,12750000.00,'Transferencia','2025-09-04 01:37:16'),(18,'Manuel','Nieto','3216854062','j@niero.com',0.00,11111.10,99999.90,'Efectivo','2025-09-04 02:16:08'),(19,'Jael','Villeras','32132132131','J@nieto.com',0.00,0.00,239997.60,'','2025-09-04 02:24:25'),(20,'Julio','Villeras','3000000000','fernandovilla@gmail.com',0.00,12000.00,108000.00,'','2025-09-04 02:29:44');
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-03 21:47:53
