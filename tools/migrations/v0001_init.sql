SET FOREIGN_KEY_CHECKS=0; 
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `file`;
DROP TABLE IF EXISTS `node`;
SET FOREIGN_KEY_CHECKS=1;


CREATE TABLE `node` 
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`created` timestamp DEFAULT CURRENT_TIMESTAMP,
	`modified` timestamp,
	`deleted` timestamp,
	`name` text,
	`user_id` int,
    PRIMARY KEY (`id`)
    
);

CREATE TABLE `file` 
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`modified` timestamp,
	`deleted` timestamp,
	`node_id` int NOT NULL,
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

ALTER TABLE `node` ADD CONSTRAINT `user_node` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `file` ADD CONSTRAINT `file_node` FOREIGN KEY (`node_id`) REFERENCES `node` (`id`);
