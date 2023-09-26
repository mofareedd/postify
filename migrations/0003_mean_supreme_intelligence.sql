CREATE TABLE `comments` (
	`id` varchar(128),
	`content` text NOT NULL,
	`postId` varchar(128) NOT NULL,
	`authorId` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` varchar(128),
	`content` text NOT NULL,
	`images` json DEFAULT ('null'),
	`authorId` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now())
);
--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `bio` varchar(255) DEFAULT '';