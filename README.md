# Express

localhost:1234/users/create --> allows us to create users
 
localhost:1234/users/login -->
 login to get the json web token which u can use for subsequent calls
 
localhost:1234/orders/create -->
 allows to create orders
 one to many relationship is established between user and orders where a user can have a list of orders and a order can have a user

localhost:1234/orders/entireOrder -->
 gets the entire set of orders if the user has admin privileges
 
localhost:1234/orders/getAllOrders -->
 gets the entire set of orders for a particular user
 
localhost:1234/orders/5c0960981bd003503c460847 -->
 gets the order detail
