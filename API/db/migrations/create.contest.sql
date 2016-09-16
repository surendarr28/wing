CREATE TABLE `tbl_contest` (
  `iContestId` int(11) NOT NULL AUTO_INCREMENT,
  `iGroundId` int(11) DEFAULT NULL,
  `iGameId` int(11) DEFAULT NULL,
  `iCreatedBy` int(11) DEFAULT NULL,
  `iUpdatedBy` int(11) DEFAULT NULL,
  `dtCreatedAt` timestamp NULL DEFAULT NULL,
  `dtUpdatedAt` timestamp NULL DEFAULT NULL,
  `bStatus` bit(1) DEFAULT NULL,
  PRIMARY KEY (`iContestId`),
  KEY `iContextGameId_idx` (`iGameId`),
  KEY `iContextGroundId` (`iGroundId`),
  CONSTRAINT `iContextGameId` FOREIGN KEY (`iGameId`) REFERENCES `tbl_game` (`iGameId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `iContextGroundId` FOREIGN KEY (`iGroundId`) REFERENCES `tbl_ground` (`iGroundId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
