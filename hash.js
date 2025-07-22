// hash.js
const bcrypt = require('bcrypt');

const password = 'gehrmann123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing:', err);
  } else {
    console.log('Hashed password:\n', hash);
  }
});
