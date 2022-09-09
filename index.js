const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlwares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
routerApi(app);

// Use middleware errors
app.use(logErrors); // The error is captured.
app.use(ormErrorHandler); // It is detected if it is an ORM type error.
app.use(boomErrorHandler); // It is detected if in a boom -type error.
app.use(errorHandler); // Yes none of the previous middleware capture nothing, it is captured by this.

// Listen port.
app.listen(port, () => {
  console.log('Mi port' + port);
});
