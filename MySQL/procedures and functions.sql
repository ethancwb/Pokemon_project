USE m4wf5ifdowrsox28;


-- login -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP FUNCTION IF EXISTS login;

DELIMITER $$
CREATE FUNCTION login(user_name VARCHAR(45), user_password VARCHAR(255))
RETURNS INT
BEGIN

DECLARE uid INT;


SELECT user_id INTO uid
FROM users u
WHERE u.user_name = user_name
AND u.user_password = user_password;

RETURN (uid);
END $$
DELIMITER ;


-- regisration -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS regisration;

DELIMITER $$
CREATE PROCEDURE regisration(uid INT, user_name VARCHAR(45), user_password VARCHAR(255))
BEGIN

INSERT INTO users (user_id, user_type, user_name, user_password, tier) VALUES (uid, 'regular', user_name, user_password, 0);
SELECT user_id FROM users u WHERE u.user_id = uid;


END $$
DELIMITER ;

-- find_user_by_credential -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS find_user_by_credential;

DELIMITER $$
CREATE PROCEDURE find_user_by_credential(user_name VARCHAR(45), user_password VARCHAR(255))
BEGIN

SELECT user_id FROM users u WHERE u.user_name = user_name AND u.user_password = user_password;


END $$
DELIMITER ;




-- get_user_by_name -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS get_user_by_name;

DELIMITER $$
CREATE PROCEDURE get_user_by_name(usern VARCHAR(255))
BEGIN

SELECT * FROM users u WHERE u.user_name = usern;


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
CREATE PROCEDURE update_user(uid INT, user_name VARCHAR(45), user_password VARCHAR(255))
BEGIN

UPDATE users r SET u.user_name = user_name, u.user_password = user_password
WHERE u.user_id = uid;

END $$
DELIMITER ;


-- get_user_by_id -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS get_user_by_id;

DELIMITER $$
CREATE PROCEDURE get_user_by_id(uid INT)
BEGIN

SELECT user_id, user_type, user_name, tier FROM users WHERE user_id = uid;

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
INSERT INTO owns (user_id, poke_id, poke_name, hp, attack, defense, sp_attack, sp_defense, speed, poke_type, favorite, poke_current_hp)
VALUES (uid, pid, new_poke_name, new_poke_hp, new_poke_attack, new_poke_defense, new_poke_sp_attack, new_poke_sp_defense,
new_poke_speed, new_poke_type, 0, new_poke_hp);
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
DELIMITER ;

-- addBattleHistory -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS addBattleHistory;

DELIMITER $$
CREATE PROCEDURE addBattleHistory(bid VARCHAR(45), uid INT, result INT)
BEGIN

DECLARE user_winning_number INT;

INSERT INTO battle_history VALUES(bid, uid, result);

SELECT COUNT(*) INTO user_winning_number FROM battle_history WHERE battle_history.user_id = uid AND battle_history.game_result = 1;

IF (user_winning_number != 0) AND (user_winning_number % 10 = 0)
THEN UPDATE users SET users.tier = (user_winning_number / 10);
END IF;

END $$
DELIMITER ;

-- add type -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS addPokeType;

DELIMITER $$
CREATE PROCEDURE addPokeType(poke_id INT, poke_type VARCHAR(45))
BEGIN

INSERT INTO poke_types (poke_id, poke_type) VALUES (poke_id, poke_type);

END $$
DELIMITER ;

-- search by type -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS getAllTypes;

DELIMITER $$
CREATE PROCEDURE getAllTypes(poke_t VARCHAR(45))
BEGIN

SELECT firstList.poke_id, firstList.poke_name, firstList.hp, firstList.attack,
 firstList.defense, firstList.sp_attack, firstList.sp_defense, firstList.speed,
 CONCAT_WS(',',matched_type, poke_type)  AS poke_types, GROUP_CONCAT(DISTINCT tsa.strong_against_type) AS strong_against, GROUP_CONCAT(DISTINCT twa.weak_against_type) AS weak_against FROM
(SELECT p.poke_id, p.poke_name, p.hp, p.attack, p.defense, p.sp_attack, p.sp_defense, p.speed, pt.poke_type AS matched_type
FROM pokemons p JOIN poke_types pt ON p.poke_id = pt.poke_id WHERE pt.poke_type = poke_t) AS firstList
JOIN poke_types ON firstList.poke_id = poke_types.poke_id
JOIN type_strong_against tsa ON firstList.matched_type = tsa.origin_type or poke_type = tsa.origin_type
JOIN type_weak_against twa ON firstList.matched_type = twa.base_type or poke_type = twa.base_type
GROUP BY firstList.poke_id, firstList.poke_name;

END $$
DELIMITER ;

-- search tyeplist by poke_id -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS getTypesForId;

DELIMITER $$
CREATE PROCEDURE getTypesForId(pid INT)
BEGIN

SELECT poke_type FROM poke_types WHERE poke_id = pid;

END $$
DELIMITER ;

-- add berry -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS addBerry;

DELIMITER $$
CREATE PROCEDURE addBerry(berryid INT, berryname VARCHAR(45), growthtime INT, naturalgiftpower INT, size INT)
BEGIN

INSERT INTO berry(berry_id, berry_name, growth_time, natural_gift_power, size) VALUES (berryid, berryname, growthtime, naturalgiftpower, size);

END $$
DELIMITER ;

-- list all berry -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS getAllBerries;

DELIMITER $$
CREATE PROCEDURE getAllBerries()
BEGIN

SELECT * FROM berry;

END $$
DELIMITER ;

-- Add strong against relation -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS addStrongAgainst;

DELIMITER $$
CREATE PROCEDURE addStrongAgainst(otype VARCHAR(20), atype VARCHAR(20))
BEGIN

INSERT INTO type_strong_against(origin_type, strong_against_type) VALUES (otype, atype);

END $$
DELIMITER ;

-- check strong against -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS searchStrongAgainst;

DELIMITER $$
CREATE PROCEDURE searchStrongAgainst(basetype VARCHAR(20))
BEGIN

SELECT strong_against_type FROM type_strong_against WHERE origin_type = basetype;

END $$
DELIMITER ;

-- check weak against -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS searchWeakAgainst;

DELIMITER $$
CREATE PROCEDURE searchWeakAgainst(basetype VARCHAR(20))
BEGIN

SELECT weak_against_type FROM type_weak_against WHERE base_type = basetype;

END $$
<<<<<<< HEAD
DELIMITER ;

-- get Information table by ID -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS getInforTableById;

DELIMITER $$
CREATE PROCEDURE getInforTableById(pid INT)
BEGIN

SELECT p.poke_id, p.poke_name, p.hp, p.attack, p.defense, p.sp_attack, p.sp_defense, p.speed, GROUP_CONCAT(DISTINCT pt.poke_type) AS poke_types, GROUP_CONCAT(DISTINCT tsa.strong_against_type) AS strong_against, GROUP_CONCAT(DISTINCT twa.weak_against_type) AS weak_against
FROM pokemons p JOIN poke_types pt ON p.poke_id = pt.poke_id 
JOIN type_strong_against tsa ON pt.poke_type = tsa.origin_type
JOIN type_weak_against twa ON pt.poke_type = twa.base_type
WHERE p.poke_id = pid;

END $$
DELIMITER ;

-- get Information table by name -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS getInforTableByName;

DELIMITER $$
CREATE PROCEDURE getInforTableByName(poke_name VARCHAR(45))
BEGIN

SELECT p.poke_id, p.poke_name, p.hp, p.attack, p.defense, p.sp_attack, p.sp_defense, p.speed, GROUP_CONCAT(DISTINCT pt.poke_type) AS poke_types, GROUP_CONCAT(DISTINCT tsa.strong_against_type) AS strong_against, GROUP_CONCAT(DISTINCT twa.weak_against_type) AS weak_against
FROM pokemons p JOIN poke_types pt ON p.poke_id = pt.poke_id 
JOIN type_strong_against tsa ON pt.poke_type = tsa.origin_type
JOIN type_weak_against twa ON pt.poke_type = twa.base_type
WHERE p.poke_name = poke_name;

END $$
DELIMITER ;
=======
DELIMITER ;
>>>>>>> origin/master
