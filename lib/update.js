const Base = require('./base');

class Update extends Base {
    constructor() {
        super();
        this.clear();
    }

    table(tableName) {
        this.tableSql = `UPDATE \`${ tableName }\` SET `;
        return this;
    }

    set(field, fieldValue) {
        this.fields.push(field);
        this.fieldValues.push(fieldValue);
        return this;
    }

    setFields(jsonFieldValues) {
        this.jsonFieldValues = jsonFieldValues;
        return this;
    }

    /**
     * 使用函数
     */
    useFunction(columnId, funName) {
        this.funNames.set(columnId, funName);
        return this;
    }

    where(condition, ...values) {
        values.map(value => {
            condition = condition.replace(/\?/, this.escape(value));
        });
        this.whereSql.push(condition);
        return this;
    }

    toString() {
        let sql = this.tableSql;
        if (this.jsonFieldValues) {
            Object.keys(this.jsonFieldValues).forEach(key => {
                this.fields.push(key);
            });
            Object.values(this.jsonFieldValues).forEach((value, index) => {
                this.fieldValues.push(value);
            });
        }
        this.fields.forEach((field, index) => {
            this.funNames.get(field) ? this.funIndexNames.set(index, this.funNames.get(field)) : '';
        });
        sql += this.fields.join(' = ?, ') + ' = ?';
        this.fieldValues.map((value, index) => {
            sql = sql.replace(/\?/, this.funIndexNames.get(index) ? (this.funIndexNames.get(index) + '(' + this.escape(value) + ')') : this.escape(value));
        });
        this.whereSql.length > 0 ? sql += ' WHERE ' + this.whereSql.join(' AND ') : '';
        sql += ';';
        this.clear();
        return sql;
    }

    clear() {
        this.funNames = new Map();
        this.funIndexNames = new Map();
        this.tableSql = '';
        this.fields = [];
        this.fieldValues = [];
        this.jsonFieldValues = null;
        this.whereSql = [];
    }
}

module.exports = Update;