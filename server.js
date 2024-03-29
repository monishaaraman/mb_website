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
// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

//-------------------  DB -----------------//
// PostgreSQL database configuration

const pool = new Pool({
   user: 'postgres',
   host: 'zlabs-lapos-m1.csez.zohocorpin.com',
   database: 'benchmark_db',
   password: '1234   ',
   port: 5432,
});

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-------------- DB FOR DISK ------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//const query = 'INSERT INTO disk.fio_random (sys_name, benchmark, time_ms, cpu_ms, iterations, average_read_mibs, average_write_mibs) VALUES ($1, $2, $3, $4, $5, $6, $7)';


function insertJsonData_disk(jsonData) {
    try {
        const results = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
        console.log('Results:', results);

        if (!Array.isArray(results)) {
            console.error('Invalid or missing results data');
            return;
        }

        results.forEach(result => {
            const updatedResult = {};
            Object.keys(result).forEach(key => {
                updatedResult[key.trim()] = result[key].trim();
            });


            console.log('Updated Result:', updatedResult);
            const benchmarkName = updatedResult['Benchmark'];
            /*const values = [
                updatedResult['System Model Name'],
                parseFloat(updatedResult['Time  (ms)']),
                parseFloat(updatedResult['CPU   (ms)']),
                parseInt(updatedResult['Iterations'])
            ];*/
            //console.log('Parsed values:', values); // Add this line for logging

            let query;
            let columns;

            if (benchmarkName === 'Fio-Random') {
                //const averageRead = parseFloat(updatedResult['Average Read (in MiB/s)']);
                //const averageWrite = parseFloat(updatedResult['Average Write (in MiB/s)']);
    
    // Log the parsed values
               // console.log(`Average Read momo (Fio-Random): ${averageRead}, Average Write momo (Fio-Random): ${averageWrite}`);
               
               

query = 'INSERT INTO disk.fio_random (sys_name, benchmark, time_ms, cpu_ms, iterations, average_read_mibs, average_write_mibs) VALUES ($1, $2, $3, $4, $5, $6, $7)';
columns = [
    updatedResult['System Model Name'],
    updatedResult['Benchmark'],
    parseFloat(updatedResult['Time_ms']), // Adjusted key
    parseFloat(updatedResult['CPU_ms']), // Adjusted key
    parseInt(updatedResult['Iterations']),
    parseFloat(updatedResult['Average Read  (in MiB/s)']), // Adjusted key with extra space
    parseFloat(updatedResult['Average Write  (in MiB/s)']) // Adjusted key with extra space
];

               
            } else  if (benchmarkName === 'Fio-sequential') {
                
            
                query = 'INSERT INTO disk.fio_sequential (sys_name, benchmark, time_ms, cpu_ms, iterations, average_read_mibs, average_write_mibs) VALUES ($1, $2, $3, $4, $5, $6, $7)';
                columns = [
                    updatedResult['System Model Name'],
                    updatedResult['Benchmark'],
                    parseFloat(updatedResult['Time_ms']), // Adjusted key
                    parseFloat(updatedResult['CPU_ms']), // Adjusted key
                    parseInt(updatedResult['Iterations']),
                    parseFloat(updatedResult['Average Read  (in MiB/s)']), // Adjusted key with extra space
                    parseFloat(updatedResult['Average Write  (in MiB/s)']) // Adjusted key with extra space
                ];
            
            

            } else if (benchmarkName === 'BM_Compilebench') {
            
                query = 'INSERT INTO disk.compilebench (sys_name, benchmark, time_ms, cpu_ms, iterations, average_compile_mbs) VALUES ($1, $2, $3, $4, $5, $6)';
                columns = [
                    updatedResult['System Model Name'],
                    updatedResult['Benchmark'],
                    parseFloat(updatedResult['Time_ms']), // Adjusted key
                    parseFloat(updatedResult['CPU_ms']), // Adjusted key
                    parseInt(updatedResult['Iterations']),
                    parseFloat(updatedResult['Average Compile (in MB/s)']) // Key seems to match, adjust if necessary
                ];
            
            
            } else {
                console.error(`Unknown benchmark: ${benchmarkName}`);
                return;
            }

            pool.query(query, columns)
                .then(() => {
                    console.log(`JSON data for ${benchmarkName} successfully inserted`);
                })
                .catch(err => {
                    console.error(`Error executing query for ${benchmarkName}`, err);
                });
        });

    } catch (error) {
        console.error('Error inserting JSON data', error);
    }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! DB FOR MEMORY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 
 //const query = 'INSERT INTO disk.fio_random (sys_name, benchmark, time_ms, cpu_ms, iterations, average_read_mibs, average_write_mibs) VALUES ($1, $2, $3, $4, $5, $6, $7)';
 
 
 function insertJsonData_memory(jsonData) {
     try {
         const results = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
         console.log('Results:', results);
 
         if (!Array.isArray(results)) {
             console.error('Invalid or missing results data');
             return;
         }
 
         results.forEach(result => {
             const updatedResult = {};
             Object.keys(result).forEach(key => {
                 updatedResult[key.trim()] = result[key].trim();
             });
 
 
             console.log('Updated Result:', updatedResult);
             const benchmarkName = updatedResult['Benchmark'];
             /*const values = [
                 updatedResult['System Model Name'],
                 parseFloat(updatedResult['Time  (ms)']),
                 parseFloat(updatedResult['CPU   (ms)']),
                 parseInt(updatedResult['Iterations'])
             ];*/
             //console.log('Parsed values:', values); // Add this line for logging
 
             let query;
             let columns;
 
             if (benchmarkName === 'Benchmark_RAMSMP_INTmem') {
                 //const averageRead = parseFloat(updatedResult['Average Read (in MiB/s)']);
                 //const averageWrite = parseFloat(updatedResult['Average Write (in MiB/s)']);
     
     // Log the parsed values
                // console.log(`Average Read momo (Fio-Random): ${averageRead}, Average Write momo (Fio-Random): ${averageWrite}`);
                
                
 
 query = 'INSERT INTO memory.ramsmp_integer (sys_name, benchmark, time_ms, cpu_ms, iterations, average_integer_memory_mibs) VALUES ($1, $2, $3, $4, $5, $6)';
 columns = [
     updatedResult['System Model Name'],
     updatedResult['Benchmark'],
     parseFloat(updatedResult['Time_ms']), // Adjusted key
     parseFloat(updatedResult['CPU_ms']), // Adjusted key
     parseInt(updatedResult['Iterations']),
     parseFloat(updatedResult['Average Integer Memory (in MiB/s)']), // Adjusted key with extra space
 ];
 
                
             } else  if (benchmarkName === 'Benchmark_RAMSMP_FLOATmem') {
                 
             
                 query = 'INSERT INTO memory.ramsmp_float (sys_name, benchmark, time_ms, cpu_ms, iterations,  average_float_memory_mibs) VALUES ($1, $2, $3, $4, $5, $6)';
                 columns = [
                     updatedResult['System Model Name'],
                     updatedResult['Benchmark'],
                     parseFloat(updatedResult['Time_ms']), // Adjusted key
                     parseFloat(updatedResult['CPU_ms']), // Adjusted key
                     parseInt(updatedResult['Iterations']),
                     parseFloat(updatedResult['Average Float Memory (in MiB/s']), // Adjusted key with extra space
                 ];
             
             
 
             } else if (benchmarkName === 'BM_CacheBench') {
             
                 query = 'INSERT INTO memory.cachebench (sys_name, benchmark, time_ms, cpu_ms, iterations, average_cache_mibs) VALUES ($1, $2, $3, $4, $5, $6)';
                 columns = [
                     updatedResult['System Model Name'],
                     updatedResult['Benchmark'],
                     parseFloat(updatedResult['Time_ms']), // Adjusted key
                     parseFloat(updatedResult['CPU_ms']), // Adjusted key
                     parseInt(updatedResult['Iterations']),
                     parseFloat(updatedResult['Average Cache (in MiB/s)']) // Key seems to match, adjust if necessary
                 ];
             
             
             } else {
                 console.error(`Unknown benchmark: ${benchmarkName}`);
                 return;
             }
 
             pool.query(query, columns)
                 .then(() => {
                     console.log(`JSON data for ${benchmarkName} successfully inserted`);
                 })
                 .catch(err => {
                     console.error(`Error executing query for ${benchmarkName}`, err);
                 });
         });
 
     } catch (error) {
         console.error('Error inserting JSON data', error);
     }
 }
 
 //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! DB FOR NETWORK !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 
 //const query = 'INSERT INTO disk.fio_random (sys_name, benchmark, time_ms, cpu_ms, iterations, average_read_mibs, average_write_mibs) VALUES ($1, $2, $3, $4, $5, $6, $7)';
 
 
 function insertJsonData_network(jsonData) {
    try {
        const results = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
        console.log('Results:', results);

        if (!Array.isArray(results)) {
            console.error('Invalid or missing results data');
            return;
        }

        results.forEach(result => {
            const updatedResult = {};
            Object.keys(result).forEach(key => {
                updatedResult[key.trim()] = result[key].trim();
            });


            console.log('Updated Result:', updatedResult);
            const benchmarkName = updatedResult['Benchmark'];
            /*const values = [
                updatedResult['System Model Name'],
                parseFloat(updatedResult['Time  (ms)']),
                parseFloat(updatedResult['CPU   (ms)']),
                parseInt(updatedResult['Iterations'])
            ];*/
            //console.log('Parsed values:', values); // Add this line for logging

            let query;
            let columns;

            if (benchmarkName === 'BM_EthrBenchmark') {
                //const averageRead = parseFloat(updatedResult['Average Read (in MiB/s)']);
                //const averageWrite = parseFloat(updatedResult['Average Write (in MiB/s)']);
    
    // Log the parsed values
               // console.log(`Average Read momo (Fio-Random): ${averageRead}, Average Write momo (Fio-Random): ${averageWrite}`);
               
               

query = 'INSERT INTO network.ethr (sys_name, benchmark, time_ms, cpu_ms, iterations, average_bandwidth_bits_secs) VALUES ($1, $2, $3, $4, $5, $6)';
columns = [
    updatedResult['System Model Name'],
    updatedResult['Benchmark'],
    parseFloat(updatedResult['Time_ms']), // Adjusted key
    parseFloat(updatedResult['CPU_ms']), // Adjusted key
    parseInt(updatedResult['Iterations']),
    parseFloat(updatedResult['Average Bandwidth (bits/sec)']), // Adjusted key with extra space
];

               
            } else  if (benchmarkName === 'BM_SockperfLatencyUnderLoad') {
                
            
                query = 'INSERT INTO network.sockperf  (sys_name, benchmark, time_ms, cpu_ms, iterations,  average_latency_usec) VALUES ($1, $2, $3, $4, $5, $6)';
                columns = [
                    updatedResult['System Model Name'],
                    updatedResult['Benchmark'],
                    parseFloat(updatedResult['Time_ms']), // Adjusted key
                    parseFloat(updatedResult['CPU_ms']), // Adjusted key
                    parseInt(updatedResult['Iterations']),
                    parseFloat(updatedResult['Average Latency (in usec)']), // Adjusted key with extra space
                ];
            
            

            } else if (benchmarkName === 'iperf') {
            
                query = 'INSERT INTO network.iperf (sys_name, benchmark, time_ms, cpu_ms, iterations, average_receiver_bitrate_mbits_sec, average_sender_bitrate_mbits_sec) VALUES ($1, $2, $3, $4, $5, $6, $7)';
                columns = [
                    updatedResult['System Model Name'],
                    updatedResult['Benchmark'],
                    parseFloat(updatedResult['Time_ms']), // Adjusted key
                    parseFloat(updatedResult['CPU_ms']), // Adjusted key
                    parseInt(updatedResult['Iterations']),
                    parseFloat(updatedResult['Average Receiver Bitrate (Mbits/sec)']), // Key seems to match, adjust if necessary
                    parseFloat(updatedResult['Average Sender Bitrate (Mbits/sec)']) // Key seems to match, adjust if necessary
                ];
            
            
            } else {
                console.error(`Unknown benchmark: ${benchmarkName}`);
                return;
            }

            pool.query(query, columns)
                .then(() => {
                    console.log(`JSON data for ${benchmarkName} successfully inserted`);
                })
                .catch(err => {
                    console.error(`Error executing query for ${benchmarkName}`, err);
                });
        });

    } catch (error) {
        console.error('Error inserting JSON data', error);
    }
}


// Assuming you're calling this function with the JSON data
// insertJsonData(yourJsonData);

app.use(bodyParser.json());


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! DB FOR CPU !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 
 //const query = 'INSERT INTO disk.fio_random (sys_name, benchmark, time_ms, cpu_ms, iterations, average_read_mibs, average_write_mibs) VALUES ($1, $2, $3, $4, $5, $6, $7)';
 
 
 function insertJsonData_cpu(jsonData) {
    try {
        const results = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
        console.log('Results:', results);

        if (!Array.isArray(results)) {
            console.error('Invalid or missing results data');
            return;
        }

        results.forEach(result => {
            const updatedResult = {};
            Object.keys(result).forEach(key => {
                updatedResult[key.trim()] = result[key].trim();
            });


            console.log('Updated Result:', updatedResult);
            const benchmarkName = updatedResult['Benchmark'];
            /*const values = [
                updatedResult['System Model Name'],
                parseFloat(updatedResult['Time  (ms)']),
                parseFloat(updatedResult['CPU   (ms)']),
                parseInt(updatedResult['Iterations'])
            ];*/
            //console.log('Parsed values:', values); // Add this line for logging

            let query;
            let columns;

            if (benchmarkName === 'BM_CRayBenchmark') {
                //const averageRead = parseFloat(updatedResult['Average Read (in MiB/s)']);
                //const averageWrite = parseFloat(updatedResult['Average Write (in MiB/s)']);
    
    // Log the parsed values
               // console.log(`Average Read momo (Fio-Random): ${averageRead}, Average Write momo (Fio-Random): ${averageWrite}`);
               
               

query = 'INSERT INTO cpu.c_ray (sys_name, benchmark, time_ms, cpu_ms, iterations, average_rendering_time_seconds) VALUES ($1, $2, $3, $4, $5, $6)';
columns = [
    updatedResult['System Model Name'],
    updatedResult['Benchmark'],
    parseFloat(updatedResult['Time_ms']), // Adjusted key
    parseFloat(updatedResult['CPU_ms']), // Adjusted key
    parseInt(updatedResult['Iterations']),
    parseFloat(updatedResult['Average Rendering time (seconds)']), // Adjusted key with extra space
];

               
            } else  if (benchmarkName === 'BM_Blake2_Benchmark') {
                
            
                query = 'INSERT INTO cpu.blake_2  (sys_name, benchmark, time_ms, cpu_ms, iterations,  average_per_byte ) VALUES ($1, $2, $3, $4, $5, $6)';
                columns = [
                    updatedResult['System Model Name'],
                    updatedResult['Benchmark'],
                    parseFloat(updatedResult['Time_ms']), // Adjusted key
                    parseFloat(updatedResult['CPU_ms']), // Adjusted key
                    parseInt(updatedResult['Iterations']),
                    parseFloat(updatedResult['Average Per Byte (Cycles Per Byte)']), // Adjusted key with extra space
                ];
            
            

            } else if (benchmarkName === 'BM_SysbenchCPUBenchmark') {
            
                query = 'INSERT INTO cpu.sysbench (sys_name, benchmark, time_ms, cpu_ms, iterations, average_events_seconds) VALUES ($1, $2, $3, $4, $5, $6)';
                columns = [
                    updatedResult['System Model Name'],
                    updatedResult['Benchmark'],
                    parseFloat(updatedResult['Time_ms']), // Adjusted key
                    parseFloat(updatedResult['CPU_ms']), // Adjusted key
                    parseInt(updatedResult['Iterations']),
                    parseFloat(updatedResult['Average Events/s (seconds)']), // Key seems to match, adjust if necessary
                ];
            
            
            } else {
                console.error(`Unknown benchmark: ${benchmarkName}`);
                return;
            }

            pool.query(query, columns)
                .then(() => {
                    console.log(`JSON data for ${benchmarkName} successfully inserted`);
                })
                .catch(err => {
                    console.error(`Error executing query for ${benchmarkName}`, err);
                });
        });

    } catch (error) {
        console.error('Error inserting JSON data', error);
    }
}


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! DB FOR GPU !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 
 //const query = 'INSERT INTO disk.fio_random (sys_name, benchmark, time_ms, cpu_ms, iterations, average_read_mibs, average_write_mibs) VALUES ($1, $2, $3, $4, $5, $6, $7)';
 
 
 function insertJsonData_gpu(jsonData) {
    try {
        const results = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
        console.log('Results:', results);

        if (!Array.isArray(results)) {
            console.error('Invalid or missing results data');
            return;
        }

        results.forEach(result => {
            const updatedResult = {};
            Object.keys(result).forEach(key => {
                updatedResult[key.trim()] = result[key].trim();
            });


            console.log('Updated Result:', updatedResult);
            const benchmarkName = updatedResult['Benchmark'];
            /*const values = [
                updatedResult['System Model Name'],
                parseFloat(updatedResult['Time  (ms)']),
                parseFloat(updatedResult['CPU   (ms)']),
                parseInt(updatedResult['Iterations'])
            ];*/
            //console.log('Parsed values:', values); // Add this line for logging

            let query;
            let columns;

            if (benchmarkName === 'BM_UnigineHeavenBenchmark') {
                //const averageRead = parseFloat(updatedResult['Average Read (in MiB/s)']);
                //const averageWrite = parseFloat(updatedResult['Average Write (in MiB/s)']);
    
    // Log the parsed values
               // console.log(`Average Read momo (Fio-Random): ${averageRead}, Average Write momo (Fio-Random): ${averageWrite}`);
               
               

query = 'INSERT INTO gpu.unigine_heaven (sys_name, benchmark, time_ms, cpu_ms, iterations, average_fps) VALUES ($1, $2, $3, $4, $5, $6)';
columns = [
    updatedResult['System Model Name'],
    updatedResult['Benchmark'],
    parseFloat(updatedResult['Time_ms']), // Adjusted key
    parseFloat(updatedResult['CPU_ms']), // Adjusted key
    parseInt(updatedResult['Iterations']),
    parseFloat(updatedResult['Average FPS (Frames Per Second)']), // Adjusted key with extra space
];

               
            } else  if (benchmarkName === 'BM_FurMarkBenchmark') {
                
            
                query = 'INSERT INTO gpu.furmark  (sys_name, benchmark, time_ms, cpu_ms, iterations,   average_score_points ) VALUES ($1, $2, $3, $4, $5, $6)';
                columns = [
                    updatedResult['System Model Name'],
                    updatedResult['Benchmark'],
                    parseFloat(updatedResult['Time_ms']), // Adjusted key
                    parseFloat(updatedResult['CPU_ms']), // Adjusted key
                    parseInt(updatedResult['Iterations']),
                    parseFloat(updatedResult['Average Furmark Score (Points))']), // Adjusted key with extra space
                ];
            
            

            } else if (benchmarkName === 'BM_TessMarkBenchmark') {
            
                query = 'INSERT INTO gpu.sysbench (sys_name, benchmark, time_ms, cpu_ms, iterations, average_score_points) VALUES ($1, $2, $3, $4, $5, $6)';
                columns = [
                    updatedResult['System Model Name'],
                    updatedResult['Benchmark'],
                    parseFloat(updatedResult['Time_ms']), // Adjusted key
                    parseFloat(updatedResult['CPU_ms']), // Adjusted key
                    parseInt(updatedResult['Iterations']),
                    parseFloat(updatedResult['Average Tessmark Score (Points)']), // Key seems to match, adjust if necessary
                ];
            
            
            } else {
                console.error(`Unknown benchmark: ${benchmarkName}`);
                return;
            }

            pool.query(query, columns)
                .then(() => {
                    console.log(`JSON data for ${benchmarkName} successfully inserted`);
                })
                .catch(err => {
                    console.error(`Error executing query for ${benchmarkName}`, err);
                });
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


//-----------------Memory save button api--------------------//
app.post('/saveResults-memory', (req, res) => {
   
    const results = req.body.results;
    console.log("saved results:"+results);
        if (!results || !Array.isArray(results)) {
            return res.status(400).json({ error: 'Invalid or missing results data' });
        }
        // Call the function with your JSON data
        insertJsonData_memory(results);
        res.status(200).json({ success: true });
});

//-----------------Network save button api--------------------//
app.post('/saveResults-network', (req, res) => {
   
    const results = req.body.results;
    console.log("saved results:"+results);
        if (!results || !Array.isArray(results)) {
            return res.status(400).json({ error: 'Invalid or missing results data' });
        }
        // Call the function with your JSON data
        insertJsonData_network(results);
        res.status(200).json({ success: true });
});
//-----------------cpu save button api--------------------//
app.post('/saveResults-cpu', (req, res) => {
   
    const results = req.body.results;
    console.log("saved results:"+results);
        if (!results || !Array.isArray(results)) {
            return res.status(400).json({ error: 'Invalid or missing results data' });
        }
        // Call the function with your JSON data
        insertJsonData_cpu(results);
        res.status(200).json({ success: true });
});

//-----------------gpu save button api--------------------//
app.post('/saveResults-gpu', (req, res) => {
   
    const results = req.body.results;
    console.log("saved results:"+results);
        if (!results || !Array.isArray(results)) {
            return res.status(400).json({ error: 'Invalid or missing results data' });
        }
        // Call the function with your JSON data
        insertJsonData_gpu(results);
        res.status(200).json({ success: true });
});

// // Properly close the pool when your application is shutting down
// process.on('SIGINT', () => {
//     pool.end().then(() => {
//         console.log('Pool has been closed gracefully');
//         process.exit(0);
//     });
// });


// // Define API endpoints
// app.get('/api/check_hardwaremap', (req, res) => {
//     // Your API logic here
//     res.json({ message: 'API endpoint accessed successfully' });
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
    const cloneCommand = 'sudo git clone https://github.com/monishaaraman/microbenchmark-new.git /usr/share/microbenchmark'; // Modify the clone command and path accordingly
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


//-----------------Hardware-map folder exists checking api--------------------//
// Endpoint to check if the "microbenchmark" folder exists
app.get('/api/check_hardwaremap', (req, res) => {
    const folderPath = '/usr/share/hardware_map'; // Modify this path accordingly

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
//-----------------Clone and build hardware-map folder api--------------------//
// Endpoint to clone the repository and build it
app.get('/clone_and_build_hardwaremap', (req, res) => {
    const cloneCommand = 'sudo git clone https://github.com/vijayakumarmani2/Hardware-Map.git /usr/share/hardware_map'; // Modify the clone command and path accordingly
    const buildCommands = [
        'cd /usr/share/hardware_map',
        'sudo ./install.sh'
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

        relevantLines.forEach(line => {
            const match = line.match(/([^:]+):([^]*)/);

            if (match) {
                const key = match[1].trim();
                let value = match[2].trim();

                // Remove the "ms" suffix from time_ms and cpu_ms values
                if (key === 'Time_ms' || key === 'CPU_ms') {
                    value = value.replace(' ms', '');
                }

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
    }

    return parsedResults;
}

// --------------------------execute memory benchmark------------------------------------//
app.get('/runmemorybenchmark', (req, res) => {
   
    const runCommands = [
           'cd /usr/share/microbenchmark',
           'sudo ./BENCH memory'
       ];
     
       exec(runCommands.join(' && '), (runError, runStdout, runStderr) => {
           console.log(`running memory...`);
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
   
           relevantLines.forEach(line => {
               const match = line.match(/([^:]+):([^]*)/);
   
               if (match) {
                   const key = match[1].trim();
                   let value = match[2].trim();
   
                   // Remove the "ms" suffix from time_ms and cpu_ms values
                   if (key === 'Time_ms' || key === 'CPU_ms') {
                       value = value.replace(' ms', '');
                   }
   
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
       }
   
       return parsedResults;
   }
   
   
   // --------------------------execute network benchmark------------------------------------//
app.get('/runnetworkbenchmark', (req, res) => {
   
    const runCommands = [
           'cd /usr/share/microbenchmark',
           'sudo ./BENCH network'
       ];
     
       exec(runCommands.join(' && '), (runError, runStdout, runStderr) => {
           console.log(`running network...`);
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
   
           relevantLines.forEach(line => {
               const match = line.match(/([^:]+):([^]*)/);
   
               if (match) {
                   const key = match[1].trim();
                   let value = match[2].trim();
   
                   // Remove the "ms" suffix from time_ms and cpu_ms values
                   if (key === 'Time_ms' || key === 'CPU_ms') {
                       value = value.replace(' ms', '');
                   }
   
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
       }
   
       return parsedResults;
   }
   
   
// --------------------------execute cpu benchmark------------------------------------//
app.get('/runcpubenchmark', (req, res) => {
   
    const runCommands = [
           'cd /usr/share/microbenchmark',
           'sudo ./BENCH cpu'
       ];
     
       exec(runCommands.join(' && '), (runError, runStdout, runStderr) => {
           console.error(`running cpu...`);
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
   
           relevantLines.forEach(line => {
               const match = line.match(/([^:]+):([^]*)/);
   
               if (match) {
                   const key = match[1].trim();
                   let value = match[2].trim();
   
                   // Remove the "ms" suffix from time_ms and cpu_ms values
                   if (key === 'Time_ms' || key === 'CPU_ms') {
                       value = value.replace(' ms', '');
                   }
   
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
       }
   
       return parsedResults;
   }

     // --------------------------execute gpu benchmark------------------------------------//
app.get('/rungpubenchmark', (req, res) => {
   
    const runCommands = [
           'cd /usr/share/microbenchmark',
           'sudo ./BENCH gpu'
       ];
     
       exec(runCommands.join(' && '), (runError, runStdout, runStderr) => {
           console.log(`running gpu...`);
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
   
           relevantLines.forEach(line => {
               const match = line.match(/([^:]+):([^]*)/);
   
               if (match) {
                   const key = match[1].trim();
                   let value = match[2].trim();
   
                   // Remove the "ms" suffix from time_ms and cpu_ms values
                   if (key === 'Time_ms' || key === 'CPU_ms') {
                       value = value.replace(' ms', '');
                   }
   
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
       }
   
       return parsedResults;
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
