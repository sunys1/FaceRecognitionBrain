const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

//app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'Yizhou',
			email: 'ysun@gmail.com',
			password: 'password',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sun',
			email: 'sunys@gmail.com',
			password: 'test',
			entries: 0,
			joined: new Date()
		}
	]
}
app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	const {email} = req.body;
	const {password} = req.body;
	let found = false;
	database.users.forEach(user => {
		if(email === user.email && password === user.password){
			found = true;
			res.json(user);
		}
	})
	if(!found){
		res.status(400).json('error logging in');
	}
})

app.post ('/register', (req, res) => {
	const {email, name, password } =req.body;
	database.users.push ({
			id: (Number(database.users[database.users.length-1].id) + 1).toString(),
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const {id} = req.params; 
	let found = false;
	database.users.forEach(user => {
		if(id === user.id){
			found = true;
			return res.json(user);
		}
	})

	if (!found) {
		res.status(400).json('user not found');
	}
})

app.put('/image', (req, res) => {
	const {id} = req.body;
	let found = false;
	database.users.forEach(user => {
		if(id === user.id){
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})

	if(!found){
		return res.status(404).json('not found');
	}
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen (3000, () => {
	console.log('App is running on port 3000');
})

/*
/ --> root - This is gettting
/Signin --> POST = success or fail
/Register --> POST = new user obj
/Profile/:user_id --> GET = user
/Image --> PUT = user
*/

