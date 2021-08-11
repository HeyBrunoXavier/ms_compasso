module.exports = {
	client: process.env.DB_TYPE || "pg",
	connection: {
		host: process.env.DB_HOST || "127.0.0.1",
		database: process.env.DB_NAME || "ms_compasso",
		user: process.env.DB_USER || "postgres",
		password: process.env.DB_PASS || "admin",
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		tableName: 'knex_migrations'
	}
  };