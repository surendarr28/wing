CREATE TABLE `tbl_ground` (
  `iGroundId` int(11) NOT NULL AUTO_INCREMENT,
  `vcGroundName` varchar(100) DEFAULT NULL,
  `iGameId` int(11) DEFAULT NULL,
  `iCreatedBy` int(11) DEFAULT NULL,
  `iUpdatedBy` int(11) DEFAULT NULL,
  `dtCreatedAt` timestamp NULL DEFAULT NULL,
  `dtUpdatedAt` timestamp NULL DEFAULT NULL,
  `bStatus` bit(1) DEFAULT NULL,
  `isOnline` bit(1) DEFAULT NULL,
  `members` int(11) DEFAULT NULL,
  PRIMARY KEY (`iGroundId`),
  KEY `iGameId_idx` (`iGameId`),
  CONSTRAINT `iGameId` FOREIGN KEY (`iGameId`) REFERENCES `tbl_game` (`iGameId`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
