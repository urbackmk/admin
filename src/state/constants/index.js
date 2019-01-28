export const firebaseUrl = process.env.NODE_ENV === "production" ? process.env.APP_CLIENT_DATABASE_URL : process.env.APP_TESTING_DATABASE_URL;
console.log(firebaseUrl)