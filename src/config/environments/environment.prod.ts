export const environment = {
  name: "default",
  host: process.env.DB_HOST || "http://localhost" ,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_DATABASE || 'admin',
  schema: process.env.DB_SCHEMA || 'admin',
  entities: "./dist/modules/**/models/*.js",
  baseURl: process.env.BASE_URL || "http://localhost",
};
