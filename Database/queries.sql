/* Note: I have referred to PHP variables as $VAR. 
Note 2: Due to PHP shenanigans, I think you access a variable like ".$VAR."
For example: WHERE User.Username='".$USERNAME."'
'' for String, ". ." to properly escape the variable. */


--Login query:
SELECT * -- Could return only Userid column, but parsing should be the same
FROM User
WHERE User.Username='$USER' AND User.Password='$PASS'

--Register query:
INSERT INTO User (Userid, Username, Password, DateCreated, LastLogin)
VALUES (0, $USER, $PASS, $CURRDATE, $CURRTIME)
-- Get current time with PHP functions: https://www.w3schools.com/php/php_date.asp

--View contacts query:
SELECT *
FROM Contact
WHERE Contact.Userid=$USERID

--Add Contact query:
INSERT INTO Contact (Contactid, Userid, ContactName, ContactNumber)
VALUES (0, $USER, $CONTNAME, $CONTNUM)

--Remove Contact query:
DELETE FROM Contact
WHERE Contactid=$CONTID
