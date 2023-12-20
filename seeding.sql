-- Seeding users
-- Admin: email: admin@gmail.com, password: admin
INSERT INTO `users` (username, email, password, gender, address, phone_number, avatar, is_admin) VALUES ('admin', 'admin@gmail.com', '$2b$10$mjeFk.6HXQT04vNpokBhceLDhKwvP0Hi/39GC0DH9Oup5fMCwx.z6', 'Unknown', '707 Oak St, Townburg', '123-987-6543', 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png', true);
INSERT INTO `users` (username, email, password, gender, address, phone_number, avatar, is_admin) VALUES ('phan', 'phan@gmail.com', '$2b$10$mjeFk.6HXQT04vNpokBhceLDhKwvP0Hi/39GC0DH9Oup5fMCwx.z6', 'Unknown', '707 Oak St, Townburg', '123-987-6543', 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png', false);
INSERT INTO `users` (username, email, password, gender, address, phone_number, avatar, is_admin) VALUES ('thanh', 'thanh@gmail.com', '$2b$10$mjeFk.6HXQT04vNpokBhceLDhKwvP0Hi/39GC0DH9Oup5fMCwx.z6', 'Unknown', '707 Oak St, Townburg', '123-987-6543', 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png', false);
INSERT INTO `users` (username, email, password, gender, address, phone_number, avatar, is_admin) VALUES ('duong', 'duong@gmail.com', '$2b$10$mjeFk.6HXQT04vNpokBhceLDhKwvP0Hi/39GC0DH9Oup5fMCwx.z6', 'Unknown', '707 Oak St, Townburg', '123-987-6543', 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png', false);

-- Sedding menu
insert into `menus`  (menu_name) values ('Thực đơn chính');
insert into `menus`  (menu_name) values ('Tráng miệng');
insert into `menus`  (menu_name) values ('Thức uống');

-- Seeding dish 
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Spaghetti Bolognese', 12.99, 'Classic Italian dish with meat sauce', 50, 1, 1);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Chicken Alfredo', 15.99, 'Creamy Alfredo sauce with grilled chicken', 30, 2, 1);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Margherita Pizza', 10.99, 'Traditional pizza with tomato, mozzarella, and basil', 40, 3, 1);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Chocolate Cake', 8.99, 'Rich chocolate cake with layers of frosting', 20, 4, 2);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Cheesecake', 9.99, 'Creamy cheesecake with a graham cracker crust', 25, 5, 2);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Fruit Tart', 7.99, 'Colorful tart with assorted fresh fruits', 15, 6, 2);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Iced Coffee', 4.99, 'Chilled coffee with ice cubes', 35, 7, 3);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Mango Smoothie', 6.99, 'Refreshing smoothie with mango flavor', 28, 8, 3);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Lemonade', 3.99, 'Classic lemonade with a twist', 42, 9, 3);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Vegetarian Pizza', 11.99, 'Pizza with assorted vegetables', 38, 10, 1);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Tiramisu', 7.49, 'Italian dessert with coffee-soaked ladyfingers', 18, 11, 2);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Green Tea', 2.99, 'Hot or iced green tea', 50, 12, 3);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Grilled Salmon', 18.99, 'Salmon fillet with lemon and herbs', 22, 13, 1);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Caesar Salad', 8.49, 'Romaine lettuce, croutons, and Caesar dressing', 30, 14, 1);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Shrimp Scampi', 17.99, 'Shrimp in a garlic and butter sauce', 25, 15, 1);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Blueberry Muffin', 4.99, 'Moist muffin with blueberries', 18, 16, 2);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Tropical Sorbet', 6.49, 'Fruity sorbet with tropical flavors', 12, 17, 2);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Peach Cobbler', 9.99, 'Warm peach cobbler with a crumbly topping', 15, 18, 2);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Iced Tea', 2.49, 'Traditional iced tea with lemon', 40, 19, 3);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Cappuccino', 5.99, 'Espresso with steamed milk foam', 28, 20, 3);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Berry Smoothie', 7.99, 'Smoothie with assorted berries', 23, 21, 3);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Vegetarian Pasta', 14.99, 'Pasta with a variety of fresh vegetables', 33, 22, 1);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Molten Chocolate Lava Cake', 10.99, 'Decadent chocolate cake with a gooey center', 20, 23, 2);
INSERT INTO `dishes` (dish_name, dish_price, dish_description, total_order, discount_id, menu_id) VALUES ('Orange Juice', 3.49, 'Freshly squeezed orange juice', 35, 24, 3);

-- seeding image
INSERT INTO `images` (image_link, dish_id, image_filename) VALUES ('https://random.imagecdn.app/500/500', 1, 'image-name.jpg');
INSERT INTO `images` (image_link, dish_id, image_filename) VALUES ('https://random.imagecdn.app/500/500', 2, 'image-name.jpg');
INSERT INTO `images` (image_link, dish_id, image_filename) VALUES ('https://random.imagecdn.app/500/500', 3, 'image-name.jpg');
INSERT INTO `images` (image_link, dish_id, image_filename) VALUES ('https://random.imagecdn.app/500/500', 4, 'image-name.jpg');
INSERT INTO `images` (image_link, dish_id, image_filename) VALUES ('https://random.imagecdn.app/500/500', 5, 'image-name.jpg');
INSERT INTO `images` (image_link, dish_id, image_filename) VALUES ('https://random.imagecdn.app/500/500', 6, 'image-name.jpg');
INSERT INTO `images` (image_link, dish_id, image_filename) VALUES ('https://random.imagecdn.app/500/500', 7, 'image-name.jpg');
INSERT INTO `images` (image_link, dish_id, image_filename) VALUES ('https://random.imagecdn.app/500/500', 8, 'image-name.jpg');
INSERT INTO `images` (image_link, dish_id, image_filename) VALUES ('https://random.imagecdn.app/500/500', 9, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 10, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 11, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 12, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 13, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 14, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 15, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 16, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 17, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 18, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 19, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 20, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 21, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 22, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 23, 'image-name.jpg');
insert into `images` (image_link, dish_id, image_filename) values ('https://random.imagecdn.app/500/500', 24, 'image-name.jpg');


-- Seeding table
-- Inserting data into the `table` table
INSERT INTO `tables` (table_position, table_status) VALUES ('A1', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('A2', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('B1', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('B2', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('C1', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('C2', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('D1', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('D2', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('E1', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('E2', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('F1', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('F2', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('G1', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('G2', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('H1', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('H2', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('I1', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('I2', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('J1', 'Available');
INSERT INTO `tables` (table_position, table_status) VALUES ('J2', 'Available');

-- seeding discount
INSERT INTO `discounts` (discount_code, discount_description, discount_percent, start_day, end_day) VALUES ('DISCOUNT10', '10% off your order', 10, '2021-01-01', '2021-12-31');
INSERT INTO `discounts` (discount_code, discount_description, discount_percent, start_day, end_day) VALUES ('DISCOUNT20', '20% off your order', 20, '2021-01-01', '2021-12-31');
INSERT INTO `discounts` (discount_code, discount_description, discount_percent, start_day, end_day) VALUES ('DISCOUNT30', '30% off your order', 30, '2021-01-01', '2021-12-31');
INSERT INTO `discounts` (discount_code, discount_description, discount_percent, start_day, end_day) VALUES ('DISCOUNT40', '40% off your order', 40, '2021-01-01', '2021-12-31');