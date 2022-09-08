const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlwares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
routerApi(app);

app.use(logErrors); // Se captura el error.
app.use(ormErrorHandler); // Se detecta si es un error de tipo ORM.
app.use(boomErrorHandler); // Se detecta si en un error de tipo Boom.
app.use(errorHandler); // Sí ninguno de los middleware anterior capturo nada, es capturado por este.

app.listen(port, () => {
  console.log('Mi port' + port);
});
