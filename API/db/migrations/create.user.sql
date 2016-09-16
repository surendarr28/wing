CREATE TABLE `tbl_User` (
  `iUserId` int(11) NOT NULL AUTO_INCREMENT,
  `vcFirstname` varchar(100) NOT NULL,
  `vcMiddlename` varchar(45) DEFAULT NULL,
  `vcLastname` varchar(45) DEFAULT NULL,
  `dtDOB` date DEFAULT NULL,
  `vcAvathar` longtext,
  `iCreatedBy` int(11) DEFAULT NULL,
  `iUpdatedBy` int(11) DEFAULT NULL,
  `dtCreatedAt` timestamp NULL DEFAULT NULL,
  `dtUpdatedAt` timestamp NULL DEFAULT NULL,
  `bStatus` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`iUserId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
