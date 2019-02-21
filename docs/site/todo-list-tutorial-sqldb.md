---
lang: en
title: 'Running on relational database'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/en/lb4/todo-list-tutorial-sqldb.html
summary:
  LoopBack 4 TodoList Application Tutorial - Running on Relational Database
---

If you are running this example using a relational database, here are the extra
steps. PostgreSQL is used for illustration, it works in a similar way in other
relational databases.

### Create a new datasource

Run `lb4 datasource`. Specify the datasource name as `psqlds` and select
`PostgreSQL` as the connector.

```sh
$ lb4 datasource
? Datasource name: psqlds
? Select the connector for psqlds:
  Redis key-value connector (supported by StrongLoop)
  MongoDB (supported by StrongLoop)
  MySQL (supported by StrongLoop)
❯ PostgreSQL (supported by StrongLoop)
  Oracle (supported by StrongLoop)
  Microsoft SQL (supported by StrongLoop)
  REST services (supported by StrongLoop)
  ...
```

### Update the Repository classes using the new datasource

The Repository classes are used to bind the datasource and the models. Since
we've changed to another datasource, we need to update the repositories which
are located in the `src\repositories` folder.

In `todo.repository.ts`, inject the new datasource in the constructor as below:

```ts
constructor(
    @inject('datasources.psqlds') dataSource: juggler.DataSource,
    @repository.getter('TodoListRepository')
    protected todoListRepositoryGetter: Getter<TodoListRepository>,
  ) {
```

Make the same changes in `todo-list.repository.ts` and
`todo-list-image.repository.ts`.

### Create tables using `npm run migrate` command

Run the following commands to create the corresponding tables in the database.

```sh
$ npm run build
$ npm run migrate
```

Now, the database tables are created.

```
testdb=# \dt
           List of relations
 Schema |     Name      | Type  | Owner
--------+---------------+-------+-------
 public | todo          | table | root
 public | todolist      | table | root
 public | todolistimage | table | root
```

For details, see the [Database migrations](Database-migrations.md) documentation
page.

### Alter tables to define the foreign keys

{% include note.html content="This step is needed due to the limitation captured in [#2332](https://github.com/strongloop/loopback-next/issues/2332)
" %}

Let's alter the tables to specify the `todolistid` as the foreign key of the
`todolist` table.

1. `todo` table

Run this command:

```
ALTER TABLE todo ADD CONSTRAINT constraint_listid FOREIGN KEY (todolistid) REFERENCES todolist (id);
```

As a result, the table definition should look like below:

```
testdb=# \d todo
                  Table "public.todo"
   Column   |  Type   | Collation | Nullable | Default 
------------+---------+-----------+----------+---------
 id         | integer |           | not null | 
 title      | text    |           | not null | 
 desc       | text    |           |          | 
 iscomplete | boolean |           |          | 
 todolistid | integer |           |          | 
Indexes:
    "todo_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "constraint_listid" FOREIGN KEY (todolistid) REFERENCES todolist(id)
```

2. `todolistimage` table

Run this command:

```
ALTER TABLE todolistimage ADD CONSTRAINT constraint_listid FOREIGN KEY (todolistid) REFERENCES todolist (id);
```

As a result, the table definition should look like below:

```
testdb=# \d todolistimage
             Table "public.todolistimage"
   Column   |  Type   | Collation | Nullable | Default 
------------+---------+-----------+----------+---------
 id         | integer |           | not null | 
 todolistid | integer |           |          | 
 value      | text    |           | not null | 
Indexes:
    "todolistimage_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "constraint_listid" FOREIGN KEY (todolistid) REFERENCES todolist(id)
```
