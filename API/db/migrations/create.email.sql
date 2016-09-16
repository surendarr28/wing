CREATE TABLE `tbl_email` (
  `iEmailId` int(10) NOT NULL AUTO_INCREMENT,
  `vcEmail` varchar(200) NOT NULL,
  `iEmailType` int(11) DEFAULT NULL,
  `bStatus` tinyint(4) DEFAULT NULL,
  `iCreatedBy` int(11) DEFAULT NULL,
  `iUpdatedBy` int(11) DEFAULT NULL,
  `dtCreatedAt` timestamp NULL DEFAULT NULL,
  `dtUpdateAt` timestamp NULL DEFAULT NULL,
  `iUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`iEmailId`),
  UNIQUE KEY `vcEmail_UNIQUE` (`vcEmail`),
  KEY `iUserId_idx` (`iUserId`),
  CONSTRAINT `iEmailUserId` FOREIGN KEY (`iUserId`) REFERENCES `tbl_User` (`iUserId`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
