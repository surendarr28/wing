CREATE TABLE `tbl_phone` (
  `iPhoneId` int(11) NOT NULL AUTO_INCREMENT,
  `vcPhonenumber` varchar(100) NOT NULL,
  `iPhoneType` int(11) DEFAULT NULL,
  `bStatus` tinyint(4) DEFAULT NULL,
  `iCreatedBy` int(11) DEFAULT NULL,
  `IUpdatedBy` int(11) DEFAULT NULL,
  `dtCreatedAt` timestamp NULL DEFAULT NULL,
  `dtUpdatedAt` timestamp NULL DEFAULT NULL,
  `iUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`iPhoneId`),
  UNIQUE KEY `vcPhonenumber_UNIQUE` (`vcPhonenumber`),
  KEY `iPhoneUserId_idx` (`iUserId`),
  CONSTRAINT `iPhoneUserId` FOREIGN KEY (`iUserId`) REFERENCES `tbl_User` (`iUserId`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
