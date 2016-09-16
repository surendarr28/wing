CREATE TABLE `tbl_score` (
  `iScore` int(11) NOT NULL,
  `vcScores` varchar(45) DEFAULT NULL,
  `bStatus` bit(1) DEFAULT NULL,
  `iCreatedBy` int(11) DEFAULT NULL,
  `iUpdatedBy` int(11) DEFAULT NULL,
  `dtCreatedAt` timestamp NULL DEFAULT NULL,
  `dtUpdatedAt` timestamp NULL DEFAULT NULL,
  `iMemberId` int(11) DEFAULT NULL,
  PRIMARY KEY (`iScore`),
  KEY `iScoreTeamId_idx` (`iMemberId`),
  CONSTRAINT `iScoreTeamId` FOREIGN KEY (`iMemberId`) REFERENCES `tbl_member` (`iMemberId`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
