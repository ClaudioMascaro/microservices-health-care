const { DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } =
  process.env

const postgres = {
  database: DATABASE_NAME,
  dialect: 'postgres',
  host: DATABASE_HOST,
  password: DATABASE_PASSWORD,
  username: DATABASE_USERNAME,
}

export default postgres
