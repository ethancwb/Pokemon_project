-- DROP DATABASE IF EXISTS m4wf5ifdowrsox28;


-- CREATE DATABASE m4wf5ifdowrsox28;
-- USE m4wf5ifdowrsox28;



CREATE TABLE users
(
	user_id						INT										PRIMARY KEY,
    user_type					ENUM('regular', 'admin')		NOT NULL,
    user_name					VARCHAR(45)					NOT NULL,
    user_password 			VARCHAR(45)					NOT NULL,
    tier 								INT					 					NOT NULL

);


CREATE TABLE admin
(
	user_id						INT										PRIMARY KEY,
    
	CONSTRAINT admin_fk_users
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) ON UPDATE CASCADE 

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

CREATE TABLE battle_history
(
    battle_id							INT 						PRIMARY KEY,
    user_id							INT 						NOT NULL,
    game_result					BOOLEAN  			NOT NULL,
    
    CONSTRAINT battle_history_fk_users
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) ON UPDATE CASCADE
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


CREATE TABLE receives
(
	battle_id					INT,
    user_id 					INT,
    
    CONSTRAINT receives_pk
    PRIMARY KEY (battle_id, user_id),
    
	CONSTRAINT receives_fk_users
    FOREIGN KEY (user_id)
    REFERENCES users (user_id) ON UPDATE CASCADE,
    
	CONSTRAINT receives_fk_battle_history
    FOREIGN KEY (battle_id)
    REFERENCES battle_history (battle_id)
);


-- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



