const mysql = require('mysql2')

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "1234",
database:"test_schema" 
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
  
    console.log('Connected to MySQL as ID ' + db.threadId);
  });

module.exports = db;