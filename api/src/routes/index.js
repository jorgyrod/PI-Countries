const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRouter = require('./Country.js');
const activityRouter = require('./Activity.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/api/countries', countryRouter);
router.use('/api/activity', activityRouter);


module.exports = router;
