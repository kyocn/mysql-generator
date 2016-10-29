const SqlString = require('./ext/sqlString');

class Base{
    escape(value) {
        return SqlString.escape(value, true);
    }
}

module.exports = Base;