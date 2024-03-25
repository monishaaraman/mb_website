
function fetchbenchinfo() {
          // Display loading message
          document.getElementById('overlay_fetching_bench').style.display = 'flex';
          console.log("calling");
          // Simulate fetching data from the server
          checkMicrobenchmarkFolder();
      }


document.addEventListener('DOMContentLoaded', function () {

  
// Your script code here
window.particlesJS("particleCanvas-Blue", {
    particles: {
        number: {
            value: 1000,
            density: {
                enable: true,
                value_area: 1000
            }
        },
        color: {
            value: "#302E3D"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 3
            },
            image: {
                src: "img/github.svg",
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 10,
            random: true,
            anim: {
                enable: false,
                speed: 10,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 394.57382081613633,
                rotateY: 157.82952832645452
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: false,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 0.2
                }
            },
            bubble: {
                distance: 1500,
                size: 40,
                duration: 7.272727272727273,
                opacity: 0.3676323676323676,
                speed: 3
            },
            repulse: {
                distance: 50,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});
window.
particlesJS("particleCanvas-White", {
    particles: {
        number: {
            value: 250,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#532C3A"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 3
            },
            image: {
                src: "img/github.svg",
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: false,
                speed: 0.2,
                opacity_min: 0,
                sync: false
            }
        },
        size: {
            value: 15,
            random: true,
            anim: {
                enable: true,
                speed: 10,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            bounce: false,
            attract: {
                enable: true,
                rotateX: 3945.7382081613637,
                rotateY: 157.82952832645452
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: false,
                mode: "grab"
            },
            onclick: {
                enable: false,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 0.2
                }
            },
            bubble: {
                distance: 1500,
                size: 40,
                duration: 7.272727272727273,
                opacity: 0.3676323676323676,
                speed: 3
            },
            repulse: {
                distance: 50,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});
});

// Declare a global variable to store data.results
let diskResults;

// Declare a global variable to store data.results for memory!!!!!!!!
let memoryResults;

// Declare a global variable to store data.results for network!!!!!!!!
let networkResults;

// Declare a global variable to store data.results for cpu!!!!!!!!
let cpuResults;


// Declare a global variable to store data.results for gpu!!!!!!!!
let gpuResults;

//-----------create chart function for DISK----------------------//
function createChart(data) {
                 // Check if the data array is empty or null
                if (!data || data.length === 0) {
                       console.error("Data is empty or null.");
                       return;
                 }
                   // Extract unique categories (bn values)
                var categories = [...new Set(data.map(item => item.bn))];

                // Create datasets based on sys_name
                var datasets = [...new Set(data.map(item => item.bn))].map(sysName => {
                      return {
                          label: sysName,
                          backgroundColor: getRandomColor(),
                          borderColor: "rgba(75, 192, 192, 1)",
                          borderWidth: 1,
                          data: categories.map(category => {
                              var item = data.find(d => d.sys_name === sysName && d.bn === category);
                              return item ? item.value1 : 0; // Use 0 if data is missing
                          }),
                      };
                });

                    // Create the chart
                  var ctx = document.getElementById("myChart").getContext("2d");
                  
                  var myChart = new Chart(ctx, {
                                  type: "bar",
                                  data: {
                                      labels: categories,
                                      datasets: datasets,
                                  },
                                  options: {
                                      indexAxis: "y",
                                      scales: {
                                          x: {
                                              beginAtZero: true,
                                          },
                                      },
                                  },
                                });
}


//---------------------get Random Color function----------------------//
function getRandomColor() {
                                var letters = "0123456789ABCDEF";
                                var color = "#";
                                for (var i = 0; i < 6; i++) {
                                  color += letters[Math.floor(Math.random() * 16)];
                                }
                                return color;
 }
            


//----------------Microbenchmark folder checking function----------------------//
    // Function to check if the "microbenchmark" folder exists
 function checkMicrobenchmarkFolder() {
            fetch("/check_microbenchmark")
            .then(response => {
                if (response.status === 200) {
                    console.log("success");
                    // Folder exists, check if "BENCH" executable exists
                    fetch("/check_bench_executable")
                        .then(execResponse => {
                            if (execResponse.status === 200) {
                                // "BENCH" executable exists, hide the build button
                                document.getElementById("buildButton-bench").style.display = "none";
                                document.getElementById('overlay_fetching_bench').style.display = 'none';
                                document.getElementById("build-message").innerText = "You've already built.";
                            } else {
                                // "BENCH" executable doesn't exist, show the build button
                                document.getElementById("buildButton-bench").style.display = "block";
                                
                                document.getElementById("build-message").innerText = "You should build first.";
                            }
                        })
                        .catch(execError => console.error("Error checking 'BENCH' executable: " + execError));
                } else {
                    // Folder doesn't exist, show the build button
                    document.getElementById("buildButton-bench").style.display = "block";
                    document.getElementById("build-message").innerText = "You should build first.";
                    console.log("not");
                }
            })
            .catch(error => console.error("Error checking 'microbenchmark' folder: " + error));
    }


   


//----------------Build button clicking function----------------------//
 function buildButton_bench() {
      // Check if the "microbenchmark" folder exists
      console.log("clicked");
      document.getElementById('loadingIcon_b').style.display = 'block';
      document.getElementById("buildButton-bench").style.display = "none";
      document.getElementById("build-message").innerText = "";
      fetch("/check_microbenchmark")
        .then(response => {
            if (response.status === 200) {
                console.log("The 'microbenchmark' folder already exists.");
            } else {
                // Clone the repository
                fetch("/clone_and_build_microbenchmark")
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                          //  console.log("Repository cloned  cloned and built  successfully.");
                            document.getElementById("build-message").innerText = "You've built successfully";
                            document.getElementById('loadingIcon_b').style.display = 'none';
                            document.getElementById('overlay_fetching_bench').style.display = 'none';
                        } else {
                            console.log("Failed to clone repository.");
                            document.getElementById('loadingIcon_b').style.display = 'none';
                            document.getElementById("build-message").innerText = "build error";
                        }
                    })
                    .catch(error => console.error("Error cloning repository: " + error));
            }
        })
        .catch(error => console.error("Error checking 'microbenchmark' folder: " + error));
        
      } 




 









     //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!----------------Memory button clicking function----------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
  
 //----------------Disk button clicking function----------------------//
 function rundiskbenchmark() {
    // Display loading icon
    document.getElementById("run-btn").style.display = "none";
    document.getElementById('loadingIcon').style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';

    fetch("/rundiskbenchmark")
        .then(response => response.json())
        .then(data => {
            console.log('Disk Benchmark initiated', data);
            const taskId = data.taskId;
            pollTaskStatus_disk(taskId);
        })
        .catch(error => {
            console.error('Error starting disk benchmark:', error);
            // Handle error
        });
}

function pollTaskStatus_disk(taskId) {
    const checkStatus = () => {
        fetch(`/checkTaskStatus/${taskId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Checking task status', data);
                if (data.status === 'completed') {
                     // Hide loading icon
            document.getElementById('loadingIcon').style.display = 'none';
            // Show success message and parse the data
            document.getElementById('successMessage').style.display = 'block';
                    console.log('Disk Benchmark completed', data.results);
                    // Handle completed task and results here
                    parseBenchmarkResults_disk(data.results);

                } else if (data.status === 'error') {
                    console.error('Disk Benchmark error', data.message);
                    // Handle error
                } else {
                    setTimeout(checkStatus, 5000); // Poll every 5 seconds
                }
            })
            .catch(error => {
                console.error('Error checking task status:', error);
                // Handle error
            });
    };

    checkStatus();
}

  

//----------------Disk result parsing function----------------------//
   // Assuming "data.results" is an array of objects with key-value pairs
   function parseBenchmarkResults_disk(results) {
    // Check if the "results" property is defined
    console.log('Received results from server:', results);
    // Clear existing table rows
    var tableBody = document.getElementById('benchmarkTableBody');
    var tableBody2 = document.getElementById('benchmarkTableBody2');
    var tableBody3 = document.getElementById('benchmarkTableBody3');

    tableBody.innerHTML = '';
    tableBody2.innerHTML = '';
    tableBody3.innerHTML = '';

    // Iterate through results and update the table
    results.forEach(result => {
        console.log('Processing result:', result);
        var row;
        Object.values(result).forEach(value1 => {
            // console.log('enter in ', value1);
            if(value1 == "Fio-Random"){
                 row = tableBody.insertRow();
                 Object.entries(result).forEach(([key, value]) => {
            if (key !== "Benchmark") { // Skip the "Benchmark" key
                var cell = row.insertCell();
                console.log('cell:', cell);
                cell.textContent = value;
                console.log('value:', value);

                 }
        });
            }else if(value1 == "Fio-sequential"){
                 row = tableBody2.insertRow();
                 Object.entries(result).forEach(([key, value]) => {
            if (key !== "Benchmark") { // Skip the "Benchmark" key
                var cell = row.insertCell();
                console.log('cell:', cell);
                cell.textContent = value;
                console.log('value:', value);

                 }
        });
            }else if(value1 == "BM_Compilebench"){
                 row = tableBody3.insertRow();
                 Object.entries(result).forEach(([key, value]) => {
            if (key !== "Benchmark") { // Skip the "Benchmark" key
                var cell = row.insertCell();
                console.log('cell:', cell);
                cell.textContent = value;
                console.log('value:', value);

                 }
        });
            }
        });

       
       
    });
}

 document.addEventListener('DOMContentLoaded', function() {




//----------------Memory button clicking function----------------------//
function runmemorybenchmark() {
    // Display loading icon
    document.getElementById("run-btn1").style.display = "none";
    document.getElementById('loadingIcon1').style.display = 'block';
    document.getElementById('errorMessage1').style.display = 'none';
    document.getElementById('successMessage1').style.display = 'none';

    fetch("/runmemorybenchmark")
        .then(response => response.json())
        .then(data => {
            console.log('Memory Benchmark initiated', data);
            const taskId = data.taskId;
            pollTaskStatus_memory(taskId);
        })
        .catch(error => {
            console.error('Error starting memory benchmark:', error);
            // Handle error
        });
}

function pollTaskStatus_memory(taskId) {
    const checkStatus = () => {
        fetch(`/checkTaskStatus/${taskId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Checking task status', data);
                if (data.status === 'completed') {
                     // Hide loading icon
            document.getElementById('loadingIcon1').style.display = 'none';
            // Show success message and parse the data
            document.getElementById('successMessage1').style.display = 'block';
                    console.log('Memory Benchmark completed', data.results);
                    // Handle completed task and results here
                    parseBenchmarkResults_memory(data.results);

                } else if (data.status === 'error') {
                    console.error('Memory Benchmark error', data.message);
                    // Handle error
                } else {
                    setTimeout(checkStatus, 5000); // Poll every 5 seconds
                }
            })
            .catch(error => {
                console.error('Error checking task status:', error);
                // Handle error
            });
    };

    checkStatus();
}

//----------------Memory result parsing function----------------------//
 // Assuming "data.results" is an array of objects with key-value pairs
 function parseBenchmarkResults_memory(results) {
  // Check if the "results" property is defined
  console.log('Received results from server:', results);
  // Clear existing table rows
  var memtableBody = document.getElementById('benchmarkmemTableBody');
  var memtableBody2 = document.getElementById('benchmarkmemTableBody2');
  var memtableBody3 = document.getElementById('benchmarkmemTableBody3');

  memtableBody.innerHTML = '';
 memtableBody2.innerHTML = '';
  memtableBody3.innerHTML = '';

  // Iterate through results and update the table
  results.forEach(result => {
      console.log('Processing result:', result);
      var row;
      Object.values(result).forEach(value1 => {
          // console.log('enter in ', value1);
          if(value1 == "Benchmark_RAMSMP_INTmem"){
               row = memtableBody.insertRow();
               Object.entries(result).forEach(([key, value]) => {
          if (key !== "Benchmark") { // Skip the "Benchmark" key
              var cell = row.insertCell();
              console.log('cell:', cell);
              cell.textContent = value;
              console.log('value:', value);

               }
      });
          }else if(value1 == "Benchmark_RAMSMP_FLOATmem"){
               row = memtableBody2.insertRow();
               Object.entries(result).forEach(([key, value]) => {
          if (key !== "Benchmark") { // Skip the "Benchmark" key
              var cell = row.insertCell();
              console.log('cell:', cell);
              cell.textContent = value;
              console.log('value:', value);

               }
      });
          }else if(value1 == "BM_CacheBench"){
               row = memtableBody3.insertRow();
               Object.entries(result).forEach(([key, value]) => {
          if (key !== "Benchmark") { // Skip the "Benchmark" key
              var cell = row.insertCell();
              console.log('cell:', cell);
              cell.textContent = value;
              console.log('value:', value);

               }
      });
          }
      });

     
     
  });
}

//----------------Network button clicking function----------------------//

function runnetworkbenchmark() {
    // Display loading icon
    document.getElementById("run-btn2").style.display = "none";
    document.getElementById('loadingIcon2').style.display = 'block';
    document.getElementById('errorMessage2').style.display = 'none';
    document.getElementById('successMessage2').style.display = 'none';

    fetch("/runnetworkbenchmark")
        .then(response => response.json())
        .then(data => {
            console.log('Network Benchmark initiated', data);
            const taskId = data.taskId;
            pollTaskStatus_network(taskId);
        })
        .catch(error => {
            console.error('Error starting network benchmark:', error);
            // Handle error
        });
}

function pollTaskStatus_network(taskId) {
    const checkStatus = () => {
        fetch(`/checkTaskStatus/${taskId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Checking task status', data);
                if (data.status === 'completed') {
                     // Hide loading icon
            document.getElementById('loadingIcon2').style.display = 'none';
            // Show success message and parse the data
            document.getElementById('successMessage2').style.display = 'block';
                    console.log('Network Benchmark completed', data.results);
                    // Handle completed task and results here
                    parseBenchmarkResults_netwotk(data.results);

                } else if (data.status === 'error') {
                    console.error('Memory Benchmark error', data.message);
                    // Handle error
                } else {
                    setTimeout(checkStatus, 5000); // Poll every 5 seconds
                }
            })
            .catch(error => {
                console.error('Error checking task status:', error);
                // Handle error
            });
    };

    checkStatus();
}
    
    
    //----------------Network result parsing function----------------------//
     // Assuming "data.results" is an array of objects with key-value pairs
     function parseBenchmarkResults_netwotk(results) {
      // Check if the "results" property is defined
      console.log('Received results from server:', results);
      // Clear existing table rows
      var nettableBody = document.getElementById('benchmarknetTableBody');
      var nettableBody2 = document.getElementById('benchmarknetTableBody2');
      var nettableBody3 = document.getElementById('benchmarknetTableBody3');
    
      nettableBody.innerHTML = '';
     nettableBody2.innerHTML = '';
      nettableBody3.innerHTML = '';
    
      // Iterate through results and update the table
      results.forEach(result => {
          console.log('Processing result:', result);
          var row;
          Object.values(result).forEach(value1 => {
              // console.log('enter in ', value1);
              if(value1 == "BM_EthrBenchmark"){
                   row = nettableBody.insertRow();
                   Object.entries(result).forEach(([key, value]) => {
              if (key !== "Benchmark") { // Skip the "Benchmark" key
                  var cell = row.insertCell();
                  console.log('cell:', cell);
                  cell.textContent = value;
                  console.log('value:', value);
    
                   }
          });
              }else if(value1 == "BM_SockperfLatencyUnderLoad"){
                   row = nettableBody2.insertRow();
                   Object.entries(result).forEach(([key, value]) => {
              if (key !== "Benchmark") { // Skip the "Benchmark" key
                  var cell = row.insertCell();
                  console.log('cell:', cell);
                  cell.textContent = value;
                  console.log('value:', value);
    
                   }
          });
              }else if(value1 == "iperf"){
                   row = nettableBody3.insertRow();
                   Object.entries(result).forEach(([key, value]) => {
              if (key !== "Benchmark") { // Skip the "Benchmark" key
                  var cell = row.insertCell();
                  console.log('cell:', cell);
                  cell.textContent = value;
                  console.log('value:', value);
    
                   }
          });
              }
          });
    
         
         
      });
    }

    //----------------cpu button clicking function----------------------//
    function runcpubenchmark() {
        // Display loading icon
        document.getElementById("run-btn3").style.display = "none";
        document.getElementById('loadingIcon3').style.display = 'block';
        document.getElementById('errorMessage3').style.display = 'none';
        document.getElementById('successMessage3').style.display = 'none';
    
        fetch("/runcpubenchmark")
            .then(response => response.json())
            .then(data => {
                console.log('CPU Benchmark initiated', data);
                const taskId = data.taskId;
                pollTaskStatus_cpu(taskId);
            })
            .catch(error => {
                console.error('Error starting cpu benchmark:', error);
                // Handle error
            });
    }
    
    function pollTaskStatus_cpu(taskId) {
        const checkStatus = () => {
            fetch(`/checkTaskStatus/${taskId}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Checking task status', data);
                    if (data.status === 'completed') {
                         // Hide loading icon
                document.getElementById('loadingIcon3').style.display = 'none';
                // Show success message and parse the data
                document.getElementById('successMessage3').style.display = 'block';
                        console.log('CPU Benchmark completed', data.results);
                        // Handle completed task and results here
                        parseBenchmarkResults_cpu(data.results);
    
                    } else if (data.status === 'error') {
                        console.error('CPU Benchmark error', data.message);
                        // Handle error
                    } else {
                        setTimeout(checkStatus, 5000); // Poll every 5 seconds
                    }
                })
                .catch(error => {
                    console.error('Error checking task status:', error);
                    // Handle error
                });
        };
    
        checkStatus();
    }
    
    
    //----------------CPU result parsing function----------------------//
     // Assuming "data.results" is an array of objects with key-value pairs
     function parseBenchmarkResults_cpu(results) {
      // Check if the "results" property is defined
      console.log('Received results from server:', results);
      // Clear existing table rows
      var cputableBody = document.getElementById('benchmarkcpuTableBody');
      var cputableBody2 = document.getElementById('benchmarkcpuTableBody2');
      var cputableBody3 = document.getElementById('benchmarkcpuTableBody3');
    
      cputableBody.innerHTML = '';
     cputableBody2.innerHTML = '';
      cputableBody3.innerHTML = '';
    
      // Iterate through results and update the table
      results.forEach(result => {
          console.log('Processing result:', result);
          var row;
          Object.values(result).forEach(value1 => {
              // console.log('enter in ', value1);
              if(value1 == "BM_CRayBenchmark"){
                   row = cputableBody.insertRow();
                   Object.entries(result).forEach(([key, value]) => {
              if (key !== "Benchmark") { // Skip the "Benchmark" key
                  var cell = row.insertCell();
                  console.log('cell:', cell);
                  cell.textContent = value;
                  console.log('value:', value);
    
                   }
          });
              }else if(value1 == "BM_Blake2_Benchmark"){
                   row = cputableBody2.insertRow();
                   Object.entries(result).forEach(([key, value]) => {
              if (key !== "Benchmark") { // Skip the "Benchmark" key
                  var cell = row.insertCell();
                  console.log('cell:', cell);
                  cell.textContent = value;
                  console.log('value:', value);
    
                   }
          });
              }else if(value1 == "BM_SysbenchCPUBenchmark"){
                   row = cputableBody3.insertRow();
                   Object.entries(result).forEach(([key, value]) => {
              if (key !== "Benchmark") { // Skip the "Benchmark" key
                  var cell = row.insertCell();
                  console.log('cell:', cell);
                  cell.textContent = value;
                  console.log('value:', value);
    
                   }
          });
              }
          });
    
         
         
      });
    }
    
    //----------------GPU button clicking function----------------------//
    function rungpubenchmark() {
        // Display loading icon
        document.getElementById("run-btn4").style.display = "none";
        document.getElementById('loadingIcon4').style.display = 'block';
        document.getElementById('errorMessage4').style.display = 'none';
        document.getElementById('successMessage4').style.display = 'none';
    
        fetch("/rungpubenchmark")
            .then(response => response.json())
            .then(data => {
                console.log('GPU Benchmark initiated', data);
                const taskId = data.taskId;
                pollTaskStatus_gpu(taskId);
            })
            .catch(error => {
                console.error('Error starting gpu benchmark:', error);
                // Handle error
            });
    }
    
    function pollTaskStatus_gpu(taskId) {
        const checkStatus = () => {
            fetch(`/checkTaskStatus/${taskId}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Checking task status', data);
                    if (data.status === 'completed') {
                         // Hide loading icon
                document.getElementById('loadingIcon4').style.display = 'none';
                // Show success message and parse the data
                document.getElementById('successMessage4').style.display = 'block';
                        console.log('GPU Benchmark completed', data.results);
                        // Handle completed task and results here
                        parseBenchmarkResults_gpu(data.results);
    
                    } else if (data.status === 'error') {
                        console.error('GPU Benchmark error', data.message);
                        // Handle error
                    } else {
                        setTimeout(checkStatus, 5000); // Poll every 5 seconds
                    }
                })
                .catch(error => {
                    console.error('Error checking task status:', error);
                    // Handle error
                });
        };
    
        checkStatus();
    }
    
    //----------------GPU result parsing function----------------------//
     // Assuming "data.results" is an array of objects with key-value pairs
     function parseBenchmarkResults_gpu(results) {
      // Check if the "results" property is defined
      console.log('Received results from server:', results);
      // Clear existing table rows
      var gputableBody = document.getElementById('benchmarkgpuTableBody');
      var gputableBody2 = document.getElementById('benchmarkgpuTableBody2');
      var gputableBody3 = document.getElementById('benchmarkgpuTableBody3');
    
      gputableBody.innerHTML = '';
     gputableBody2.innerHTML = '';
      gputableBody3.innerHTML = '';
    
      // Iterate through results and update the table
      results.forEach(result => {
          console.log('Processing result:', result);
          var row;
          Object.values(result).forEach(value1 => {
              // console.log('enter in ', value1);
              if(value1 == "BM_UnigineHeavenBenchmark"){
                   row = gputableBody.insertRow();
                   Object.entries(result).forEach(([key, value]) => {
              if (key !== "Benchmark") { // Skip the "Benchmark" key
                  var cell = row.insertCell();
                  console.log('cell:', cell);
                  cell.textContent = value;
                  console.log('value:', value);
    
                   }
          });
              }else if(value1 == "BM_FurMarkBenchmark"){
                   row = gputableBody2.insertRow();
                   Object.entries(result).forEach(([key, value]) => {
              if (key !== "Benchmark") { // Skip the "Benchmark" key
                  var cell = row.insertCell();
                  console.log('cell:', cell);
                  cell.textContent = value;
                  console.log('value:', value);
    
                   }
          });
              }else if(value1 == "BM_TessMarkBenchmark"){
                   row = gputableBody3.insertRow();
                   Object.entries(result).forEach(([key, value]) => {
              if (key !== "Benchmark") { // Skip the "Benchmark" key
                  var cell = row.insertCell();
                  console.log('cell:', cell);
                  cell.textContent = value;
                  console.log('value:', value);
    
                   }
          });
              }
          });
    
         
         
      });
    }
  
});










//----------------Disk result parsing function----------------------//
// Assuming "data.results" is an array of objects with key-value pairs
/*function parseBenchmarkResults1(results) {
    // Clear existing table rows for all three tables
    var tableBody1 = document.getElementById('benchmarkTableBody');
    var tableBody2 = document.getElementById('benchmarkTableBody2');
    var tableBody3 = document.getElementById('benchmarkTableBody3');
    tableBody.innerHTML = '';
    tableBody2.innerHTML = '';
    tableBody3.innerHTML = '';

    // Iterate through results and update each table
    results.forEach(result => {
        console.log('Processing result:', result);

        // Determine which table to update based on the 'benchmark' property in the result object
        if (result.benchmark === 'Fio-Random') { // Replace 'Benchmark1' with the actual benchmark name for the first table
            var row = tableBody1.insertRow();
            Object.values(result).forEach(value => {
                var cell = row.insertCell();
                cell.textContent = value;
            });
        } else if (result.benchmark === 'Fio-sequential') { // Replace 'Benchmark2' with the actual benchmark name for the second table
            var row = tableBody2.insertRow();
            Object.values(result).forEach(value => {
                var cell = row.insertCell();
                cell.textContent = value;
            });
        } else if (result.benchmark === 'BM_Compilebench') { // Replace 'Benchmark3' with the actual benchmark name for the third table
            var row = tableBody3.insertRow();
            Object.values(result).forEach(value => {
                var cell = row.insertCell();
                cell.textContent = value;
            });
        }
    });
}*/


//----------------Disk result saving to DB function----------------------//
function Disk_saveData() {
  console.log("disk save btn clicked...");
  const button = document.getElementById('disk-save-btn');
  if (diskResults) {
        fetch('/saveResults-disk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ results: diskResults }),
            })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Success:', data);
            button.innerHTML = 'Saved &#10004;'; // HTML code for the tick mark
            button.disabled = true;
        } else {
            // Handle the case where success is false
            console.error('Save unsuccessful');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
else {
        console.error('No results to save. Run the disk benchmark first.');
        // You might want to provide user feedback here, e.g., display a message.
    }

  }
 
  //----------------Memory result saving to DB function----------------------//
function Memory_saveData() {
  console.log("memory save btn clicked...");
  const button = document.getElementById('mem-save-btn');
  if (memoryResults) {
        fetch('/saveResults-memory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ results: memoryResults }),
            })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Success:', data);
            button.innerHTML = 'Saved &#10004;'; // HTML code for the tick mark
            button.disabled = true;
        } else {
            // Handle the case where success is false
            console.error('Save unsuccessful');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
else {
        console.error('No results to save. Run the memory benchmark first.');
        // You might want to provide user feedback here, e.g., display a message.
    }

  }

  //----------------Network result saving to DB function----------------------//
function Network_saveData() {
  console.log("network save btn clicked...");
  const button = document.getElementById('net-save-btn');
  if (networkResults) {
        fetch('/saveResults-network', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ results: networkResults }),
            })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Success:', data);
            button.innerHTML = 'Saved &#10004;'; // HTML code for the tick mark
            button.disabled = true;
        } else {
            // Handle the case where success is false
            console.error('Save unsuccessful');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
else {
        console.error('No results to save. Run the network benchmark first.');
        // You might want to provide user feedback here, e.g., display a message.
    }

  }

  //----------------CPU result saving to DB function----------------------//
function Cpu_saveData() {
  console.log("cpu save btn clicked...");
  const button = document.getElementById('cpu-save-btn');
  if (cpuResults) {
        fetch('/saveResults-cpu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ results: cpuResults }),
            })
    .then(response => {
        if (!response.ok) {
            throw new Error('Cpu response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Success:', data);
            button.innerHTML = 'Saved &#10004;'; // HTML code for the tick mark
            button.disabled = true;
        } else {
            // Handle the case where success is false
            console.error('Save unsuccessful');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
else {
        console.error('No results to save. Run the cpu benchmark first.');
        // You might want to provide user feedback here, e.g., display a message.
    }

  }


  //----------------GPU result saving to DB function----------------------//
function Gpu_saveData() {
  console.log("gpu save btn clicked...");
  const button = document.getElementById('gpu-save-btn');
  if (gpuResults) {
        fetch('/saveResults-gpu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ results: gpuResults }),
            })
    .then(response => {
        if (!response.ok) {
            throw new Error('Cpu response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Success:', data);
            button.innerHTML = 'Saved &#10004;'; // HTML code for the tick mark
            button.disabled = true;
        } else {
            // Handle the case where success is false
            console.error('Save unsuccessful');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
else {
        console.error('No results to save. Run the gpu benchmark first.');
        // You might want to provide user feedback here, e.g., display a message.
    }

  }

//----------------Comparison popup function----------------------//
// Function to show the comparison popup
function showComparisonPopup_1(){
    document.getElementById('overlay_fetching_comparison_popup').style.display = 'flex';
    //document.getElementById('comparisonPopup').style.display = 'block';   
    document.getElementById('contentFrame_compare').style.display = 'block';  
   
}


function showComparisonPopup() {
    // Fetch data from the server
    fetch('/getComparisonData-disk')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
              console.log('Fetched Data:', data);
                // Populate the select box with fetched data
                const selectComparisonItems = document.getElementById('selectComparisonItems');
            selectComparisonItems.innerHTML = ''; // Clear previous options
               index=0;
            data.data.forEach(item => {
                const option = document.createElement('option');
                
                option.value = index++; // Use the unique identifier as the value
                console.log('index:', index);
                option.innerHTML = `${index} - ${item.sys_name} - ${item.benchmark}`;
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = item.id;
                option.prepend(checkbox);

                selectComparisonItems.appendChild(option);
            });

            // Log the selected items on change
            selectComparisonItems.addEventListener('change', () => {
              const selectedData = Array.from(document.getElementById('selectComparisonItems').selectedOptions).map(option => option.value);
                    generateBarChart_DISK(selectedData);
              
            });
           // Show the popup
           document.getElementById('comparisonPopup').style.display = 'block';    
            } else {
                console.error('Failed to fetch data for comparison');
            }
        })
        .catch(error => {
            console.error('Error fetching data for comparison', error);
        });
}

//----------------Comparison popup Close function----------------------//
// Function to close the comparison popup
function closeComparisonPopup() {
    document.getElementById('comparisonPopup').style.display = 'none';
}

function closeComparisonPopup_1() {
    document.getElementById('overlay_fetching_comparison_popup').style.display = 'none';
    //document.getElementById('comparisonPopup').style.display = 'block';   
    document.getElementById('contentFrame_compare').style.display = 'none';  
}

// -----------------------prepare dataser fof chart - DISK--------------------//
function prepareDataset_DISK (selectedData) {
      const labels = ['Average read', 'Average write'];
      const datasets = selectedData.map((item, index) => {
    return {
        axis: index % 2 === 0 ? 'x' : 'y', // Alternate between 'x' and 'y' axes
        label: `${item.sys_name} - Average Read`,
        data: [item.averageread_mib_s, item.averagewrite_mib_s],
        fill: false,
       
        borderWidth: 1,
    };
});

return {
    labels: labels,
    datasets: datasets,
};
};


// -----------------------generate Bar Chart - DISK--------------------//
let relevantArray = [];
let comparisonChart= null; // Declare a variable to store the chart instance
let  dataset;
function generateBarChart_DISK(selectedData) {
     // Log the selected items in the chart function
      console.log('Selected Items in generateBarChart_DISK:', selectedData);

      // Fetch data based on the selected row's properties
      fetch('/getComparisonData-disk') // Modify the endpoint if needed
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  // Log the fetched data
                  console.log('Fetched Data:', data);

                  const relevantArray = selectedData.map(index => {
                      const selectedIndex = Number(index);
                      return data.data[selectedIndex];
                  });

                  // Log the relevant array
                  console.log('Relevant Array:', relevantArray);

                  // Destroy the existing chart if it exists
                  if (comparisonChart) {
                      comparisonChart.destroy();
                  }

                  // Now you can use the relevantArray to generate the bar chart
                  const dataset = prepareDataset_DISK(relevantArray);

                  // Generate the bar chart using Chart.js
                  const ctx = document.getElementById('comparisonChart').getContext('2d');
                  comparisonChart = new Chart(ctx, {
                      type: 'bar',
                      data: dataset,
                      options: {
                          scales: {
                              y: {
                                  beginAtZero: true,
                              },
                          },
                      },
                  });
              } else {
                  console.error('Failed to fetch data:', data);
              }
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });

}


//------------------------disk info tool tip-------------------------------//





// function callAPIs() {
        

//         // Array of API endpoints to call
//         const apiEndpoints = ["/rundiskbenchmark", "/runmemorybenchmark", "/runnetworkbenchmark", "/runcpubenchmark", "/rungpubenchmark"];
// // Function to call an API endpoint and handle the response
// async function callAPI(endpoint) {
//     try {
//           // Display loading icon
//             if(endpoint == "/rundiskbenchmark"){
//                  var collapseElement = document.getElementById("collapseContent2");
//             if (collapseElement && collapseElement.classList.contains('show')) {
//                 // Collapse is currently open, so close it
//                 //collapseElement.classList.remove('show');
//             } else if (collapseElement) {
//                 // Collapse is currently closed or not found, so open it
//                 collapseElement.classList.add('show');
//             }
//             document.getElementById("run-btn").style.display = "none";
//             document.getElementById('loadingIcon').style.display = 'block';
//             document.getElementById('errorMessage').style.display = 'none';
//             document.getElementById('successMessage').style.display = 'none';
//          }else if(endpoint == "/runmemorybenchmark"){
//             var collapseElement = document.getElementById("collapseContent3");
//             if (collapseElement && collapseElement.classList.contains('show')) {
//                 // Collapse is currently open, so close it
//                 //collapseElement.classList.remove('show');
//             } else if (collapseElement) {
//                 // Collapse is currently closed or not found, so open it
//                 collapseElement.classList.add('show');
//             }
//             document.getElementById("run-btn1").style.display = "none";
//             document.getElementById('loadingIcon1').style.display = 'block';
//             document.getElementById('errorMessage1').style.display = 'none';
//             document.getElementById('successMessage1').style.display = 'none';
//          }else if(endpoint == "/runnetworkbenchmark"){
//             var collapseElement = document.getElementById("collapseContent4");
//             if (collapseElement && collapseElement.classList.contains('show')) {
//                 // Collapse is currently open, so close it
//                 //collapseElement.classList.remove('show');
//             } else if (collapseElement) {
//                 // Collapse is currently closed or not found, so open it
//                 collapseElement.classList.add('show');
//             }
//             document.getElementById("run-btn2").style.display = "none";
//             document.getElementById('loadingIcon2').style.display = 'block';
//             document.getElementById('errorMessage2').style.display = 'none';
//             document.getElementById('successMessage2').style.display = 'none';
//          }else if(endpoint == "/runcpubenchmark"){
//             var collapseElement = document.getElementById("collapseContent5");
//             if (collapseElement && collapseElement.classList.contains('show')) {
//                 // Collapse is currently open, so close it
//                 //collapseElement.classList.remove('show');
//             } else if (collapseElement) {
//                 // Collapse is currently closed or not found, so open it
//                 collapseElement.classList.add('show');
//             }
//             document.getElementById("run-btn3").style.display = "none";
//             document.getElementById('loadingIcon3').style.display = 'block';
//             document.getElementById('errorMessage3').style.display = 'none';
//             document.getElementById('successMessage3').style.display = 'none';
//          }else if(endpoint == "/rungpubenchmark"){
//             var collapseElement = document.getElementById("collapseContent6");
//             if (collapseElement && collapseElement.classList.contains('show')) {
//                 // Collapse is currently open, so close it
//                 //collapseElement.classList.remove('show');
//             } else if (collapseElement) {
//                 // Collapse is currently closed or not found, so open it
//                 collapseElement.classList.add('show');
//             }
//             document.getElementById("run-btn4").style.display = "none";
//             document.getElementById('loadingIcon4').style.display = 'block';
//             document.getElementById('errorMessage4').style.display = 'none';
//             document.getElementById('successMessage4').style.display = 'none';
//          }

//          fetch("/runmemorybenchmark")
//          .then(response => {
//              // Hide loading icon
//              if(endpoint == "/rundiskbenchmark"){
//                 document.getElementById('loadingIcon').style.display = 'none';
//                 }else  if(endpoint == "/runmemorybenchmark"){
//                     document.getElementById('loadingIcon1').style.display = 'none';
//                     }else  if(endpoint == "/runnetworkbenchmark"){
//                         document.getElementById('loadingIcon2').style.display = 'none';
//                         }else  if(endpoint == "/runcpubenchmark"){
//                             document.getElementById('loadingIcon3').style.display = 'none';
//                             }else  if(endpoint == "/rungpubenchmark"){
//                                 document.getElementById('loadingIcon4').style.display = 'none';
//                                 }


//              console.log('Step 1: Response received');
//              if (!response.ok) {
//                  // Show error message
//                  if(endpoint == "/rundiskbenchmark"){
//                     document.getElementById('errorMessage').style.display = 'block';
//                     }else  if(endpoint == "/runmemorybenchmark"){
//                         document.getElementById('errorMessage2').style.display = 'block';
//                         }else  if(endpoint == "/runnetworkbenchmark"){
//                             document.getElementById('errorMessage3').style.display = 'block';
//                             }else  if(endpoint == "/runcpubenchmark"){
//                                 document.getElementById('errorMessage4').style.display = 'block';
//                                 }else  if(endpoint == "/rungpubenchmark"){
//                                     document.getElementById('errorMessage5').style.display = 'block';
//                                     }
//                //  document.getElementById('errorMessage1').style.display = 'block';
//                  throw new Error(`HTTP error! Status: ${response.status}`);
//              }

//              if(endpoint == "/rundiskbenchmark"){
//                 document.getElementById('successMessage').style.display = 'block';
//                 }else  if(endpoint == "/runmemorybenchmark"){
//                     document.getElementById('successMessage1').style.display = 'block';
//                     }else  if(endpoint == "/runnetworkbenchmark"){
//                         document.getElementById('successMessage2').style.display = 'block';
//                         }else  if(endpoint == "/runcpubenchmark"){
//                             document.getElementById('successMessage3').style.display = 'block';
//                             }else  if(endpoint == "/rungpubenchmark"){
//                                 document.getElementById('successMessage4').style.display = 'block';
//                                 }
//              return response.json();
//          })
//          .then(data => {
//            console.log('Step 2: Data received from server', data);

//              // Check if the "data" property is defined
//              if (data && data.results) {
//                  // Call the parsing function
//                  if(endpoint == "/rundiskbenchmark"){
//                     parseBenchmarkResults_disk(data.results);
//                     }else  if(endpoint == "/runmemorybenchmark"){
//                         parseBenchmarkResults_memory(data.results);
//                         }else  if(endpoint == "/runnetworkbenchmark"){
//                             parseBenchmarkResults_netwotk(data.results);
//                             }else  if(endpoint == "/runcpubenchmark"){
//                                 parseBenchmarkResults_cpu(data.results);
//                                 }else  if(endpoint == "/rungpubenchmark"){
//                                     parseBenchmarkResults_gpu(data.results);
//                                     }
//                  console.log('Memory benchmark completed successfully');
//              } else {
//                  console.error('Invalid or missing "results" property in the response:', data);
//                  console.log('Error occurred during memory benchmark');
//              }


//              //console.log('Disk benchmark completed successfully');
//          })
//          .catch(error => {
//              console.error('Error:', error);
//              console.log('Error occurred during memory benchmark');
//          });

      
        
                        

        
//     } catch (error) {
//         // Display error message
//         console.error('Error:', error);
//         console.log('Error occurred during benchmark');
//     }
// }

// // Call each API endpoint one by one
// (async function () {
//     for (let i = 0; i < apiEndpoints.length; i++) {
//         await callAPI(apiEndpoints[i]);
//     }
// })();
        
//     }


function callAPIs() {
        // Array of API endpoints to call
        const apiEndpoints = [
            "/rundiskbenchmark",
            "/runmemorybenchmark",
            "/runnetworkbenchmark",
            "/runcpubenchmark",
            "/rungpubenchmark"
        ];
    
        // Function to call an API endpoint and return a promise
        function callAPI(endpoint) {
            return new Promise((resolve, reject) => {
                    // Display loading icon
            if(endpoint == "/rundiskbenchmark"){
                var collapseElement = document.getElementById("collapseContent2");
           if (collapseElement && collapseElement.classList.contains('show')) {
               // Collapse is currently open, so close it
               //collapseElement.classList.remove('show');
           } else if (collapseElement) {
               // Collapse is currently closed or not found, so open it
               collapseElement.classList.add('show');
           }
           document.getElementById("run-btn").style.display = "none";
           document.getElementById('loadingIcon').style.display = 'block';
           document.getElementById('errorMessage').style.display = 'none';
           document.getElementById('successMessage').style.display = 'none';
        }else if(endpoint == "/runmemorybenchmark"){
           var collapseElement = document.getElementById("collapseContent3");
           if (collapseElement && collapseElement.classList.contains('show')) {
               // Collapse is currently open, so close it
               //collapseElement.classList.remove('show');
           } else if (collapseElement) {
               // Collapse is currently closed or not found, so open it
               collapseElement.classList.add('show');
           }
           document.getElementById("run-btn1").style.display = "none";
           document.getElementById('loadingIcon1').style.display = 'block';
           document.getElementById('errorMessage1').style.display = 'none';
           document.getElementById('successMessage1').style.display = 'none';
        }else if(endpoint == "/runnetworkbenchmark"){
           var collapseElement = document.getElementById("collapseContent4");
           if (collapseElement && collapseElement.classList.contains('show')) {
               // Collapse is currently open, so close it
               //collapseElement.classList.remove('show');
           } else if (collapseElement) {
               // Collapse is currently closed or not found, so open it
               collapseElement.classList.add('show');
           }
           document.getElementById("run-btn2").style.display = "none";
           document.getElementById('loadingIcon2').style.display = 'block';
           document.getElementById('errorMessage2').style.display = 'none';
           document.getElementById('successMessage2').style.display = 'none';
        }else if(endpoint == "/runcpubenchmark"){
           var collapseElement = document.getElementById("collapseContent5");
           if (collapseElement && collapseElement.classList.contains('show')) {
               // Collapse is currently open, so close it
               //collapseElement.classList.remove('show');
           } else if (collapseElement) {
               // Collapse is currently closed or not found, so open it
               collapseElement.classList.add('show');
           }
           document.getElementById("run-btn3").style.display = "none";
           document.getElementById('loadingIcon3').style.display = 'block';
           document.getElementById('errorMessage3').style.display = 'none';
           document.getElementById('successMessage3').style.display = 'none';
        }else if(endpoint == "/rungpubenchmark"){
           var collapseElement = document.getElementById("collapseContent6");
           if (collapseElement && collapseElement.classList.contains('show')) {
               // Collapse is currently open, so close it
               //collapseElement.classList.remove('show');
           } else if (collapseElement) {
               // Collapse is currently closed or not found, so open it
               collapseElement.classList.add('show');
           }
           document.getElementById("run-btn4").style.display = "none";
           document.getElementById('loadingIcon4').style.display = 'block';
           document.getElementById('errorMessage4').style.display = 'none';
           document.getElementById('successMessage4').style.display = 'none';
        }
    
                // Send request to the API endpoint
                fetch(endpoint)
                    .then(response => {
                        if (!response.ok) {
                              // Show error message
                 if(endpoint == "/rundiskbenchmark"){
                    document.getElementById('errorMessage').style.display = 'block';
                    }else  if(endpoint == "/runmemorybenchmark"){
                        document.getElementById('errorMessage2').style.display = 'block';
                        }else  if(endpoint == "/runnetworkbenchmark"){
                            document.getElementById('errorMessage3').style.display = 'block';
                            }else  if(endpoint == "/runcpubenchmark"){
                                document.getElementById('errorMessage4').style.display = 'block';
                                }else  if(endpoint == "/rungpubenchmark"){
                                    document.getElementById('errorMessage5').style.display = 'block';
                                    }
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        if(endpoint == "/rundiskbenchmark"){
                            document.getElementById('successMessage').style.display = 'block';
                            }else  if(endpoint == "/runmemorybenchmark"){
                                document.getElementById('successMessage1').style.display = 'block';
                                }else  if(endpoint == "/runnetworkbenchmark"){
                                    document.getElementById('successMessage2').style.display = 'block';
                                    }else  if(endpoint == "/runcpubenchmark"){
                                        document.getElementById('successMessage3').style.display = 'block';
                                        }else  if(endpoint == "/rungpubenchmark"){
                                            document.getElementById('successMessage4').style.display = 'block';
                                            }
                        return response.json();
                    })
                    .then(data => {
                        // Hide loading icon
             if(endpoint == "/rundiskbenchmark"){
                document.getElementById('loadingIcon').style.display = 'none';
                }else  if(endpoint == "/runmemorybenchmark"){
                    document.getElementById('loadingIcon1').style.display = 'none';
                    }else  if(endpoint == "/runnetworkbenchmark"){
                        document.getElementById('loadingIcon2').style.display = 'none';
                        }else  if(endpoint == "/runcpubenchmark"){
                            document.getElementById('loadingIcon3').style.display = 'none';
                            }else  if(endpoint == "/rungpubenchmark"){
                                document.getElementById('loadingIcon4').style.display = 'none';
                                }
    
                        // Show success message and parse the data
                        console.log('Data received from server:', data);
                        if (data && data.results) {
                            // Check if the "data" property is defined
             
                // Call the parsing function
                if(endpoint == "/rundiskbenchmark"){
                   parseBenchmarkResults_disk(data.results);
                   }else  if(endpoint == "/runmemorybenchmark"){
                       parseBenchmarkResults_memory(data.results);
                       }else  if(endpoint == "/runnetworkbenchmark"){
                           parseBenchmarkResults_netwotk(data.results);
                           }else  if(endpoint == "/runcpubenchmark"){
                               parseBenchmarkResults_cpu(data.results);
                               }else  if(endpoint == "/rungpubenchmark"){
                                   parseBenchmarkResults_gpu(data.results);
                                   }
                            console.log('Benchmark completed successfully');
                            resolve(); // Resolve the promise if API call succeeds
                        } else {
                            console.error('Invalid or missing "results" property in the response:', data);
                            console.log('Error occurred during benchmark');
                            reject(new Error('Invalid or missing data in the response')); // Reject the promise if API call fails
                        }
                    })
                    .catch(error => {
                        // Hide loading icon
                        document.getElementById('loadingIcon').style.display = 'none';
    
                        // Display error message
                        console.error('Error:', error);
                        console.log('Error occurred during benchmark');
                        reject(error); // Reject the promise if an error occurs during API call
                    });
            });
        }
    
        // Function to call APIs sequentially
        function callAPIsSequentially(endpoints) {
            return endpoints.reduce((chain, endpoint) => {
                return chain.then(() => callAPI(endpoint));
            }, Promise.resolve());
        }
    
        // Call APIs sequentially
        callAPIsSequentially(apiEndpoints)
            .then(() => {
                console.log('All APIs called successfully');
                // All APIs called successfully, perform any necessary actions here
            })
            .catch(error => {
                console.error('Error calling APIs:', error);
                // Handle error if any API call fails
            });
    }
    
