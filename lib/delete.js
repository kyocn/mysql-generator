const Base = require('./base');

class Delete extends Base {
    constructor() {
        super();
        this.clear();
    }

    from(tableName) {
        this.deleteSql = `DELETE FROM \`${ tableName }\``;
        return this;
    }

    where(condition, ...values) {
        values.map(value => {
            condition = condition.replace(/\?/, this.escape(value));
        });
        this.whereSql.push(condition);
        return this;
    }

    orderBy(orderBy, sortDirection = 'ASC') {
        this.orderBySql.push(`${ orderBy } ${ sortDirection }`);
        return this;
    }

    limit(pageSize) {
        this.limitSql = ` LIMIT ${ pageSize }`;
        return this;
    }

    toString() {
        let sql = this.deleteSql;
        this.whereSql.length > 0 ? sql += ' WHERE ' + this.whereSql.join(' AND ') : '';
        this.orderBySql.length > 0 ? sql += ' ORDER BY ' + this.orderBySql.join(', ') : '';
        this.limitSql.length > 0 ? sql += this.limitSql : '';
        sql += ';';
        this.clear();
        return sql;
    }

    clear() {
        this.deleteSql = '';
        this.limitSql = '';
        this.whereSql = [];
        this.orderBySql = [];
    }
}

module.exports = Delete;