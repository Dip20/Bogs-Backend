-- CreateTable
CREATE TABLE `Blog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `thumbnail` TEXT NULL,
    `full_img` TEXT NULL,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
