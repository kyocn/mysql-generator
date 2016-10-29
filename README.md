# MySql Generator
A Library which to generate mysql statements.

## Getting started
- Make sure you have [mysql-generator](https://github.com/kyocn/mysql-generator) installed:
    `npm install mysql-generator`
- Usage: `const sqlHelper = require('mysql-generator');`
- Four Class: select, insert, update, delete

##Examples
- select
     
    ``` js
    const sqlHelper = require('mysql-generator');
    let selectSql = sqlHelper
        .Select
        .from('user', 'u')
        .leftJoin('company', 'c', 'u.companyId = c.id')
        .field('u.name')
        .field('c.name', 'companyName')
        .where('u.id = ?', 22)
        .toString();
    console.log(selectSql);
    //SELECT u.name, c.name AS companyName FROM `user` AS u LEFT JOIN `company` AS c ON u.companyId = c.id WHERE u.id = 22;
    
    ```

- update

    ``` js

    let updateSql = sqlHelper
        .Update
        .table('user')
        .set('password', 'abcd')
        .setFields({
            name: 'kyo'
        })
        .useFunction('password', 'MD5')
        .where('id IN (?)', [1, 2, 3])
        .toString();
    console.log(updateSql);
    //UPDATE `user` SET password = MD5('abcd'), name = 'kyo' WHERE id IN (1, 2, 3);

    ```

- insert

    ``` js

    let insertSql = sqlHelper
        .Insert
        .into('user')
        .set('name', 'kyo')
        .setFieldsRow({
            sex: 1,
            age: 20,
            email: 'some@qq.com',
            password: 'abcd'
        })
        .useFunction('password', 'SHA')
        .toString();
    console.log(insertSql);
    //INSERT INTO `user` (name, sex, age, email, password) VALUES ('kyo', 1, 20, 'some@qq.com', SHA('abcd'));

    insertSql = sqlHelper
        .Insert
        .into('user')
        .setFieldsRows([{
            sex: 1,
            age: 20,
            email: 'some1@qq.com',
            password: 'abcd'
        }, {
            sex: 0,
            age: 18,
            email: 'some2@qq.com',
            password: 'hjkl'
        }])
        .useFunction('password', 'MD5')
        .toString();
    console.log(insertSql);
    //INSERT INTO `user` (sex, age, email, password) VALUES (1, 20, 'some1@qq.com', MD5('abcd')),  (0, 18, 'some2@qq.com', MD5('hjkl'));

    ```

- delete

    ``` js

    let deleteSql = sqlHelper
        .Delete
        .from('user')
        .where('id IN (?)', [1, 2, 3])
        .toString();
    console.log(deleteSql);
    //DELETE FROM user WHERE id IN (1, 2, 3);

    ```

##Testing

We prepare some test, coming soon.

##Contributing

Contributors are welcome, please fork and send pull requests! If you have any ideas on how to make this project better then please submit an issue.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)