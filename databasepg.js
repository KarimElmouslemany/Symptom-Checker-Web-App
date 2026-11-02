require("dotenv").config();
const { Client } = require("pg");
const router = require("./AI_server");
const bcrypt = require("bcrypt");

const client = new Client({
  host: "localhost",
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

client.connect();

async function main_database(email, password, type) {
  console.log("main database function trigred");
  let message = null;
  let checker_user = null;
  if (type == "get") {
    message = await GetUser(email, password);
    console.log(
      "this the message ( inside the database file): ",
      message.messageJSON,
    );
    return message;
  } else if (type == "creat") {
    let hashed_passowrd = await hashing_process(password);
    checker_user = await checkuserexist(email);
    console.log("this the check_useer function: ", checker_user);
    if (checker_user == false) {
      creatUser(email, hashed_passowrd);
    } else {
      console.log("this email exist ");
    }
  } else {
    console.log("something is wrong with hashing");
  }
}

async function checkuserexist(Email) {
  let checker = null;
  const query = ` SELECT EXISTS
    (SELECT 1 FROM Users WHERE email = $1)`;
  checker = await client.query(query, [Email]);
  console.log("checker is", checker.rows);
  return checker.rows[0].exists;
}
async function hashing_process(password) {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("this is the ", salt);
    const hashed_password = await bcrypt.hash(password, salt);
    console.log("this the length of the password ", hashed_password.length);
    if (hashed_password.length == 0) {
      return "there is no hashiing password";
    } else {
      return hashed_password;
    }
  } catch (err) {
    return err.message;
  }
}
async function GetUser(Email, password) {
  let database_output = null;
  let hashed_passowrd_checker = null;
  try {
    const query = `SELECT email,password FROM Users 
    WHERE email = $1;`;
    database_output = await client.query(query, [Email]);
    //  console.log(database_output);
    if (database_output.rowCount === 0) {
      return {
        messageJSON: `Invalid email or password`,
        checker: false,
        debugger:
          "user does not exist error occured in database_output.row count",
      };
    } else {
      hashed_passowrd_checker = await check_hash_password(
        database_output.rows[0].password,
        password,
      );
      console.log("hashed passwored checker", hashed_passowrd_checker);
      return{messageJSON: "",
        checker: true,
        debugger: "nothing to debuge",
      }
      
    }
  } catch (err) {
    console.log(err.message);
  }
}
async function check_hash_password(hashed_passowrd, users_password) {
  return bcrypt.compare(users_password, hashed_passowrd);
}
function creatUser(email, password) {
  console.log("creat user function triggred");
  const query = `INSERT INTO Users (Email, password)
  VALUES ($1, $2)
`;
  client.query(query, [email, password], (err, res) => {
    if (!err) {
      console.log(res.rows);
    } else {
      console.log(err.message);
    }
  });
}
module.exports = { client, main_database };
