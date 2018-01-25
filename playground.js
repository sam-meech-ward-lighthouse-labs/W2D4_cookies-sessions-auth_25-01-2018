const bcrypt = require('bcrypt');

const saltRounds = 12;
const password = "jazz hands";

const hashedPassword = bcrypt.hashSync(password, saltRounds);

const equal = bcrypt.compareSync(password, hashedPassword);

console.log(password, hashedPassword, equal);

