const Base = require('./base');

class Select extends Base {
    constructor() {
        super();
        this.clear();
    }

    from(tableNameOrQuery, tableAlias = null) {
        if (tableNameOrQuery instanceof Select) {
            this.fromSql = ` FROM (${ tableNameOrQuery.toString(false) }) AS ${ tableAlias }`;
        } else {
            this.fromSql = ` FROM \`${ tableNameOrQuery }\`` + (tableAlias ? `AS ${ tableAlias }` : ``);
        }
        return this;
    }

    field(field, fieldAlias = null) {
        this.fieldSql.push(`${ field }${ (fieldAlias ? (' AS ' + fieldAlias) : '') }`);
        return this;
    }

    _join(tableNameOrQuery, tableAlias, onCondition, joinType = 'INNER') {
        if (tableNameOrQuery instanceof Select) {
            this.joinSql.push(` ${ joinType } JOIN (${ tableNameOrQuery.toString(false) }) AS ${ tableAlias } ON ${ onCondition }`);
        } else {
            this.joinSql.push(` ${ joinType } JOIN \`${ tableNameOrQuery }\` AS ${ tableAlias } ON ${ onCondition }`);
        }
        return this;
    }

    leftJoin(tableNameOrQuery, tableAlias, onCondition) {
        return this._join(tableNameOrQuery, tableAlias, onCondition, 'LEFT');
    }

    rightJoin(tableNameOrQuery, tableAlias, onCondition) {
        return this._join(tableNameOrQuery, tableAlias, onCondition, 'RIGHT');
    }

    innerJoin(tableNameOrQuery, tableAlias, onCondition) {
        return this._join(tableNameOrQuery, tableAlias, onCondition);
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

    //TODO 待添加
    groupBy() {

    }

    //TODO 待添加
    having() {

    }

    limit(pageIndex, pageSize) {
        this.limitSql = ` LIMIT ${ pageSize } OFFSET ${ (pageIndex - 1) * pageSize }`;
        return this;
    }

    toString(hasSemicolon = true) {
        let sql = 'SELECT ';
        this.fieldSql.length > 0 ? sql += this.fieldSql.join(', ') : sql += '*';
        sql += this.fromSql;
        this.joinSql.length > 0 ? sql += this.joinSql.join(' ') : '';
        this.whereSql.length > 0 ? sql += ' WHERE ' + this.whereSql.join(' AND ') : '';
        this.orderBySql.length > 0 ? sql += ' ORDER BY ' + this.orderBySql.join(', ') : '';
        this.limitSql.length > 0 ? sql += this.limitSql : '';
        hasSemicolon ? sql += ';' : '';
        this.clear();
        return sql;
    }

    clear() {
        this.fieldSql = [];
        this.fromSql = '';
        this.joinSql = [];
        this.whereSql = [];
        this.orderBySql = [];
        this.limitSql = '';
    }
}

module.exports = Select;