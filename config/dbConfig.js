const dbConfig = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'password',
    DB: 'cckl_database',
    dialect: 'mysql',
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
