import pg  from 'pg'


export const pool  = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "Campos0430",
    database: "enulab",
    port: "5433"
})
