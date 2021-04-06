const Database = require('config')

Database()

Database.exec(
    `CREATE TABLE profile(
        cpf INT PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
    )`
)
Database.exec(
    `CREATE TABLE jobs(
        id INT PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
    )`
)

Database.run(
    `INSERT INTO profile(
        name,
        avatar,
        monthly_budget,
        days_per_week,
        hours_per_day,
        vacation_per_year,
    ) VALUES(
        "luis",
        "ttps://avatars.githubusercontent.com/u/75910800?v=4",
        3000,
        5,
        5,
        4
    )`
)

Database.run(
    `INSERT INTO Jobs(
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES(
        "Pizzaria Guloso",
        2,
        1,
        1617514376018
    )`
)
Database.run(
    `INSERT INTO Jobs(
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES(
        "One Two Project",
        3,
        47,
        1617514376018
    )`
)
Database.close()
