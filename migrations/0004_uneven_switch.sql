ALTER TABLE `comments` MODIFY COLUMN `id` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `id` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `comments` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `posts` ADD PRIMARY KEY(`id`);