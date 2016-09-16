CREATE TABLE `tbl_game` (
  `iGameId` int(11) NOT NULL AUTO_INCREMENT,
  `vcGameName` varchar(100) DEFAULT NULL,
  `bStatus` tinyint(4) DEFAULT NULL,
  `iCreatedBy` int(11) DEFAULT NULL,
  `iUpdatedBy` int(11) DEFAULT NULL,
  `dtCreatedAt` timestamp NULL DEFAULT NULL,
  `dtUpdatedAt` timestamp NULL DEFAULT NULL,
  `members` int(11) DEFAULT NULL,
  `iGameType` int(11) DEFAULT NULL,
  `vcGameImage` longtext,
  `vcDemo` text,
  PRIMARY KEY (`iGameId`),
  UNIQUE KEY `vcGameName_UNIQUE` (`vcGameName`),
  KEY `iGameType_idx` (`iGameType`),
  CONSTRAINT `iGameTypeId` FOREIGN KEY (`iGameType`) REFERENCES `tbl_game_type` (`iGameTypeId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
