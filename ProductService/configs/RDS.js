'use strict'
const { PG_HOST: host, PG_PORT: port, PG_DATABASE: database, PG_USERNAME: user, PG_PASSWORD: password } = process.env;

export const dbConfig = {
  host,
  port,
  database,
  user,
  password,
  ssl: {
    rejectUnauthorized: false
  },
  _connectionTimeoutMillis: 5000,
}
