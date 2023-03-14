const router = require('express').Router();
const user = require('../models/user');
const userblog = require('../models/userblog');

router.get('/', async (req, res) => {
  try {
    const userblogdata = await userblog.findAll({
      include: [{ model: user }]
    });
    const blogs = userblogdata.map((user) => user.get({ plain: true }));
    // console.log(blogs);
    res.render('all', { blogs, loggedIn: req.session.loggedIn });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    try {
      const blogData = await userblog.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
      const data = blogData.map((user) => user.get({ plain: true }));
      console.log(data);
      res.render('dashboard', {data, loggedIn: req.session.loggedIn });
    }
    catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;