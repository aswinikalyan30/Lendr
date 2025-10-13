Initial phase tasks:

- Identify the tables, columns and database design 
- Identify endpoints, request-response format and the user roles (Document as swagger api)
- Auth mechanisms :
   - [1 - JWT Tokens](https://codewithpawan.medium.com/authentication-and-authorization-in-node-js-a-comprehensive-guide-2755b57dce27)

Tables:
Using SQL database as data is kind of relation-> relation between equipment, bookings and users(admin handles equipment details, users book equipements etc.)
-  users : students, professor and admin
<br>|--- id, username, role, email, password, request/booking history
<br>|------ password must be hashed for [security](https://docs.vultr.com/how-to-securely-store-passwords-using-postgresql)
- equipments/items : what is taken, how much is taken, when it is taken
<br>|--- id, item_name, item_status(booked, avaliable, on hold, out of stock), item_category(sports kits, lab equipment, cameras, musical instruments), item_condition(any damages?), item_quantity
- requests/bookings: who took what , logs for item , when to return etc
<br>|--- id, user_id(taken by, foreign key from user table), eqiupment_id(foreign key from equipment table), allotted_at, returned_at

Choice of DB: Postgres (explore free hosting of pg db / rds on AWS) : [heroku-pg](https://www.heroku.com/postgres/)
Choice of orm : [sequelize](https://sequelize.org/docs/v6/)

