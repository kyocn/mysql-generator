const Base = require('./base');

class Insert extends Base {
    constructor() {
        super();
        this.clear();
    }

    into(tableName) {
        this.insertSql = `INSERT INTO \`${ tableName }\``;
        return this;
    }

    /**
     * 单条记录
     */
    set(field, fieldValue) {
        this.fields.push(field);
        this.fieldValues.push(fieldValue);
        return this;
    }

    /**
     * 单条记录
     */
    setFieldsRow(jsonFieldValues) {
        Object.keys(jsonFieldValues).forEach(key => {
            this.fields.push(key);
        });
        Object.values(jsonFieldValues).forEach(value => {
            this.fieldValues.push(value);
        });
        return this;
    }

    /**
     * 多条记录
     */
    setFieldsRows(jsonFieldValues) {
        this.jsonFieldValues = this.jsonFieldValues.concat(jsonFieldValues);
        return this;
    }

    /**
     * 使用函数
     */
    useFunction(columnId, funName) {
        this.funNames.set(columnId, funName);
        return this;
    }

    toString() {
        let sql = this.insertSql;
        if (this.jsonFieldValues.length > 0) {
            this.fields = Object.keys(this.jsonFieldValues[0]);
            this.fields.forEach((field, index) => {
                this.funNames.get(field) ? this.funIndexNames.set(index, this.funNames.get(field)) : '';
            });
            sql += ` (${ this.fields.join(', ') }) VALUES`;
            let valueSqls = [];
            this.jsonFieldValues.forEach(jsonFieldValue => {
                valueSqls.push(` (${ Object.values(jsonFieldValue).map((value, index) =>{
                    return this.funIndexNames.get(index) ? (this.funIndexNames.get(index) + '('+ super.escape(value) + ')') : super.escape(value);
                }).join(', ') })`);
            });
            sql += valueSqls.join(', ');
        } else {
            this.fields.forEach((field, index) => {
                this.funNames.get(field) ? this.funIndexNames.set(index, this.funNames.get(field)) : '';
            });
            sql += ` (${ this.fields.join(', ') }) VALUES`;
            sql += ` (${ this.fieldValues.map((value, index) =>{
                            return this.funIndexNames.get(index) ? (this.funIndexNames.get(index) + '('+ super.escape(value) + ')') : super.escape(value);
                        }).join(', ') })`;
        }
        sql += ';';
        this.clear();
        return sql;
    }

    clear() {
        this.funNames = new Map();
        this.funIndexNames = new Map();
        this.fields = [];
        this.fieldValues = [];
        this.insertSql = '';
        this.jsonFieldValues = [];
    }
}

module.exports = Insert;