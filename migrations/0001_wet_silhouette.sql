DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `account` DROP FOREIGN KEY `account_userId_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `session` DROP FOREIGN KEY `session_userId_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `refresh_token` text;--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `access_token` text;--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `id_token` text;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `account` (`userId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `session` (`userId`);