import dotenv from 'dotenv';

console.log('No value for FOO yet:', process.env.FOO);
console.log('ENV IS:', process.env);
console.log('NODE EnV is:', process.env.NODE_ENV);
console.log('RAILWAY_ENVIRONMENT EnV is:', process.env.RAILWAY_ENVIRONMENT);

if (process.env.RAILWAY_ENVIRONMENT !== 'production') {
  const dotenvResult = dotenv.config();
  console.log('========================xxxx', dotenvResult);

  // if (dotenvResult.error) {
  //   throw dotenvResult.error;
  // }
}

export const { PORT, JWT_SECRET, JWT_EXPIRATION_MINUTES, DBURL, JWT_BEARER } =
  process.env;
