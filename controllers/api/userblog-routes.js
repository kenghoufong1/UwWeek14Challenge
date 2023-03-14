const router = require('express').Router();
const { userblog } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await userblog.create({
      user_id: req.session.user_id,
      blogcontent: req.body.blogcontent,
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const projectData = await userblog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;