import dotenv from 'dotenv';

const dotenvResult = dotenv.config();
console.log('========================xxxx', dotenvResult);

if (dotenvResult.error) {
  throw dotenvResult.error;
}

export const { PORT, JWT_SECRET, JWT_EXPIRATION_MINUTES, DBURL, JWT_BEARER } =
  process.env;
