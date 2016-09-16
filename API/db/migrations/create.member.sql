CREATE TABLE `tbl_member` (
  `iMemberId` int(11) NOT NULL AUTO_INCREMENT,
  `iContestId` int(11) DEFAULT NULL,
  `iUnitId` int(11) DEFAULT NULL,
  `iCreatedBy` int(11) DEFAULT NULL,
  `iUpdatedBy` int(11) DEFAULT NULL,
  `dtCreatedAt` timestamp NULL DEFAULT NULL,
  `dtUpdatedAt` timestamp NULL DEFAULT NULL,
  `bStatus` bit(1) DEFAULT NULL,
  PRIMARY KEY (`iMemberId`),
  KEY `iTeamContestId_idx` (`iContestId`),
  CONSTRAINT `iTeamContestId` FOREIGN KEY (`iContestId`) REFERENCES `tbl_contest` (`iContestId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
