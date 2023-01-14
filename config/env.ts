import dotenv from 'dotenv';

// const dotenvResult = dotenv.config();
// console.log('========================xxxx', dotenvResult);

// if (dotenvResult.error) {
//   throw dotenvResult.error;
// }

console.log('No value for FOO yet:', process.env.FOO);

if (process.env.NODE_ENV !== 'production') {
  const dotenvResult = dotenv.config();
  console.log('========================xxxx', dotenvResult);

  if (dotenvResult.error) {
    throw dotenvResult.error;
  }
}

console.log('Now the value for FOO is:', process.env.FOO);

export const { PORT, JWT_SECRET, JWT_EXPIRATION_MINUTES, DBURL, JWT_BEARER } =
  process.env;
