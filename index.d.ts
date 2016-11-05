declare namespace SqlGenerator {
	interface Base {
		/**
		 * escape sql paramter, avoid sql injection
		 */
		escape(value: Object): string;
	}
	/**
	 * Select Table
	 */
	interface Select extends Base {

		from(tableName: string, tableAlias?: string): Select;

		from(table: Select, tableAlias: string): Select;

		field(field: string, fieldAlias?: string): Select;

		leftJoin(tableName: string, tableAlias: string, onCondition: string): Select;

		leftJoin(table: Select, tableAlias: string, onCondition: string): Select;

		rightJoin(tableName: string, tableAlias: string, onCondition: string): Select;

		rightJoin(table: Select, tableAlias: string, onCondition: string): Select;

		innerJoin(tableName: string, tableAlias: string, onCondition: string): Select;

		innerJoin(table: Select, tableAlias: string, onCondition: string): Select;

		union(table: Select, all?: boolean): Select;

		where(condition: string, ...values: string[]): Select;

		orderBy(orderBy, sortDirection?: string): Select;

		groupBy(): Select;

		having(): Select;

		limit(pageIndex: number, pageSize: number): Select;

		toString(): string;
	}

	/**
	 * Update Table
	 */
	interface Update extends Base {

		escape(value: Object): string;

		table(tableName: string): Update;


		set(field: string, fieldValue: string): Update;

		setFields(jsonFieldValues: JSON): Update;

		/**
		 * Use Functions
		 * 
		 * Usage:
		 * 
		 * MD5, SHA,...
		 */
		useFunction(columnId: string, funName: string): Update;

		where(condition: string, ...values: string[]): Update;

		toString(): string;
	}

	/**
	 * Insert Table
	 */
	interface Insert extends Base {

		into(tableName: string): Insert;

		/**
		 * single field
		 */
		set(field: string, fieldValue: string): Insert;

		/**
		 * single row
		 */
		setFieldsRow(jsonFieldValues: JSON): Insert;

		/**
		 * mutil rows
		 */
		setFieldsRows(jsonFieldValues: Array<JSON>): Insert;

		/**
		 * Use Functions
		 * 
		 * Usage:
		 * 
		 * MD5, SHA,...
		 */
		useFunction(columnId, funName): Insert;

		/**
		 * return sql statement
		 */
		toString(): string;
	}

	/**
	 * Delete Table
	 */
	interface Delete extends Base {

		from(tableName: string): Delete;

		where(condition: string, ...values: string[]): Delete;

		orderBy(orderBy: string, sortDirection?: string): Delete;

		limit(pageSize: number): Delete;

		/**
		 * return sql statement
		 */
		toString(): string;
	}


	export var Select: Select;
	export var Update: Update;
	export var Insert: Insert;
	export var Delete: Delete;
}

export = SqlGenerator;
