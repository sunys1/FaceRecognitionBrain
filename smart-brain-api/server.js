const express = require ('express');

const app = express ();

//app.use(express.urlencoded({extended: false}));
app.use(express.json());

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
	if (req.body.email === database.users[0].email && req.body.password == database.users[0].password) {
		res.json ('Success!');
	}else{
		res.status(400).json('error logging in');
	}

	res.json('This is Sign in');
})

app.post ('/register', (req, res) => {
	const {email, name, password } =req.body;
	database.users.push ({
			id: '125',
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

