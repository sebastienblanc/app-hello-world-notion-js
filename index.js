const { Notion } = require("@neurosity/notion");
require('dotenv').config();

const deviceId = process.env.DEVICE_ID || "";
const email = process.env.EMAIL || "";
const password = process.env.PASSWORD || "";

const verifyEnvs = (email, password, deviceId) => {
  const invalidEnv = (env) => {
    return (env === "");
  }
  if (invalidEnv(email) || invalidEnv(password) || invalidEnv(deviceId)) {
      console.error("Please verify deviceId, email and password are in .env file, quitting...");
      process.exit(0);
  }
}
verifyEnvs(email, password, deviceId);
//console.log(`${email} attempting to authenticate with ${deviceId}`);

const notion = new Notion({
  deviceId
});

const main = async () => {
  await notion.login({
    email,
    password
  })
  .catch(error => {
    console.log(error);
    throw new Error(error);
  });
  console.log("Logged in");

  notion.kinesis("leftThumbFinger").subscribe((intent) => {
    if(intent.predictions[0].probability > 0.99) {
    console.log("leftThumbFinger " + intent.predictions[0].probability );
      }
  });

  
  

 
}

main();