const express = require("express");
const PDFDocument = require("pdfkit");
//const fs = require('fs');
const multer = require('multer');
const mysql = require("mysql2");
const Pdfmake = require('pdfmake');
//const exphbs = require('express-handlebars');

const mysqlPormise = require('mysql2/promise') // you import this package when you want to use execute function with the connection
//const app = express();
const router = express.Router();
//const { Router } = require("express");
//const app = require("../..");



                


//module.exports =  app;




  




//const storage = multer.diskStorage({
   // destination: (req, file, cb) => {
    //  cb(null, "./uploads")
    //},
    //filename: (req, file, cb) => {
      //cb(null, Date.now() + "-" + file.originalname)
    //},
  //})

  //const upload = multer({ storage: storage })
//const connection = mysql.createConnection({
  //  host: "localhost",
    //user: "root",
    //password: "",
    //database: "test1_db",
    //});
    //connection.connect((err) => {
      //  if (err) return console.error(err.message);
        //console.log("Connected to the MySQL database.");
        //});
        





const storage = multer.memoryStorage();

//const upload = multer({
  //storage,
  //limits: { fileSize: 1000000 }, // limit file size to 1 MB
  //fileFilter: (req, file, cb) => {
    //if (file.mimetype.startsWith('image/')) {
      //cb(null, true);
    //} else {
      //cb(new Error('File type not allowed.'));
    //}
  //}
//});
// 
//app.post('/add', upload.single('image'), (req, res) => {
 //const { nom, prenom, email, specialite } = req.body;
  //const image = req.file.buffer;

  //const query = 'INSERT INTO students (nom, prenom, email, image,specialite) VALUES (?, ?, ?, ?, ?)';
  //const params = [nom, prenom, email, specialite,image];

 // connection.query(query, params, (error, results, fields) => {
   // if (error) throw error;

    //console.log('Student record inserted successfully!');
    //res.send('Student record inserted successfully!');
  //});
//});

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test1_db'
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // limit file size to 1 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed.'));
    }
  }
});



//const upload = multer({ dest: 'uploads/' });
router.post('/add', upload.single('image'), (req, res) => {
  // Get the student data from the request body
  const { nom, prenom, email, specialite } = req.body;

  // Get the path of the uploaded image file
  const image = req.file.buffer;

  // Read the contents of the image file into a buffer


  // Create a MySQL connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).send('Error connecting to database');
    } else {
      // Insert the student data and image into the database
      connection.query('INSERT INTO students (nom, prenom, email, specialite, image) VALUES (?, ?, ?, ?, ?)', [nom, prenom, email, specialite, image], (err, result) => {
        if (err) {
          console.log(err.message);
          res.status(500).send('Error uploading student to database');
        } else {
          res.send('Student uploaded successfully');
        }

        // Release the connection back to the pool
        connection.release();
      });
    }
  });
});


    
        router.post('/upload', upload.single('file'), (req, res) => {
            if (!req.file) {
             return res.status(400).send('No file uploaded.');
            }
            const pdfLink = `uploads/${req.file.filename}`;
            console.log(pdfLink)
            res.send("file uploaded")
    
    
            connection.query(
                'INSERT INTO table_name (pdf_column) VALUES (?)',
                [pdfLink],
                (error, results) => {
                  if (error) throw error;
                  res.send('PDF uploaded and link stored in database successfully.');
                }
              );
            });
    //this is nothing but a regular comment
           router.get('/download/:pdf_id', (req, res) => {
                connection.query(
                  'SELECT pdf_column FROM table_name WHERE id = ?',
                 [req.params.pdf_id],
                  (error, results) => {
                   if (error) throw error;
                    if (!results.length) {
                      return res.status(404).send('PDF not found.');
                    }
              
                    const pdfPath = results[0].pdf_column;
                    res.download(pdfPath);
                  }
                );
              });
              
              //app.listen(8080, () => {
               // console.log('Server running on port 3000.');
              //});

             
              const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: "",
                database: 'test1_db'
                });
                              
                //connection.connect();
                
                
                 
                connection.connect((err) => {
                  if (err) {
                    console.error("Error connecting to database: " + err.stack);
                    return;
                  }
                  console.log("Connected to database.");
                });




// generate a pdf //////////////nouveau//////////////////////////////////////////////////
 // Create PDF document
 connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});


router.get('/students-pdf', (req, res) => {
  
  students =  connection.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving student data from database.');
      return;
    }
  //[
    //{ nom: "ahmed", prenom: "ashour", email: "ahmed@yahoo.com", specialite: "fdf", image: "dad" },
    //{ nom: "rima", prenom: "achour", email: "rima@gmail.com", specialite: "fdf", image: "dad" },
    //{ nom: "ali", prenom: "mohamed", email: "ali@yahoo.com", specialite: "fdf", image: "dad" },
    //{ nom: "mohamed", prenom: "hussein", email: "mohamed@gmail.com", specialite: "fdf", image: "dad" },
 // ]
  const docDefinition = {
    content: [
      {
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
            ['nom', 'prenom', 'email', 'specialite', 'image'],
            ...results.map(student => [student.nom, student.prenom, student.email, student.specialite, student.image])
          ],
          // widths: ['auto', 'auto'], // define the column widths
          // set the minimum width of the first column to 50
          columnStyles: {
            0: {
              minWidth: 30
            }
          }
        }
      }
    ]

    // content: [
    //   {
    //     table: {
    //       body: [
    //         ['Column 1', 'Column 2'],
    //         ['Row 1, Column 1', 'Row 1, Column 2'],
    //         ['Row 2, Column 1', 'Row 2, Column 2']
    //       ],
    //       widths: ['auto', 'auto'], // define the column widths
    //       // set the minimum width of the first column to 50
    //       columnStyles: {
    //         0: {
    //           minWidth: 50
    //         }
    //       }
    //     }
    //   }
    // ]
  };

  var fonts = {
    Roboto: {
      normal: 'fonts/roboto/Roboto-Regular.ttf',
      bold: 'fonts/roboto/Roboto-Medium.ttf',
      italics: 'fonts/roboto/Roboto-Italic.ttf',
      bolditalics: 'fonts/roboto/Roboto-MediumItalic.ttf'
    }
  };


  let pdfMake = new Pdfmake(fonts);

  const pdfDoc = pdfMake.createPdfKitDocument(docDefinition);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=students.pdf');
  pdfDoc.pipe(res);
  pdfDoc.end()
});})



//generate By iD 





//doc.text("Table Data:");
    //doc.moveDown();
    //doc.table({
      //headers: Object.keys(results[0]),
      //rows: results.map((row) => Object.values(row)),
    //});

    // End the PDF document and close the HTTP response
    



      
    
    
    //////////////////////////// partie crud etudiant  ////////////////////////////////////////////////////

    // Create a new student
    router.post('/students', (req, res) => {
      const {nom,prenom,email,specialité  } = req.body;
      const sql = `INSERT INTO students (nom, prenom, email, specialité) VALUES ('${nom}', '${prenom}', '${email}','${specialité}')`;
      
      connection.query(sql, (error, results) => {
        if (error) throw error;
        res.send('Student added successfully.');
      });
    });
    
   
router.get('/students', (req, res) => {
  connection.query('SELECT * FROM students', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Retrieve a single student by id
router.get('/students/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM students WHERE id = ?', id, (error, results) => {
    if (error) throw error;
    res.send(results[0]);
  });
});

// Update a student by id
router.put('/students/:id', (req, res) => {
  const id = req.params.id;
  const student = req.body;
  connection.query('UPDATE students SET ? WHERE id = ?', [student, id], (error, results) => {
    if (error) throw error;
    res.send(`Student updated with ID: ${id}`);
  });
});

// Delete a student by id
router.delete('/students/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM students WHERE id = ?', id, (error, results) => {
    if (error) throw error;
    res.send(`Student deleted with ID: ${id}`);
  });
});


///hello 


module.exports = router;
    
    
    
    
    
    
    
    
    
      












