CREATE TABLE `tbl_address` (
  `iAddressId` int(11) NOT NULL AUTO_INCREMENT,
  `vcAddress` varchar(200) DEFAULT NULL,
  `vcPostcode` varchar(15) DEFAULT NULL,
  `vcState` varchar(45) DEFAULT NULL,
  `iCreatedBy` int(11) DEFAULT NULL,
  `iUpdatedBy` int(11) DEFAULT NULL,
  `dtCreatedAt` timestamp NULL DEFAULT NULL,
  `dtUpdatedAt` timestamp NULL DEFAULT NULL,
  `bStatus` bit(1) DEFAULT NULL,
  `iUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`iAddressId`),
  KEY `iAddressUserId_idx` (`iUserId`),
  CONSTRAINT `iAddressUserId` FOREIGN KEY (`iUserId`) REFERENCES `tbl_User` (`iUserId`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
