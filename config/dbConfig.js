const dbConfig = {
    HOST: 'localhost',
    USER: 'ccklos-admin',
    PASSWORD: 'Cckl0s@dmin101',
    DB: 'cckl_database',
    dialect: 'mysql',
    dialectOptions: {
        // Set the SQL mode to remove only_full_group_by
        multipleStatements: true,
        options: {
          enableArithAbort: true,
          sql_mode: 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION',
        },
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
module.exports = dbConfig;

// ----------------------------------------------------------

//* db config for docker compose 
// const dbConfig = {
//     HOST: 'cckl_mysql',
//     USER: 'cckl_admin',
//     PASSWORD: 'cckl_root',
//     DB: 'cckl_database',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// }
// module.exports = dbConfig;
