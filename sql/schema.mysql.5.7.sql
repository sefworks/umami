SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `account`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
--  Table structure for `event`
-- ----------------------------
DROP TABLE IF EXISTS `event`;
CREATE TABLE `event` (
  `event_id` int unsigned NOT NULL AUTO_INCREMENT,
  `website_id` int unsigned NOT NULL,
  `session_id` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(500) NOT NULL,
  `event_type` varchar(50) NOT NULL,
  `event_value` varchar(50) NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `event_created_at_idx` (`created_at`),
  KEY `event_website_id_idx` (`website_id`),
  KEY `event_session_id_idx` (`session_id`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`website_id`) REFERENCES `website` (`website_id`) ON DELETE CASCADE,
  CONSTRAINT `event_ibfk_2` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
--  Table structure for `pageview`
-- ----------------------------
DROP TABLE IF EXISTS `pageview`;
CREATE TABLE `pageview` (
  `view_id` int unsigned NOT NULL AUTO_INCREMENT,
  `website_id` int unsigned NOT NULL,
  `session_id` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(500) NOT NULL,
  `referrer` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`view_id`),
  KEY `pageview_created_at_idx` (`created_at`),
  KEY `pageview_website_id_idx` (`website_id`),
  KEY `pageview_session_id_idx` (`session_id`),
  KEY `pageview_website_id_created_at_idx` (`website_id`,`created_at`),
  KEY `pageview_website_id_session_id_created_at_idx` (`website_id`,`session_id`,`created_at`),
  CONSTRAINT `pageview_ibfk_1` FOREIGN KEY (`website_id`) REFERENCES `website` (`website_id`) ON DELETE CASCADE,
  CONSTRAINT `pageview_ibfk_2` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
--  Table structure for `session`
-- ----------------------------
DROP TABLE IF EXISTS `session`;
CREATE TABLE `session` (
  `session_id` int unsigned NOT NULL AUTO_INCREMENT,
  `session_uuid` varchar(36) NOT NULL,
  `website_id` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `hostname` varchar(100) DEFAULT NULL,
  `browser` varchar(20) DEFAULT NULL,
  `os` varchar(20) DEFAULT NULL,
  `device` varchar(20) DEFAULT NULL,
  `screen` varchar(11) DEFAULT NULL,
  `language` varchar(35) DEFAULT NULL,
  `country` char(2) DEFAULT NULL,
  `region` VARCHAR(35),
  `city` varchar(35) DEFAULT NULL,
  `ip` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  UNIQUE KEY `session_uuid` (`session_uuid`),
  UNIQUE KEY `session_pk` (`country`),
  KEY `session_created_at_idx` (`created_at`),
  KEY `session_website_id_idx` (`website_id`),
  CONSTRAINT `session_ibfk_1` FOREIGN KEY (`website_id`) REFERENCES `website` (`website_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
--  Table structure for `website`
-- ----------------------------
DROP TABLE IF EXISTS `website`;
CREATE TABLE `website` (
  `website_id` int unsigned NOT NULL AUTO_INCREMENT,
  `website_uuid` varchar(36) NOT NULL,
  `user_id` int unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `domain` varchar(500) DEFAULT NULL,
  `share_id` varchar(64) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`website_id`),
  UNIQUE KEY `website_uuid` (`website_uuid`),
  UNIQUE KEY `share_id` (`share_id`),
  KEY `website_user_id_idx` (`user_id`),
  CONSTRAINT `website_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `account` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

insert into account (username, password, is_admin) values ('admin', '$2b$10$BUli0c.muyCW1ErNJc3jL.vFRFtFJWrT8/GcR4A.sUdCznaXiqFXa', true);


SET FOREIGN_KEY_CHECKS = 1;
