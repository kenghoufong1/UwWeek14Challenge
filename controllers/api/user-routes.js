const router = require('express').Router();
const { user } = require('../../models');

//signup form
router.post('/', async (req, res) => {
    try {
      const userData = await user.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      });
        res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
//login
  router.post('/login', async (req, res) => {
    try {
      const dbUserData = await user.findOne({
        where: {
          username: req.body.username,
        },
      });

      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      const validPassword = await user.findOne({
        where: {
          password: req.body.password,
        },
      });
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = (dbUserData.id);
        req.session.loggedIn = true;
  
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(405).end();
    }
  });
module.exports = router;