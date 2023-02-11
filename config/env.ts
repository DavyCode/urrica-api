import dotenv from 'dotenv';

if (process.env.RAILWAY_ENVIRONMENT !== 'production') {
  const dotenvResult = dotenv.config();
  // if (dotenvResult.error) {
  //   throw dotenvResult.error;
  // }
}

export const {
  HOST,
  PORT,
  JWT_SECRET,
  JWT_EXPIRATION_MINUTES,
  JWT_BEARER,
  DBURL,
  API_BASE_URI,
  NODE_ENV,
  PLATFORM_ENVIRONMENT,
  ENVIRONMENT,
  // aws
  ACCESS_AWS_KEY_ID,
  SECRET_AWS_ACCESS_KEY,
  BUCKET_AWS_REGION,
  SES_AWS_CONFIG_SET,
  MAILER_FROM_OPTION,
  LOGS_MAIL,
} = process.env;
