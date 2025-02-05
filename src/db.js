import pg  from 'pg'


export const pool  = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "abcd",
  
    database: "enulab",
  
    port: "5432"
})
