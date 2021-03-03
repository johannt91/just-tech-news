const router = require('express').Router();
const { User } = require('../../models');

//GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }//protect passwords
    }) // this is the same as SELECT * FROM users
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET /api/user/1
router.get('/:id', (req, res) => {
    User.findOne({ // = SELECT * FROM users WHERE id = 1
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) { // if user doesn't exist then error 404, not found
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST api/users
router.post('/', (req, res) => {
    User.create({ //INSERT INTO users (username, email, password) VALUES ('John20', 'john@example.com', 'password');
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!'});
            return;
        }
        
        // Verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }
        res.json({ user: dbUserData, message: 'You are now logged in!'});
    });
});

// PUT api/users/1
router.put('/:id', (req, res) => {
    User.update(req.body, {//UPDATE users SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
        individualHooks: true,
        where: { //WHERE id = 1;
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id //captured from url route /:id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;