-- DROP DATABASE IF EXISTS m4wf5ifdowrsox28;
--
-- CREATE DATABASE m4wf5ifdowrsox28;
-- USE m4wf5ifdowrsox28;

DROP TABLE IF EXISTS owns;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS battle_history;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pokemons;
DROP TABLE IF EXISTS poke_types;

CREATE TABLE users
(
	user_id						INT										PRIMARY KEY,
    user_type					ENUM('regular', 'admin')		NOT NULL,
    user_name					VARCHAR(45)					NOT NULL,
    user_password 			VARCHAR(255)					NOT NULL,
    tier 								INT					 					NOT NULL

);

CREATE TABLE pokemons
(
	poke_id 						INT 						PRIMARY KEY,
    poke_name 				VARCHAR(45)  	NOT NULL,
    hp								INT 						NOT NULL,
    attack 							INT 						NOT NULL,
    defense 						INT 						NOT NULL,
    sp_attack 				 	INT 						NOT NULL,
    sp_defense 				INT 						NOT NULL,
    speed 							INT 						NOT NULL,
    poke_type 					VARCHAR(45)  	NOT NULL
);

CREATE TABLE poke_types
(
	relation_id						INT							PRIMARY KEY			AUTO_INCREMENT,
    poke_id							INT,
    poke_type						VARCHAR(45)		NOT NULL,

    CONSTRAINT poke_fk_id
    FOREIGN KEY (poke_id)
    REFERENCES pokemons (poke_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE owns
(
	owns_id						INT								PRIMARY KEY  				AUTO_INCREMENT,
	user_id 						INT 								NOT NULL,
    poke_id 						INT								NOT NULL,
    poke_name					VARCHAR(45)			NOT NULL,
    hp								INT 								NOT NULL,
    attack 							INT 								NOT NULL,
    defense 						INT 								NOT NULL,
    sp_attack 				 	INT 								NOT NULL,
    sp_defense 				INT 								NOT NULL,
    speed 							INT 								NOT NULL,
    poke_type 					VARCHAR(45)  			NOT NULL,
    favorite						BOOLEAN      				NOT NULL,
    poke_current_hp 		INT								NOT NULL,

    CONSTRAINT own_fk_users
    FOREIGN KEY (user_id)
    REFERENCES users (user_id),
    CONSTRAINT own_fk_pokemons
    FOREIGN KEY (poke_id)
    REFERENCES pokemons (poke_id)
);

CREATE TABLE admin
(
	user_id						INT										PRIMARY KEY,

	CONSTRAINT admin_fk_users
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE

);

CREATE TABLE battle_history
(
    battle_id							INT 						PRIMARY KEY,
    user_id							INT 						NOT NULL,
    game_result					BOOLEAN  			NOT NULL,

    CONSTRAINT battle_history_fk_users
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE berry
(
	berry_id		INT		PRIMARY KEY,
    berry_name		VARCHAR(45),
    growth_time		INT,
    natural_gift_power  INT,
    size	INT
);

CREATE TABLE type_table
(
	pokemon_type		VARCHAR(20)			PRIMARY KEY
);

CREATE TABLE type_weak_against
(
	weak_relation_id				INT				PRIMARY KEY			AUTO_INCREMENT,
    base_type						VARCHAR(20),
    weak_against_type				VARCHAR(20),
<<<<<<< HEAD
    
=======

>>>>>>> origin/master
	CONSTRAINT base_fk_type
    FOREIGN KEY (base_type)
    REFERENCES type_table (pokemon_type) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT weak_against_fk_type
    FOREIGN KEY (weak_against_type)
    REFERENCES type_table (pokemon_type) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE type_strong_against
(
	strong_relation_id				INT				PRIMARY KEY			AUTO_INCREMENT,
    origin_type						VARCHAR(20),
    strong_against_type				VARCHAR(20),
<<<<<<< HEAD
    
=======

>>>>>>> origin/master
	CONSTRAINT origin_fk_type
    FOREIGN KEY (origin_type)
    REFERENCES type_table (pokemon_type) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT strong_against_fk_type
    FOREIGN KEY (strong_against_type)
    REFERENCES type_table (pokemon_type) ON UPDATE CASCADE ON DELETE CASCADE
);


-- CREATE TABLE battle
-- (
-- 	battle_id	 					INT 						PRIMARY KEY,
--     user_id 						INT 						NOT NULL,
--     pekemon_user_1		INT						NOT NULL,
--     pekemon_user_2		INT						NOT NULL,
--     pekemon_user_3		INT						NOT NULL,
--     pekemon_bot_1			INT						NOT NULL,
--     pekemon_bot_2			INT						NOT NULL,
--     pekemon_bot_3			INT						NOT NULL,
--     game_1_status			INT 						NOT NULL,
--     game_2_status 			INT 						NOT NULL,
--     game_3_status 			INT 						NOT NULL,
--     game_result				BOOLEAN           NOT NULL,
--
--     CONSTRAINT battle_pk
--     PRIMARY KEY (user_1_id, user_2_id),
--     CONSTRAINT battle_user1_fk_user
--     FOREIGN KEY (user_1_id)
--     REFERENCES registered_user (user_id) ON UPDATE CASCADE,
-- 	CONSTRAINT battle_user2_fk_user
--     FOREIGN KEY (user_2_id)
--     REFERENCES registered_user (user_id) ON UPDATE CASCADE,
-- 	CONSTRAINT battle_poke1_fk_pokemon
--     FOREIGN KEY (pekemon_1)
--     REFERENCES pokemon (poke_id) ON UPDATE CASCADE,
--     CONSTRAINT battle_poke2_fk_pokemon
--     FOREIGN KEY (pekemon_2)
--     REFERENCES pokemon (poke_id) ON UPDATE CASCADE,
--     CONSTRAINT battle_poke3_fk_pokemon
--     FOREIGN KEY (pekemon_3)
--     REFERENCES pokemon (poke_id) ON UPDATE CASCADE,
--     CONSTRAINT battle_poke4_fk_pokemon
--     FOREIGN KEY (pekemon_4)
--     REFERENCES pokemon (poke_id) ON UPDATE CASCADE,
--     CONSTRAINT battle_poke5_fk_pokemon
--     FOREIGN KEY (pekemon_5)
--     REFERENCES pokemon (poke_id) ON UPDATE CASCADE,
--     CONSTRAINT battle_poke6_fk_pokemon
--     FOREIGN KEY (pekemon_6)
--     REFERENCES pokemon (poke_id) ON UPDATE CASCADE
-- );

-- DROP TABLE IF EXISTS users;
-- CREATE TABLE receives
-- (
-- 	battle_id					INT,
--     user_id 					INT,
--
--     CONSTRAINT receives_pk
--     PRIMARY KEY (battle_id, user_id),
--
-- 	CONSTRAINT receives_fk_users
--     FOREIGN KEY (user_id)
--     REFERENCES users (user_id) ON UPDATE CASCADE,
--
-- 	CONSTRAINT receives_fk_battle_history
--     FOREIGN KEY (battle_id)
--     REFERENCES battle_history (battle_id)
-- );


-- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



