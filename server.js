const { Pool } = require('pg'); // PostgreSQL library
const fs = require('fs'); // File system module
const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8000;


//-------------------  -----------------//

// Endpoint to check if the "BENCH" executable file exists
app.get('/check_bench_executable', (req, res) => {
    const benchPath = '/usr/share/microbenchmark/BENCH'; // Modify this path accordingly

    fs.access(benchPath, fs.constants.F_OK, (err) => {
        if (err) {
            // "BENCH" executable doesn't exist
            res.sendStatus(404);
        } else {
            // "BENCH" executable exists
            res.sendStatus(200);
        }
    });
});



// Serve static files from the public directory
app.use(express.static('public'));

//-------------------  DB -----------------//
// PostgreSQL database configuration

const pool = new Pool({
   user: 'postgres',
   host: '10.15.217.211',
   database: 'benchmark_db',
   password: '1234',
   port: 5432,
});



//-----------------Disk result insert function--------------------//
function insertJsonData_disk(jsonData) {
    try {
        // Check if jsonData is a string and parse it, otherwise use it directly
        const results = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
        console.log('Results:', results); // Log the results array

        if (!Array.isArray(results)) {
            console.error('Invalid or missing results data');
            return;
        }

        const query = 'INSERT INTO disk.disk_table (sys_name, benchmark, time_ms, cpu_ms, iterations, averageread_mib_s, averagewrite_mib_s) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        
        const queryPromises = results.map(result => {
            const updatedResult = {};
            Object.keys(result).forEach(key => {
                updatedResult[key.trim()] = result[key].trim();
            });

            const values = [
                updatedResult['System Model Name'],
                updatedResult['Benchmark'],
                parseFloat(updatedResult['Time  (ms)']),
                parseFloat(updatedResult['CPU   (ms)']),
                parseInt(updatedResult['Iterations']),
                parseFloat(updatedResult['Average Read (in MiB/s)']),
                parseFloat(updatedResult['Average Write (in MiB/s)']),
            ];

            return pool.query(query, values);
        });

        Promise.all(queryPromises)
            .then(() => {
                console.log('JSON data successfully inserted');
                 const btn = document.querySelector("button_save");

// btn.classList.add("button--loading");
               btn.classList.remove("button_save--loading");
            })
            .catch(err => {
                console.error('Error executing query', err);
            });

    } catch (error) {
        console.error('Error inserting JSON data', error);
    }
}

// Assuming you're calling this function with the JSON data
// insertJsonData(yourJsonData);

app.use(bodyParser.json());




//-----------------Disk save button api--------------------//
app.post('/saveResults-disk', (req, res) => {
   
    const results = req.body.results;
    console.log("saved results:"+results);
        if (!results || !Array.isArray(results)) {
            return res.status(400).json({ error: 'Invalid or missing results data' });
        }
        // Call the function with your JSON data
        insertJsonData_disk(results);
        res.status(200).json({ success: true });
});

// // Properly close the pool when your application is shutting down
// process.on('SIGINT', () => {
//     pool.end().then(() => {
//         console.log('Pool has been closed gracefully');
//         process.exit(0);
//     });
// });




//-----------------microbenchmark folder exists checking api--------------------//
// Endpoint to check if the "microbenchmark" folder exists
app.get('/check_microbenchmark', (req, res) => {
    const folderPath = '/usr/share/microbenchmark'; // Modify this path accordingly

    fs.access(folderPath, fs.constants.F_OK, (err) => {
        if (err) {
            // Folder doesn't exist
            res.sendStatus(404);
        } else {
            // Folder exists
            res.sendStatus(200);
        }
    });
});

//-----------------Clone and build microbenchmark folder api--------------------//
// Endpoint to clone the repository and build it
app.get('/clone_and_build_microbenchmark', (req, res) => {
    const cloneCommand = 'sudo git clone https://github.com/monishaaraman/microbenchmark.git /usr/share/microbenchmark'; // Modify the clone command and path accordingly
    const buildCommands = [
        'cd /usr/share/microbenchmark',
        'sudo cmake .',
        'sudo make'
    ];

    exec(cloneCommand, (cloneError, cloneStdout, cloneStderr) => {
        if (cloneError) {
            console.error(`Error cloning repository: ${cloneError}`);
            res.status(500).json({ success: false, message: 'Failed to clone repository.' });
        } else {
            console.log(`Repository cloned: ${cloneStdout}`);

            // Execute build commands
            exec(buildCommands.join(' && '), (buildError, buildStdout, buildStderr) => {
                if (buildError) {
                    console.error(`Error building repository: ${buildError}`);
                    res.status(500).json({ success: false, message: 'Failed to build repository.' });
                } else {
                    console.log(`Repository built: ${buildStdout}`);
                    res.status(200).json({ success: true, message: 'Repository cloned and built successfully.' });
                }
            });
        }
    });
});


// --------------------------execute disk benchmark------------------------------------//
app.get('/rundiskbenchmark', (req, res) => {
   
 const runCommands = [
        'cd /usr/share/microbenchmark',
        'sudo ./BENCH disk'
    ];
  
    exec(runCommands.join(' && '), (runError, runStdout, runStderr) => {
        console.error(`running disk...`);
      if (runError) {
        console.error(`Error: ${runError.message}`);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      console.log(`stdout: ${runStdout}`);
      console.error(`stderr: ${runStderr}`);

      // Parse the benchmark results and update the table
     
// Parse the benchmark results on the server side
const parsedResults = parseBenchmarkResults(runStdout);

console.log("\n------------parsedResults\n");
console.log(parsedResults);
// Send the parsed results to the client
res.json({ success: true, results: parsedResults });
    });
  });
  
  function parseBenchmarkResults(runStdout) {
    const parsedResults = [];
    let currentResult = {};

    // Split the output into lines
    const lines = runStdout.split('\n').map(line => line.trim());

    // Find the indices for the relevant lines
    const startIndex = lines.findIndex(line => line.includes("######## BENCHMARK RESULTS ########"));
    const endIndex = lines.findIndex(line => line.includes("######## END ########"));

    if (startIndex !== -1 && endIndex !== -1) {
        // Extract lines between "######## BENCHMARK RESULTS ########" and "######## END ########"
        const relevantLines = lines.slice(startIndex + 1, endIndex);
        console.log("\n------------relevantLines\n");
        console.log(relevantLines);
        relevantLines.forEach(line=> {
            const match = line.match(/([^:]+):([^]*)/);
            console.log("\n------------match\n");
            console.log(match);
            if (match) {
                const key = match[1];
                const value = match[2];
    
                // Update the current result object
                currentResult[key] = value;
            } else if (Object.keys(currentResult).length > 0) {
                // If a non-empty result object exists, push it to the parsedResults array
                parsedResults.push(currentResult);
                currentResult = {};
            }
        });
    
        // Add the last result if any
        if (Object.keys(currentResult).length > 0) {
            parsedResults.push(currentResult);
        }

    return parsedResults;
}
  }





  // Add a new endpoint to fetch data for comparison
  app.get('/getComparisonData-disk', (req, res) => {
    const query = 'SELECT id, sys_name, benchmark, averageread_mib_s, averagewrite_mib_s FROM disk.disk_table';

    pool.query(query, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const data = result.rows;
        res.json({ success: true, data: data });
    });
});

// script.js






// Add a new endpoint to fetch data for chart generation
app.post('/getChartData', (req, res) => {
    const selectedSerialNo = req.body.selectedSerialNo; // Assuming you send the selected serial number in the request body
    console.log("selectedSerialNo= "+selectedSerialNo);
    const query = 'SELECT averageread_mib_s, averagewrite_mib_s FROM disk.disk_table WHERE id= $1';

    pool.query(query, [selectedSerialNo], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const chartData = {
            averageread_mib_s: result.rows[0].averageread_mib_s,
            averagewrite_mib_s: result.rows[0].averagewrite_mib_s,
        };

        res.json({ success: true, data: chartData });
    });
});



// ... (existing code)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
