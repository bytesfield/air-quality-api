const register = require('@babel/register').default;

const dotenv = require('dotenv');

register({ extensions: ['.ts', '.tsx', '.js', '.jsx'] });

dotenv.config();

module.exports = require('./database.ts');
