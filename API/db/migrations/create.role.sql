CREATE TABLE `tbl_role` (
  `iRoleId` int(11) NOT NULL AUTO_INCREMENT,
  `iUserId` int(11) DEFAULT NULL,
  `bStatus` tinyint(4) DEFAULT NULL,
  `iCreatedBy` int(11) DEFAULT NULL,
  `iUpdatedBy` int(11) DEFAULT NULL,
  `dtCreatedAt` timestamp NULL DEFAULT NULL,
  `dtUpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`iRoleId`),
  KEY `iRUserId_idx` (`iUserId`),
  CONSTRAINT `iRUserId` FOREIGN KEY (`iUserId`) REFERENCES `tbl_User` (`iUserId`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
