import pg  from 'pg'


export const pool  = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "enulab",
    port: "5432" /*5434*/
})
