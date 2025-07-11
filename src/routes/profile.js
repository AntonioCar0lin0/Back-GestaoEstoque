const express           = require('express');
const router            = express.Router();
const auth              = require('../middlewares/authMiddleware');
const ProfileController = require('../controllers/ProfileController');

/* todas protegidas por JWT */
router.use(auth);

router.get('/profile',      ProfileController.getProfile);
router.put('/profile',      ProfileController.updateProfile);
router.put('/password',     ProfileController.updatePassword);

module.exports = router;
