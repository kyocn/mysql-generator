const Select = require('./lib/select');
const Insert = require('./lib/insert');
const Delete = require('./lib/delete');
const Update = require('./lib/update');
const sqlString = require('./lib/ext/sqlString');

module.exports = {
    Select: new Select(),
    Insert: new Insert(),
    Delete: new Delete(),
    Update: new Update(),
    sqlString: sqlString
}