const Select = require('./lib/select');
const Insert = require('./lib/insert');
const Delete = require('./lib/delete');
const Update = require('./lib/update');

module.exports = class {
    static get Select() {
        return new Select();
    }
    static get Insert() {
        return new Insert();
    }
    static get Delete() {
        return new Delete();
    }
    static get Update() {
        return new Update();
    }
}