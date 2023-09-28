CREATE TABLE `like` (
	`id` varchar(128) NOT NULL,
	`postId` varchar(128) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `like_id` PRIMARY KEY(`id`)
);
