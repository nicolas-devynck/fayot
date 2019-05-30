/* /!\ attention /!\ si vous changer `fayot` ne pas oublier de le changer aussi dans var.php */
CREATE DATABASE `fayot` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE `fayot` (
  `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date_viste` varchar(255) CHARACTER SET utf8 NOT NULL,
  `page` varchar(255) CHARACTER SET utf8 NOT NULL,
  `ip` varchar(255) CHARACTER SET utf8 NOT NULL,
  `host` varchar(255) CHARACTER SET utf8 NOT NULL,
  `navigateur` varchar(255) CHARACTER SET utf8 NOT NULL,
  `referer` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
