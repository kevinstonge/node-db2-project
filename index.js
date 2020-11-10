const server = require('./server.js');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const IP = process.env.IP;
server.listen(PORT, () => { console.log(`server online: http://${IP}:${PORT}`) });