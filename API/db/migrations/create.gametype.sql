CREATE TABLE `tbl_game_type` (
  `iGameTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `vcGameType` varchar(100) DEFAULT NULL,
  `iCreatedBy` int(11) DEFAULT NULL,
  `iUpdatedBy` int(11) DEFAULT NULL,
  `dtCreatedAt` timestamp NULL DEFAULT NULL,
  `dtUpdatedAt` timestamp NULL DEFAULT NULL,
  `bStatus` bit(1) DEFAULT NULL,
  PRIMARY KEY (`iGameTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
