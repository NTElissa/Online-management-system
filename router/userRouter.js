const userController = require('./controller/userController');


app.post('/users', userController.createUser);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.delete('/users/:id', userController.deleteUserById);
