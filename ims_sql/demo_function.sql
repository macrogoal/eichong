DELIMITER ;;
CREATE FUNCTION a2(d1 INT) 
RETURNS INT
BEGIN
RETURN d1 + 1; 
END;;
DELIMITER ;
select a2(99);
drop function a2; 
