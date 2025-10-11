Initial phase tasks:
- Identify the tables, columns and database design 
- Identify endpoints, request-response format and the user roles
- Auth mechanisms

Tables:
Using SQL database as data is kind of relation-> relation between equipment, bookings and users(admin handles equipment details, users book equipements etc.)
-  users : students, professor and admin 
|--- id, username, role, email, password, request/booking history
|------ password must be hashed for security
- equipments/items : what is taken, how much is taken, when it is taken
|--- id, item_name, item_status(booked, avaliable, on hold, out of stock), item_category(sports kits, lab equipment, cameras, musical instruments), item_condition(any damages?), item_quantity
- requests/bookings: who took what , logs for item , when to return etc
|--- id, user_id(taken by, foreign key from user table), eqiupment_id(foreign key from equipment table), allotted_at, returned_at