SET FOREIGN_KEY_CHECKS=0; 
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `document`;
DROP TABLE IF EXISTS `connection`;
SET FOREIGN_KEY_CHECKS=1;


CREATE TABLE `connection` 
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`created` timestamp DEFAULT CURRENT_TIMESTAMP,
	`modified` timestamp,
	`deleted` timestamp,
	`name` text,
	`user_id` int,
    PRIMARY KEY (`id`)
    
);

CREATE TABLE `document` 
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`modified` timestamp,
	`deleted` timestamp,
	`connection_id` int NOT NULL,
	`name` text NOT NULL,
	`path` text NOT NULL,	
	`synced` timestamp,	
    PRIMARY KEY (`id`)
);

CREATE TABLE `user` 
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`created` timestamp DEFAULT CURRENT_TIMESTAMP,
	`modified` timestamp,
	`deleted` timestamp,
	`name` text,
	`email` text,
	`password` text,	
    PRIMARY KEY (`id`)
);

ALTER TABLE `connection` ADD CONSTRAINT `user_connection` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `document` ADD CONSTRAINT `document_connection` FOREIGN KEY (`connection_id`) REFERENCES `connection` (`id`);
