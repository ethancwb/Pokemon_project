USE m4wf5ifdowrsox28;


-- login -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP FUNCTION IF EXISTS login;

DELIMITER $$
CREATE FUNCTION login(user_name VARCHAR(45), user_password VARCHAR(45))
RETURNS INT
BEGIN

DECLARE uid INT;


SELECT user_id INTO uid
FROM registered_users r
WHERE r.user_name = user_name
AND r.user_password = user_password;

RETURN (uid);
END $$
DELIMITER ;


-- regisration -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS regisration;

DELIMITER $$
CREATE PROCEDURE regisration(uid INT, user_name VARCHAR(45), user_password VARCHAR(45))
BEGIN

INSERT INTO registered_users (user_id, user_type, user_name, user_password, tier) VALUES (uid, 'regular', user_name, user_password, 'bronze');
SELECT user_id FROM registered_users r WHERE r.user_id = uid;


END $$
DELIMITER ;

-- find_user_by_credential -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS find_user_by_credential;

DELIMITER $$
CREATE PROCEDURE find_user_by_credential(user_name VARCHAR(45), user_password VARCHAR(45))
BEGIN

SELECT user_id FROM registered_users r WHERE r.user_name = user_name AND r.user_password = user_password;


END $$
DELIMITER ;




-- get_user_by_name -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS get_user_by_name;

DELIMITER $$
CREATE PROCEDURE get_user_by_name(user_name VARCHAR(45))
BEGIN

SELECT user_id FROM registered_users r WHERE r.user_name = use_name;


END $$
DELIMITER ;




-- get_all_pokemons -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS get_all_pokemons;

DELIMITER $$
CREATE PROCEDURE get_all_pokemons(uid INT)
BEGIN
SELECT *
FROM owns o
WHERE o.user_id = uid;
END $$
DELIMITER ;




-- delete_pokemon -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS delete_pokemon;

DELIMITER $$
CREATE PROCEDURE delete_pokemon(oid INT)
BEGIN

DELETE FROM owns WHERE owns_id = oid;

END $$
DELIMITER ;


-- update_user -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS update_user;

DELIMITER $$
CREATE PROCEDURE update_user(uid INT, user_name VARCHAR(45), user_password VARCHAR(45))
BEGIN

UPDATE registered_users r SET r.user_name = user_name, r.user_password = user_password
WHERE r.user_id = uid;

END $$
DELIMITER ;


-- get_user_by_id -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS get_user_by_id;

DELIMITER $$
CREATE PROCEDURE get_user_by_id(uid INT)
BEGIN

SELECT user_id, user_type, user_name, tier FROM registered_users WHERE user_id = uid;

END $$
DELIMITER ;

-- get_pokemon_by_id -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS get_pokemon_by_id;

DELIMITER $$
CREATE PROCEDURE get_pokemon_by_id(pid INT)
BEGIN

SELECT * FROM pokemons p WHERE p.poke_id = pid;

END $$
DELIMITER ;

-- get_pokemon_by_name -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS get_pokemon_by_name;

DELIMITER $$
CREATE PROCEDURE get_pokemon_by_name(p_name VARCHAR(45))
BEGIN

SELECT * FROM pokemons p WHERE p.poke_name = p_name;

END $$
DELIMITER ;


-- get_pokemon_by_type -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS get_pokemon_by_type;

DELIMITER $$
CREATE PROCEDURE get_pokemon_by_type(p_type VARCHAR(45))
BEGIN

SELECT * FROM pokemons p WHERE p.poke_type = p_type;

END $$
DELIMITER ;

-- get_pokemon_by_uid -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS get_pokemon_by_uid;

DELIMITER $$
CREATE PROCEDURE get_pokemon_by_uid(uid INT)
BEGIN

SELECT * FROM owns o WHERE o.user_id = uid;

END $$
DELIMITER ;




-- get_pokemon_by_uid -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS get_favorite_pokemon_by_uid;

DELIMITER $$
CREATE PROCEDURE get_favorite_pokemon_by_uid(uid INT)
BEGIN

SELECT * FROM owns o WHERE o.user_id = uid AND o.favorite = 1;

END $$
DELIMITER ;


-- add_new_own -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS add_new_own;

DELIMITER $$
CREATE PROCEDURE add_new_own(uid INT, pid INT, 
p_hp INT, p_attack INT, p_defense INT, p_sp_attack INT, p_sp_defense INT, p_speed INT)
BEGIN

DECLARE numberOfPokemons INT;
DECLARE new_poke_name VARCHAR(45);
DECLARE new_poke_hp INT;
DECLARE new_poke_attack INT;
DECLARE new_poke_defense INT;
DECLARE new_poke_sp_attack INT;
DECLARE new_poke_sp_defense INT;
DECLARE new_poke_speed INT;
DECLARE new_poke_type VARCHAR(45);

SELECT COUNT(*) INTO numberOfPokemons FROM owns o WHERE o.user_id = uid;

SELECT 
poke_name, (hp + p_hp), (attack + p_attack), (defense + p_defense), (sp_attack + p_sp_attack), (sp_defense + p_sp_defense), (speed + p_speed), poke_type 
INTO new_poke_name, new_poke_hp, new_poke_attack, new_poke_defense, new_poke_sp_attack, new_poke_sp_defense,
new_poke_speed, new_poke_type
FROM pokemons p WHERE p.poke_id = pid;


IF numberOfPokemons < 12 THEN
INSERT INTO owns (user_id, poke_id, poke_name, hp, attack, defense, sp_attack, sp_defense, speed, poke_type, favorite)
VALUES (uid, pid, new_poke_name, new_poke_hp, new_poke_attack, new_poke_defense, new_poke_sp_attack, new_poke_sp_defense,
new_poke_speed, new_poke_type, 0);
END IF;


END $$
DELIMITER ;



-- update_favirote -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS update_favirote;

DELIMITER $$
CREATE PROCEDURE update_favirote(uid INT, oid INT)
BEGIN

DECLARE isFavorite BOOLEAN;
DECLARE numberOfFavorite INT;

SELECT COUNT(*) INTO numberOfFavorite FROM owns WHERE owns.user_id = uid AND owns.favorite = 1;

SELECT favorite INTO isFavorite FROM owns WHERE owns_id = oid;

IF isFavorite != 1 AND numberOfFavorite < 3 THEN SET isFavorite = 1;
ELSE SET isFavorite = 0;
END IF;

UPDATE owns o SET o.favorite = isFavorite
WHERE o.owns_id = oid;

END $$
DELIMITER ;


-- generateRandomTeam -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS generateRandomTeam;

DELIMITER $$
CREATE PROCEDURE generateRandomTeam(p1 INT, p2 INT, p3 INT)
BEGIN

SELECT * FROM pokemons p WHERE p.poke_id = p1 OR p.poke_id = p2 OR p.poke_id = p3;

END $$
