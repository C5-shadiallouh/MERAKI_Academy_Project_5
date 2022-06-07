DROP DATABASE project5;
CREATE DATABASE project5;
USE project5;
CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL,
role VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);
CREATE TABLE permissions (
id INT AUTO_INCREMENT NOT NULL,
permission VARCHAR(255) NOT NULL,
is_deleted TINYINT DEFAULT 0,

PRIMARY KEY (id)
);
CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255)NOT NULL,
    lastName VARCHAR(255)NOT NULL,
    city VARCHAR(255)NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);
CREATE TABLE role_permission (
   id INT AUTO_INCREMENT NOT NULL,
   role_id INT NOT NULL,
   permissions_id INT NOT NULL,
   FOREIGN KEY (role_id) REFERENCES roles(id),
   FOREIGN KEY (permissions_id) REFERENCES permissions(id),
   is_deleted TINYINT DEFAULT 0,
   PRIMARY KEY (id)
);
CREATE TABLE category (
    id INT AUTO_INCREMENT NOT NULL,
    category_name VARCHAR(255) NOT NULL,
        is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);
CREATE TABLE meals(
    id INT AUTO_INCREMENT NOT NULL,
    meal_name VARCHAR(255) NOT NULL,
    meal_price FLOAT NOT NULL,
    image VARCHAR(1000) NOT NULL,
    category_id INT NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES category(id),
    PRIMARY KEY (id)
);
CREATE TABLE orders (
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    is_deleted TINYINT DEFAULT 0,

    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
);
CREATE TABLE cart (
    id INT AUTO_INCREMENT NOT NULL,
    meal_id INT NOT NULL,
    user_id INT NOT NULL,
    order_id INT NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    quantity INT DEFAULT 1,
    FOREIGN KEY (meal_id) REFERENCES meals(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    PRIMARY KEY (id)
);
CREATE TABLE comment (
    id INT AUTO_INCREMENT NOT NULL,
    comment VARCHAR(2000) NOT NULL,
    commenter INT NOT NULL ,
    meal_id INT  NOT NULL,
    FOREIGN KEY (commenter) REFERENCES users(id),
    FOREIGN KEY (meal_id) REFERENCES meals(id),
    PRIMARY KEY (id)

);
CREATE TABLE rating (
    id INT AUTO_INCREMENT NOT NULL,
    rating INT NOT NULL,
    rater INT NOT NULL ,
    meal_id INT  NOT NULL,
    FOREIGN KEY (rater) REFERENCES users(id),
    FOREIGN KEY (meal_id) REFERENCES meals(id),
    PRIMARY KEY (id)

);
INSERT INTO roles VALUES
(1,"ADMIN"),
(2,"USER");
INSERT INTO category VALUES
('1',N'حمص وفول','0'),
('2',N'فتة','0'),
('3',N'المعجنات','0'),
('4',N'الخبز','0'),
('5',N'المقبلات و السلطات','0'),
('6',N'القلايات','0'),
('7',N'السندويشات','0'),
('8',N'المشروبات','0');
INSERT INTO meals VALUES
(1,N'حمص',1,'https://scontent-frt3-1.xx.fbcdn.net/v/t39.30808-6/241696149_1265457800551128_2369923395521963117_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeGu_3FhmTDE7FhsWlstMC1TmC4_DwZMuEyYLj8PBky4TErGm6wG45kV4-OzN8IVDnNd3LwH6Tw1641FbVNSiwVT&_nc_ohc=e4OgcHqCeWcAX9l46dw&_nc_ht=scontent-frt3-1.xx&oh=00_AT9oRQS2TqosRXod6wWG1kZm9i8tkfgg_wRymJNSKVQ5XA&oe=629D65AC',1,0),
(2,N'فول',1,'https://www.taabkh.com/files/styles/recipe/public/recipe/2020/07/Ful-Medames-recipe-egyptian.jpg',1,0),
(3,N'مسبحة',1,'https://scontent-frt3-1.xx.fbcdn.net/v/t39.30808-6/214550495_1227951964301712_6501191538687959322_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHa8v21puI4P4t-532zMZLuuZkPpS8WOUK5mQ-lLxY5Qn6eYIXYnuMNA1rZlShEY4vCnhOYiKdNSx_Qc6EUSyvx&_nc_ohc=loiz1NLb3OYAX8iPXK1&_nc_ht=scontent-frt3-1.xx&oh=00_AT_jLwsE5z5ziSTPFVe1eLr0kU2MERt8FKS07W7ww_pEBQ&oe=629E991A',1,0),
(4,N'قدسية',1,'https://img-global.cpcdn.com/recipes/0c6c80fe344580ef/1200x630cq70/photo.jpg',1,0),
(5,N'حمص بيروتي',1,'https://scontent-frt3-1.xx.fbcdn.net/v/t39.30808-6/216310166_1227952787634963_4113470872405437545_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHwIR38qclupafo6okdCKAEdHvoc6wXu4h0e-hzrBe7iOBr38gXXlRjRQs_qlqiwOhben5KuSFDTJeFwNF8sNq6&_nc_ohc=vDyv5T6TY5IAX913pf5&tn=WLNv9DRtgbOyG3Tx&_nc_ht=scontent-frt3-1.xx&oh=00_AT9zviJP1M2ddmZHmVdhjnIUulLQKKtvQAC1wWp7UevBFA&oe=629E3D05',1,0),
(6,N'مسبحة شامية',1,'https://images.deliveryhero.io/image/talabat/Menuitems/%D9%85%D8%B3%D8%A8%D8%AD%D8%A9_%D8%B4%D8%A7%D9%85%D9%8A%D8%A9_637238510580756647.jpg',1,0),
(7,N'فول مصري',1,'https://scontent-frx5-1.xx.fbcdn.net/v/t1.6435-9/184606034_1187230658373843_8132120677651551263_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeFPQJZCzcu0OaHCCu4SDXmIro-zgM1OR-6uj7OAzU5H7trAxAIRT7xv0xvqjYnvuig5CBby0qEOdtekYa4j_oap&_nc_ohc=-8tRJH_oHGsAX_4kHw3&tn=WLNv9DRtgbOyG3Tx&_nc_ht=scontent-frx5-1.xx&oh=00_AT8Ri682Dx9iFuwI2xqjS8aGXbJK9NxobD7f0uefSUpfJg&oe=62BCFA36',1,0),
(8,N'فول فلسطيني',1,'https://modo3.com/thumbs/fit630x300/158909/1496228798/%D8%B9%D9%85%D9%84_%D9%81%D9%88%D9%84_%D8%A7%D9%84%D9%85%D8%B7%D8%A7%D8%B9%D9%85.jpg',1,0),
(9,N'متبل',1,'https://cdn.alweb.com/thumbs/atbaqalkhodar/article/fit727x484/%D9%83%D9%8A%D9%81-%D8%AA%D8%AD%D8%B6%D8%B1%D9%8A%D9%86-%D9%85%D8%AA%D8%A8%D9%84-%D8%A7%D9%84%D8%A8%D8%A7%D8%B0%D9%86%D8%AC%D8%A7%D9%86.jpg',1,0),
(10,N'لبنة',1,'https://scontent-frx5-1.xx.fbcdn.net/v/t39.30808-6/229292954_1240215393075369_5059066676126576335_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeH2TePN22eqIijNGcfywTCTPPAP_UW098g88A_9RbT3yKbCzK6blcBDAVZdKsLw7Nepi_QN54DtV01T-1-i9eu6&_nc_ohc=nGoOo0FIL-AAX-NuncI&_nc_ht=scontent-frx5-1.xx&oh=00_AT8yBM3ffbhzp3Xg6dHK29CLmpHP_f_yrbLApJiIA5cSmQ&oe=629D444B',1,0),
(11,N'بيض مسلوق',0.85,'https://modo3.com/thumbs/fit630x300/125494/1479649294/%D9%83%D9%8A%D9%81_%D8%AA%D8%B9%D9%85%D9%84_%D8%A8%D9%8A%D8%B6%D8%A7%D9%8B_%D9%85%D8%B3%D9%84%D9%88%D9%82%D8%A7%D9%8B.jpg',1,0),
(12,N'بطاطا',1.25,'https://kitchen.sayidaty.net/uploads/small/de/de298921167dc40210659f6aadf48ce8_w750_h750.jpg',1,0),
(13,N'فلافل (4 حبات)',0.1,'https://scontent-frt3-1.xx.fbcdn.net/v/t39.30808-6/260886890_1316123738817867_4983817465362986305_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeH7hXtOgVj0KLTJyqlR1aUf4sbBD4EZezTixsEPgRl7NEopEAK-nspa_rBSlAuoq0R6ptOeIyOR6s-4PANl0XL5&_nc_ohc=2Nq_UWUehEgAX-FLKKn&_nc_oc=AQlFiG2x4eKQv2ov1FvfaMdA6QjstmMZFRGs6ufde-B4E2BxaCnHyFmieTvQARol_Bg&_nc_ht=scontent-frt3-1.xx&oh=00_AT-ihDcbWFOFvZc3bNuUe7FYJ7DZ82eWs_22RiXSrWA1rQ&oe=629D9DA3',1,0),
(14,N'فتة بزيت الزيتون والمكسرات',2,'https://scontent-frt3-2.xx.fbcdn.net/v/t1.6435-9/117963620_1007520339678210_2951286146336578333_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGbtJ7vGwrsaBFHh96z-WJ71lYDUFFkh8HWVgNQUWSHwRoR_Vy7tsdKAE-Q92YBWBV5nYN4VAb3Qj5XjTv20Lqx&_nc_ohc=u4W_TvUNxSwAX9xyHjq&_nc_ht=scontent-frt3-2.xx&oh=00_AT8lT0I8Xj92dAUNCgzU6fNglR0k5Qcp1T9ecyJRJ9giKg&oe=62C060DB',2,0),
(15,N'فتة بالسمن البلدي و المكسرات',2,'https://scontent-frt3-2.xx.fbcdn.net/v/t1.6435-9/117963620_1007520339678210_2951286146336578333_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGbtJ7vGwrsaBFHh96z-WJ71lYDUFFkh8HWVgNQUWSHwRoR_Vy7tsdKAE-Q92YBWBV5nYN4VAb3Qj5XjTv20Lqx&_nc_ohc=u4W_TvUNxSwAX9xyHjq&_nc_ht=scontent-frt3-2.xx&oh=00_AT8lT0I8Xj92dAUNCgzU6fNglR0k5Qcp1T9ecyJRJ9giKg&oe=62C060DB',2,0),
(16,N'فتة بزيت الزيتون و اللحمة والمكسرات',2.75,'https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-9/178145871_1177083582721884_6079357429334095896_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeF3bEhTWFVf2006X-y_UmxOVzm5X18z3nlXOblfXzPeefZYU_Y9TLDRP9-5eh9UWFuNVn4NcYWpM8O2kagH0sjw&_nc_ohc=Wg3_kUYjUfsAX8Eu1jR&_nc_ht=scontent-frt3-1.xx&oh=00_AT8eaZrJK3VQRd_tpcZ47IXZc_3G5bCVBR1ts6vHDH3Mfw&oe=62BE9A50',2,0),
(17,N'فتة بالسمن البلدي و اللحمةو المكسرات',2.75,'https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-9/178145871_1177083582721884_6079357429334095896_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeF3bEhTWFVf2006X-y_UmxOVzm5X18z3nlXOblfXzPeefZYU_Y9TLDRP9-5eh9UWFuNVn4NcYWpM8O2kagH0sjw&_nc_ohc=Wg3_kUYjUfsAX8Eu1jR&_nc_ht=scontent-frt3-1.xx&oh=00_AT8eaZrJK3VQRd_tpcZ47IXZc_3G5bCVBR1ts6vHDH3Mfw&oe=62BE9A50',2,0),
(18,N'جبنة بيضاء',0.75,'https://img-global.cpcdn.com/recipes/71e6a8e00a022332/1200x630cq70/photo.jpg',3,0),
(19,N'جبنة صفراء',0.75,'https://i.ytimg.com/vi/FpgOxrUVmrA/maxresdefault.jpg',3,0),
(20,N'منقوشة لحمة',1,'https://www.atyabtabkha.com/tachyon/sites/2/2021/10/01444cdf05d0f5496026b89d4975ba2e05bf2c7b.jpg',3,0),
(21,N'محمرة سادة',0.75,'https://images.deliveryhero.io/image/talabat/Menuitems/Chilli_636917830111862061.jpg',3,0),
(22,N'محمرة مع قشقوان',1,'https://www.cozycabana.cafe/mwhdfgubng/bde6f96af7d4c4c9ff74c6cb6e778d16/o_1bq7sr3g8q3qsu9nq913dhf5a.jpg',3,0),
(23,N'لحمة مع موزوريلا',1.25,'https://shamlola.s3.amazonaws.com/Shamlola_Images/8/src/27786e03208ff739909d37883dde348c65e0b6b5.jpg',3,0),
(24,N'سبانخ',0.5,'https://cdn.teb21.com/thumb/1280/066/how-to-make-spinach-pastries.jpg',3,0),
(25,N'بيض سادة',0.75,'https://kitchen.sayidaty.net/uploads/small/f1/f1635ac7a314fcf18d6cebef06c479a2_w750_h500.jpg',3,0),
(26,N'بيض مع جبنة',1,'https://www.atyabtabkha.com/uploads/sites/2/2021/10/69fbfd80aced17de989a62cd34d32940ba05437a-scaled.jpg',3,0),
(27,N'بيتزا  خضار',2,'https://cdn.teb21.com/thumb/1280/105/pizza-ingredients-with-vegetables.jpg',3,0),
(28,N'بيتزا  سلامي',2,'https://www.foodtodayeg.com/Content/Upload/large/3202221192621644018108.jpg',3,0),
(29,N'بيتزا  اجبان',2,'https://assets.nn.ps/CACHE/images/uploads/weblog/2018/10/23/original/dddb61c736c3fc8f754093a1e45cc391.jpg',3,0),
(30,N'بيتزا  مارجاريتا',2,'https://shamlola.s3.amazonaws.com/Shamlola_Images/8/src/3452c8720013eddbccdb4d72c81bb2a3b31138e8.jpg',3,0),
(31,N'بيتزا فاهيتا  دجاج',2.5,'https://kitchen.sayidaty.net/uploads/small/10/1020e23b8229406854d0ab56b50ac432_w750_h500.jpg',3,0),
(32,N'بيتزا  باربيكيو',2.5,'https://www.atyabtabkha.com/tachyon/sites/2/2021/12/chicken-bbq-pizza.jpg',3,0),
(33,N'بيتزا مسخن  دجاج',2.5,'https://i.ytimg.com/vi/BmQ5Cy-DjP8/maxresdefault.jpg',3,0),
(34,N'بيتزا  نقانق',2,'https://img-global.cpcdn.com/recipes/6cedb1361d78522e/680x482cq70/%D8%A7%D9%84%D8%B5%D9%88%D8%B1%D8%A9-%D8%A7%D9%84%D8%B1%D8%A6%D9%8A%D8%B3%D9%8A%D8%A9-%D9%84%D9%88%D8%B5%D9%81%D8%A9%D8%A8%D9%8A%D8%AA%D8%B2%D8%A7-%D8%A8%D8%A7%D9%84%D9%86%D9%82%D8%A7%D9%86%D9%82.jpg',3,0),
(35,N'سلطة عادية',1,'https://shamlola.s3.amazonaws.com/Shamlola_Images/5/src/6aad258521393faaba0ce5d7c042c32090880d35.jpg',5,0),
(36,N'سلطة بالطحينية',1,'https://yummy.awicdn.com/site-images/sites/default/files/prod/recipe/1/f/456181/eabf60a2f96571d3bcc860ac080531c9c902afe7-070222060137.jpg?preset=v3.0_DYNxDYN&save-png=1&rnd=1519151RND220215',5,0),
(37,N'سلطة باستا',0.75,'https://www.justfood.tv/nawa3emPics/2.000%20(1)-184-1.jpg',5,0),
(38,N'كولسلو',0.75,'https://www.cookingclassy.com/wp-content/uploads/2018/06/coleslaw-recipe-2.jpg',5,0),
(39,N'سلطة جرجير',0.75,'https://www.aljamila.com/sites/default/files/styles/1100x732/public/fresh-green-salad-with-spinach-walnuts-goat-cheese-p3gauvd.jpg',5,0),
(40,N'سلطة ذرة',0.75,'https://i.ytimg.com/vi/pyZpJGbwho8/maxresdefault.jpg',5,0),
(41,N'تبولة',0.75,'https://i.ytimg.com/vi/QpY5RpcQzPo/maxresdefault.jpg',5,0),
(42,N'مقبلات موسمية',0.6,'https://scontent-frt3-2.xx.fbcdn.net/v/t39.30808-6/272793243_1357648641332043_4996048881054940955_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeGg0lUHKbA3O35Hnu3OYVZR-1TkZPehbtr7VORk96Fu2kRLhgCe9lLZNc5fyMvy67y-kntYMxBvMuyoIN4b0_wB&_nc_ohc=PWyL1GiTfV4AX_idOXr&_nc_ht=scontent-frt3-2.xx&oh=00_AT_s8P6Uj2LQgNcB1VsL4imWJ71pR49zsc2dgCgfjYSsXw&oe=629E3F63',5,0),
(43,N'حمص باللحمة',1.5,'http://www.smartgatefood.com/uploads/images/202010/img_1920x_5f97244d2edf55-22582607-52633354.jpg',6,0),
(44,N'قلاية بندورة',1,'https://scontent-frx5-2.xx.fbcdn.net/v/t1.6435-9/205248821_1213589815737927_1004316430438293214_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeH7gbhgo96FiEoV__h_K0szF4BGwY6RMXcXgEbBjpExdz_dZllwZkISsGS94SHbLKDvnIx8SO-mPPitqIBenU82&_nc_ohc=p5cWefrSRvAAX8DdxRP&tn=WLNv9DRtgbOyG3Tx&_nc_ht=scontent-frx5-2.xx&oh=00_AT-1BeZK3AHff69u5ZOajKgWD4MyOmrBjKRD9jwayJnJNQ&oe=62BDF0B5',6,0),
(45,N'قلاية  بندورة باللحمة',1.5,'https://scontent-frt3-1.xx.fbcdn.net/v/t39.30808-6/241157391_1260785144351727_2005630997804854649_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeELonfXac4iqBp5Q1vbQBd8A7XRmh6A_D4DtdGaHoD8PtkFUwGjjc6M-Y84NhVcGlNRrnXdErnEKALFXcT30y9C&_nc_ohc=A_Whwekws8MAX-LH9E5&_nc_ht=scontent-frt3-1.xx&oh=00_AT-erxGZZSzt0pvq6JP1aFXijKHAq4-9T4li5V9H9GATcQ&oe=629E290D',6,0),
(46,N'بندورة مع بيض',1,'https://www.taabkh.com/files/styles/recipe/public/recipe/2020/01/shakshuka-egg.jpg',6,0),
(47,N'لحمة مع بيض',1.5,'https://shamlola.s3.amazonaws.com/Shamlola_Images/8/src/d207729fc4dc0d6903a4bae1463b5a5dffa82c7c.jpg',6,0),
(48,N'مفركة',1,'https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-9/198194934_1206146413148934_3861000128068239180_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeG5x30MfqcoyX8AR3uHEnt7xJaAfrnzgoDEloB-ufOCgECyW6O0IBkU7qxnEwNtXaWKTCKbm-zambczh5eFYbL9&_nc_ohc=GRh36VIo0QUAX-d1srz&_nc_ht=scontent-frt3-1.xx&oh=00_AT_UGpzwqUBy5gx50M8I0kgM0vCCDWGXiDGeC_MPwyifXQ&oe=62BFC339',6,0),
(49,N'سندويش فلافل',0.5,'https://shamlola.s3.amazonaws.com/Shamlola_Images/8/src/f0e6e1c21c77052ad3540a9c6c576004a4c92b66.jpg',7,0),
(50,N'سندويش بطاطا',0.75,'https://trybany.s3.eu-central-1.amazonaws.com/uploads/products/7131/resized/007-HD.jpg',7,0),
(51,N'سندويش كبدة',0.9,'https://scontent-frx5-1.xx.fbcdn.net/v/t1.6435-9/208230552_1217633635333545_6895204336056393553_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFwLpb-PgIVGaKM2rhY4hsz7hm3ScmUyavuGbdJyZTJqypfpCiu_TASPJTkQ57KC5xYKdgWZe8TV3zBsCbX27oH&_nc_ohc=CgfTqIwrdT8AX_bw-9f&_nc_ht=scontent-frx5-1.xx&oh=00_AT93w-PtqoCq-vQ0_21Z0RRrEd7ErqnY_r28cvfevwX2GQ&oe=62C0527B',7,0),
(52,N'سندويش بيض',0.75,'https://www.atyabtabkha.com/uploads/sites/2/2021/10/1442805ae7d86db2fc4598595dc790146e17fdd9.jpg',7,0),
(53,N'شاي',0.3,'https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-9/71401304_764741917289388_4731926776089935872_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEclJCKHbTUe0Gnl3CjDY42O1TAnb13_H07VMCdvXf8fXt2p8BHkNq1OfqU-am59m9g3ynxBqLMkkbPV1v61Xb8&_nc_ohc=_U2vtzI3nN0AX_ACton&_nc_oc=AQmXD6VdFKcpcjCsnWoM1nLZCkXrob-9XoRuc3WkKQohDjSdgV-3rKyXsMCFNCtMiY0&_nc_ht=scontent-frt3-1.xx&oh=00_AT9h3o51orXPYsQm6oN7N8EvTU1U0hstu6jwTjScE38kdg&oe=62BCE495',8,0),
(54,N'ماء',0.6,'https://cozmo.jo/pub/media/catalog/product/cache/498ed9154ca719046198f24acd330695/6/2/6253501790053_1.jpg',8,0),
(55,N'كوكا كولا , سبرايت , فانتا',0.4,'https://sc04.alicdn.com/kf/U218a31fc9ed54908aa7cfa92e9154fcd4.jpg',8,0),
(56,N'شنينة',0.4,'https://scontent-frx5-2.xx.fbcdn.net/v/t1.6435-9/197550440_1204972849932957_3354474779876017454_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeEkPmxzVaDIxUieVhJbT3zYf5jZdFqbeeh_mNl0Wpt56NfvxoL1GVChhdkdSLGMgkjgAzbDJ_T-VfvIdpEgm-JI&_nc_ohc=6SrxI_JhqvMAX_u2gB1&tn=WLNv9DRtgbOyG3Tx&_nc_ht=scontent-frx5-2.xx&oh=00_AT-Dxudv8hjWn0dyZiNk6ULgvJ_4YOoOAvMQDGw2ddWJvw&oe=62BF6FA1',8,0),
(57,N'قهوة',0.5,'https://kahwate.com/wp-content/uploads/2021/09/%D9%81%D9%86%D8%AC%D8%A7%D9%86-%D9%82%D9%87%D9%88%D8%A9-%D8%AA%D8%B1%D9%83%D9%8A%D8%A9.jpg',8,0);



