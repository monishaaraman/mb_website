const { Pool } = require('pg'); // PostgreSQL library
const fs = require('fs'); // File system module
const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = 8000;

//-------------------  DB -----------------//
// PostgreSQL database configuration
const pool = new Pool({
    user: 'postgres',
    host: '10.16.58.229',
    database: 'benchmark_db',
    password: '1234',
    port: 5432,
});

// SQL query to retrieve data
const query = 'SELECT sys_name, bn, value1 FROM dummy.fio '; // Replace with your SQL query

pool.query(query, (err, result) => {
    if (err) {
        console.error('Error executing SQL query:', err);
        pool.end(); // Close the database connection
        return;
    }

    const data = result.rows; // Retrieve the data from the query result
    const jsonData = JSON.stringify(data, null, 2); // Convert data to JSON format with 2-space indentation

    // Write JSON data to a file named data.json
    fs.writeFile('data.json', jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing JSON to file:', err);
        } else {
            console.log('JSON data saved to data.json');
        }
        pool.end(); // Close the database connection
    });
});


//------------------- DB -----------------//

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


// execute disk benchmark
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


// ... (existing code)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
