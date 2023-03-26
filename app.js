import express from 'express';
import userController from './controller/userController';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Define the endpoints
app.post('/users', userController.createUser);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.delete('/users/:id', userController.deleteUserById);

app.get('/', (req, res) => {
  res.send('Online management system');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
