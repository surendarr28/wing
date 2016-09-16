CREATE TABLE `tbl_login` (
  `iLoginId` int(11) NOT NULL AUTO_INCREMENT,
  `vcUsername` varchar(100) DEFAULT NULL,
  `vcPassword` varchar(500) DEFAULT NULL,
  `bStatus` tinyint(4) DEFAULT NULL,
  `iCreatedBy` int(11) DEFAULT NULL,
  `iUpdatedBy` int(11) DEFAULT NULL,
  `dtCreatedAt` timestamp NULL DEFAULT NULL,
  `dtUpdatedAt` timestamp NULL DEFAULT NULL,
  `iUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`iLoginId`),
  UNIQUE KEY `vcUsername_UNIQUE` (`vcUsername`),
  KEY `iLoginUserId_idx` (`iUserId`),
  CONSTRAINT `iLoginUserId` FOREIGN KEY (`iUserId`) REFERENCES `tbl_User` (`iUserId`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
