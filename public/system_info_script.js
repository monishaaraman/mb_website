    // Function to check if the "microbenchmark" folder exists
    function checkHardwareMapFolder() {
        fetch("/check_hardwaremap")
        .then(response => {
            if (response.status === 200) {
                // Folder exists, check if "BENCH" executable exists
                fetch("/check_hardwaremap_executable")
                    .then(execResponse => {
                        if (execResponse.status === 200) {
                            // "BENCH" executable exists, hide the build button
                            document.getElementById("sys_buildButton").style.display = "none";
                            document.getElementById('loading-bar-sys').style.display = 'block';
                            document.getElementById("message-sys-build").innerText = "You've already built.";
                            fetch('/getSystemInfo_all')
              .then(response => response.json())
              .then(data => {
                  // Store the fetched data
                  console.log("data:",data);
                  systemInfoData = data.systemInfo;

                  // Hide loading message
                  document.getElementById('overlay_fetching').style.display = 'none';
                  console.log("finished...");
                  console.log("systemInfoData-");
                  //let cpuinfo = extractSection(systemInfoData, '-------CPU Details');
                   extractCPUDetails(systemInfoData);
                   extractGPUDetails(systemInfoData);
                   extractRAMDetails(systemInfoData);
                   extractBatteryDetails(systemInfoData);
                   extractDisplayDetails(systemInfoData);
                   extractWifiDetails(systemInfoData);
                   extractEthernetDetails(systemInfoData);
                   extractKeyboardDetails(systemInfoData);
                   extractTouchpadDetails(systemInfoData);
                   extractAudioDetails(systemInfoData);
                  
                  console.log(cpuvendor);
              })
              .catch(error => {
                  console.error(`Error fetching system info: ${error}`);
                  // Handle errors as needed
              });
                        } else {
                            // "BENCH" executable doesn't exist, show the build button
                            document.getElementById("sys_buildButton").style.display = "block";
                            
                            document.getElementById("message-sys-build").innerText = "You should build first.";
                        }
                    })
                    .catch(execError => console.error("Error checking 'hardware_map' executable: " + execError));
            } else {
                // Folder doesn't exist, show the build button
                document.getElementById("sys_buildButton").style.display = "block";
                document.getElementById("message-sys-build").innerText = "You should build first.";
            }
        })
        .catch(error => console.error("Error checking 'microbenchmark' folder: " + error));
}

//----------------Build button clicking function----------------------//
document.getElementById("sys_buildButton").addEventListener("click", function () {
  
    document.getElementById('loadingIcon_sys').style.display = 'block';
    document.getElementById("sys_buildButton").style.display = "none";
    document.getElementById("message-sys-build").style.display = "none";
    fetch("/check_hardwaremap")
      .then(response => {
          if (response.status === 200) {
              console.log("The 'hardware_map' folder already exists.");
          } else {
            console.log("enter")
              // Clone the repository
              fetch("/clone_and_build_hardwaremap")
                  .then(response => response.json())
                  .then(data => {
                      if (data.success) {
                        //  console.log("Repository cloned  cloned and built  successfully.");
                          document.getElementById("message-sys-build").innerText = "You've built successfully";
                          document.getElementById('loadingIcon_sys').style.display = 'none';
                          document.getElementById('loading-bar-sys').style.display = 'block';
                          fetch('/getSystemInfo_all')
              .then(response => response.json())
              .then(data => {
                  // Store the fetched data
                  console.log("data:",data);
                  systemInfoData = data.systemInfo;

                  // Hide loading message
                  document.getElementById('overlay_fetching').style.display = 'none';
                  console.log("finished...");
                  console.log("systemInfoData-");
                  let cpuinfo = extractSection(systemInfoData, '-------CPU Details');
                   extractCPUDetails(systemInfoData);
                   extractGPUDetails(systemInfoData);
                   extractRAMDetails(systemInfoData);
                   extractBatteryDetails(systemInfoData);
                   extractDisplayDetails(systemInfoData);
                   extractWifiDetails(systemInfoData);
                   extractEthernetDetails(systemInfoData);
                   extractKeyboardDetails(systemInfoData);
                   extractTouchpadDetails(systemInfoData);
                   extractAudioDetails(systemInfoData);
                  
                  console.log(cpuvendor);
              })
              .catch(error => {
                  console.error(`Error fetching system info: ${error}`);
                  // Handle errors as needed
              });
                      } else {
                          console.log("Failed to clone repository.");
                          document.getElementById('loadingIcon_sys').style.display = 'none';
                          document.getElementById("message-sys-build").innerText = "build error";
                      }
                  })
                  .catch(error => console.error("Error cloning repository: " + error));
          }
      })
      .catch(error => console.error("Error checking 'microbenchmark' folder: " + error));
      
    });


let systemInfoData = null;

      function fetchSystemInfo() {
          // Display loading message
          document.getElementById('overlay_fetching').style.display = 'flex';
          document.getElementById('loadingIcon_sys').style.display = 'none';
         document.getElementById('loading-bar-sys').style.display = 'none';
          checkHardwareMapFolder();
          // Simulate fetching data from the server
          
      }

        function extractCPUDetails(systemInfoData) {
                const cpuDetailsIndex = systemInfoData.indexOf('-------CPU Details');
                if (cpuDetailsIndex !== -1) {
                    const cpuDetailsSubstring = systemInfoData.substring(cpuDetailsIndex);

                    // Extract the CPU model name using a regular expression
                    const cpuModelMatch = cpuDetailsSubstring.match(/CPU Model Name: (.+)/);
                    if (cpuModelMatch && cpuModelMatch.length >= 2) {
                    document.getElementById('cpu_model').innerHTML = cpuModelMatch[1];
                    }

                    const cpuVendorname = cpuDetailsSubstring.match(/CPU Vendor Name: (.+)/);
                    if (cpuVendorname && cpuVendorname.length >= 2) {
                    document.getElementById('cpu_vendor').innerHTML = cpuVendorname[1];
                    }

                    const cpucores = cpuDetailsSubstring.match(/CPU Cores: (.+)/);
                    if (cpucores && cpucores.length >= 2) {
                    document.getElementById('cpu_cores').innerHTML = cpucores[1] + ' Cores';
                    }
                }else
                document.getElementById('cpu_vendor').innerHTML = 'CPU Details not found';
        }

            function extractGPUDetails(systemInfoData) {
                    const gpuDetailsIndex = systemInfoData.indexOf('-------GPU Details');
                    if (gpuDetailsIndex !== -1) {
                        const gpuDetailsSubstring = systemInfoData.substring(gpuDetailsIndex);

                        // Extract the CPU model name using a regular expression
                        const gpuDeviceMatch = gpuDetailsSubstring.match(/GPU Device Name: (.+)/);
                        if (gpuDeviceMatch && gpuDeviceMatch.length >= 2) {
                        document.getElementById('gpu_device').innerHTML = gpuDeviceMatch[1];
                        }

                        const gpuVendorname = gpuDetailsSubstring.match(/GPU Vendor Name: (.+)/);
                        if (gpuVendorname && gpuVendorname.length >= 2) {
                        document.getElementById('gpu_vendor').innerHTML = gpuVendorname[1];
                        }

                        
                    }else
                    document.getElementById('gpu_vendor').innerHTML = 'GPU Details not found';
            }

            function extractRAMDetails(systemInfoData) {
                const ramDetailsIndex = systemInfoData.indexOf('-------RAM Details');
                if (ramDetailsIndex !== -1) {
                    const ramDetailsSubstring = systemInfoData.substring(ramDetailsIndex);
            
                    // Extract the CPU model name using a regular expression
                    const ramsize = ramDetailsSubstring.match(/Range Size: (.+)/);
                    if (ramsize && ramsize.length >= 2) {
                    document.getElementById('ramsize').innerHTML =  'Size: '+ramsize[1];
                    }
            
                    
                }else
                document.getElementById('ramsize').innerHTML = 'RAM Details not found';
            }


            function extractDisplayDetails(systemInfoData) {
                const displayDetailsIndex = systemInfoData.indexOf('-------Display Details');
                if (displayDetailsIndex !== -1) {
                    const displayDetailsSubstring = systemInfoData.substring(displayDetailsIndex);

                    // Extract the CPU model name using a regular expression
                    const displayResolution = displayDetailsSubstring.match(/Resolution: (.+)/);
                    if (displayResolution && displayResolution.length >= 2) {
                    document.getElementById('display_resolution').innerHTML = displayResolution[1];
                    }
                    
                }else
                document.getElementById('display_resolution').innerHTML = 'Display Details not found';
        }


        function extractBatteryDetails(systemInfoData) {
            const batteryDetailsIndex = systemInfoData.indexOf('-------Battery Details');
            if (batteryDetailsIndex !== -1) {
                const batteryDetailsSubstring = systemInfoData.substring(batteryDetailsIndex);

                // Extract the CPU model name using a regular expression
                const batteryvendor = batteryDetailsSubstring.match(/Battery Vendor: (.+)/);
                if (batteryvendor && batteryvendor.length >= 2) {
                document.getElementById('battery_vendor').innerHTML = 'Vendor - ' +batteryvendor[1];
                }

                const batterydevice = batteryDetailsSubstring.match(/Battery Model Name: (.+)/);
                if (batterydevice && batterydevice.length >= 2) {
                document.getElementById('battery_device').innerHTML = 'Model - ' + batterydevice[1];
                }

                const batterytech= batteryDetailsSubstring.match(/Battery Technology: (.+)/);
                if (batterytech && batterytech.length >= 2) {
                document.getElementById('battery_tech').innerHTML = batterytech[1];
                }
                
            }else
            document.getElementById('battery_vendor').innerHTML = 'Battery Details not found';
    }

    function extractWifiDetails(systemInfoData) {
        const wifiDetailsIndex = systemInfoData.indexOf('-------Wifi Details');
        if (wifiDetailsIndex !== -1) {
            const wifiDetailsSubstring = systemInfoData.substring(wifiDetailsIndex);

            // Extract the CPU model name using a regular expression
            const wifivendor = wifiDetailsSubstring.match(/WiFi Vendor Details: (.+)/);
            if (wifivendor && wifivendor.length >= 2) {
            document.getElementById('wifi_vendor').innerHTML = 'Vendor - ' + wifivendor[1];
            }

            const wifiinterface = wifiDetailsSubstring.match(/WiFi Interface: (.+)/);
            if (wifiinterface && wifiinterface.length >= 2) {
            document.getElementById('wifi_interface').innerHTML = 'Interface - ' + wifiinterface[1];
            }

            
            
        }else
        document.getElementById('wifi_vendor').innerHTML = 'WiFi Details not found';
}

    function extractEthernetDetails(systemInfoData) {
        const ethernetDetailsIndex = systemInfoData.indexOf('-------Ethernet Details');
        if (ethernetDetailsIndex !== -1) {
            const ethernetDetailsSubstring = systemInfoData.substring(ethernetDetailsIndex);

            // Extract the CPU model name using a regular expression
            const ethernetinterface = ethernetDetailsSubstring.match(/Ethernet Interface: (.+)/);
            if (ethernetinterface && ethernetinterface.length >= 2) {
            document.getElementById('ethernet_interface').innerHTML = 'Interface - ' + ethernetinterface[1];
            }

            const ethernetspeed = ethernetDetailsSubstring.match(/Speed: (.+)/);
            if (ethernetspeed && ethernetspeed.length >= 2) {
            document.getElementById('ethernet_speed').innerHTML = 'Speed - ' + ethernetspeed[1];
            }

            
            
        }else
        document.getElementById('ethernet_interface').innerHTML = 'Ethernet Details not found';
}


function extractTouchpadDetails(systemInfoData) {
    const touchpadDetailsIndex = systemInfoData.indexOf('-------Touchpad Details');
    if (touchpadDetailsIndex !== -1) {
        const touchpadDetailsSubstring = systemInfoData.substring(touchpadDetailsIndex);

        // Extract the CPU model name using a regular expression
        const touchpadmodel = touchpadDetailsSubstring.match(/Model: (.+)/);
        if (touchpadmodel && touchpadmodel.length >= 2) {
        document.getElementById('touchpad_deivce').innerHTML = touchpadmodel[1];
        }
        
    }else
    document.getElementById('touchpad_deivce').innerHTML = 'Touchpad Details not found';
}

function extractKeyboardDetails(systemInfoData) {
    const keyboardDetailsIndex = systemInfoData.indexOf('-------Keyboard Details');
    if (keyboardDetailsIndex !== -1) {
        const keyboardDetailsSubstring = systemInfoData.substring(keyboardDetailsIndex);

        // Extract the CPU model name using a regular expression
        const keyboardmodel = keyboardDetailsSubstring.match(/Model: (.+)/);
        if (keyboardmodel && keyboardmodel.length >= 2) {
        document.getElementById('keyboard_deivce').innerHTML = keyboardmodel[1];
        }

        
    }else
    document.getElementById('keyboard_deivce').innerHTML = 'Keyboard Details not found';
}


function extractAudioDetails(systemInfoData) {
    const audioDetailsIndex = systemInfoData.indexOf('-------Audio Details');
    if (audioDetailsIndex !== -1) {
        const audioDetailsSubstring = systemInfoData.substring(audioDetailsIndex);

        // Extract the CPU model name using a regular expression
        const audiovendor = audioDetailsSubstring.match(/Vendor Name: (.+)/);
        if (audiovendor && audiovendor.length >= 2) {
        document.getElementById('audio_vendor').innerHTML =  audiovendor[1];
        }

        
    }else
    document.getElementById('audio_vendor').innerHTML = 'Audio Details not found';
}

      function displaySystemInfo() {
          // Display system information if available
          if (systemInfoData) {
              //document.getElementById('system-info').style.display = 'block';
             // document.getElementById('system-info').innerText = systemInfoData;
          } else {
              // Fetch data if not already fetched
              fetchSystemInfo();
          }
      }

      function extractSection(data, heading) {
          const startIndex = data.indexOf(heading);
          if (startIndex !== -1) {
              const endIndex = data.indexOf('-------', startIndex + 1);
              if (endIndex !== -1) {
                  return data.substring(startIndex, endIndex).trim();
              }
          }
          return 'Section not found';
      }

     



      


displaySystemInfo();

// Function to show the comparison popup
function openComparepopup_sysinfo(){
    document.getElementById('overlay_fetching_comparison_popup_sysinfo').style.display = 'flex';
    //document.getElementById('comparisonPopup').style.display = 'block';   
    document.getElementById('contentFrame_compare_sysinfo').style.display = 'block';  
   
}

function showinfoDetailsPopup(device) {

    if(device == 'cpu'){
       // Extract CPU details
    const deviceDetails = extractSection(systemInfoData, '-------CPU Details');
    const formatteddeviceDetails = deviceDetails.replace(/(?:\r\n|\r|\n)/g, '<br>');
    // Display CPU details in the modal
    document.getElementById('info-details-content').innerHTML = `<h2>CPU Details</h2><p>${formatteddeviceDetails}</p>`;
    document.getElementById('info-details-modal').style.display = 'block';
    }

    if(device == 'gpu'){
        // Extract CPU details
     const deviceDetails = extractSection(systemInfoData, '-------GPU Details');
     const formatteddeviceDetails = deviceDetails.replace(/(?:\r\n|\r|\n)/g, '<br>');
     // Display CPU details in the modal
     document.getElementById('info-details-content').innerHTML = `<h2>GPU Details</h2><p>${formatteddeviceDetails}</p>`;
     document.getElementById('info-details-modal').style.display = 'block';
     }

     if(device == 'ram'){
        // Extract CPU details
     const deviceDetails = extractSection(systemInfoData, '-------RAM Details');
     const formatteddeviceDetails = deviceDetails.replace(/(?:\r\n|\r|\n)/g, '<br>');
     // Display CPU details in the modal
     document.getElementById('info-details-content').innerHTML = `<h2>RAM Details</h2><p>${formatteddeviceDetails}</p>`;
     document.getElementById('info-details-modal').style.display = 'block';
     }

     if(device == 'display'){
        // Extract CPU details
     const deviceDetails = extractSection(systemInfoData, '-------Display Details');
     const formatteddeviceDetails = deviceDetails.replace(/(?:\r\n|\r|\n)/g, '<br>');
     // Display CPU details in the modal
     document.getElementById('info-details-content').innerHTML = `<h2>Display Details</h2><p>${formatteddeviceDetails}</p>`;
     document.getElementById('info-details-modal').style.display = 'block';
     }

     if(device == 'battery'){
        // Extract CPU details
     const deviceDetails = extractSection(systemInfoData, '-------Battery Details');
     const formatteddeviceDetails = deviceDetails.replace(/(?:\r\n|\r|\n)/g, '<br>');
     // Display CPU details in the modal
     document.getElementById('info-details-content').innerHTML = `<h2>Bettery Details</h2><p>${formatteddeviceDetails}</p>`;
     document.getElementById('info-details-modal').style.display = 'block';
     }

     if(device == 'wifi'){
        // Extract CPU details
     const deviceDetails = extractSection(systemInfoData, '-------Wifi Details');
     const formatteddeviceDetails = deviceDetails.replace(/(?:\r\n|\r|\n)/g, '<br>');
     // Display CPU details in the modal
     document.getElementById('info-details-content').innerHTML = `<h2>Wifi Details</h2><p>${formatteddeviceDetails}</p>`;
     document.getElementById('info-details-modal').style.display = 'block';
     }

     if(device == 'ethernet'){
        // Extract CPU details
     const deviceDetails = extractSection(systemInfoData, '-------Ethernet Details');
     const formatteddeviceDetails = deviceDetails.replace(/(?:\r\n|\r|\n)/g, '<br>');
     // Display CPU details in the modal
     document.getElementById('info-details-content').innerHTML = `<h2>Ethernet Details</h2><p>${formatteddeviceDetails}</p>`;
     document.getElementById('info-details-modal').style.display = 'block';
     }

     if(device == 'keyboard'){
        // Extract CPU details
     const deviceDetails = extractSection(systemInfoData, '-------Keyboard Details');
     const formatteddeviceDetails = deviceDetails.replace(/(?:\r\n|\r|\n)/g, '<br>');
     // Display CPU details in the modal
     document.getElementById('info-details-content').innerHTML = `<h2>Keyboard Details</h2><p>${formatteddeviceDetails}</p>`;
     document.getElementById('info-details-modal').style.display = 'block';
     }

     if(device == 'touchpad'){
        // Extract CPU details
     const deviceDetails = extractSection(systemInfoData, '-------Touchpad Details');
     const formatteddeviceDetails = deviceDetails.replace(/(?:\r\n|\r|\n)/g, '<br>');
     // Display CPU details in the modal
     document.getElementById('info-details-content').innerHTML = `<h2>Touchpad Details</h2><p>${formatteddeviceDetails}</p>`;
     document.getElementById('info-details-modal').style.display = 'block';
     }
    
     if(device == 'audio'){
        // Extract CPU details
     const deviceDetails = extractSection(systemInfoData, '-------Audio Details');
     const formatteddeviceDetails = deviceDetails.replace(/(?:\r\n|\r|\n)/g, '<br>');
     // Display CPU details in the modal
     document.getElementById('info-details-content').innerHTML = `<h2>Audio Details</h2><p>${formatteddeviceDetails}</p>`;
     document.getElementById('info-details-modal').style.display = 'block';
     }

    }
    
    function closeInfoDetailsPopup() {
    // Close the CPU details modal
    document.getElementById('info-details-modal').style.display = 'none';
    }


    
    function closeComparisonPopup_sysinfo() {
        document.getElementById('overlay_fetching_comparison_popup_sysinfo').style.display = 'none';
        //document.getElementById('comparisonPopup').style.display = 'block';   
        document.getElementById('contentFrame_compare_sysinfo').style.display = 'none';  
    }


  
document.addEventListener('DOMContentLoaded', function () {

  
// Your script code here
window.particlesJS("particleCanvas-Blue1", {
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
particlesJS("particleCanvas-White1", {
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

 function runDownloadCommand() {
      // Change the URL to match your server endpoint
      fetch('/download_system_info')
        .then(response => response.blob())
        .then(blob => {
          const a = document.createElement('a');
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = 'hardware_map_output.txt';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error:', error));
    }

document.getElementById('save_button_system_info').addEventListener('click', function() {
// Display loading icon
fetch('/convert-to-json') // Update with the correct endpoint
                .then(response => response.json())
                .then(data => {
                   console.log(data);
                })
                .catch(error => {
                    console.error('Error fetching system info:', error);
                    //const systemInfoElement = document.getElementById('systemInfo');
                    //systemInfoElement.innerHTML = 'Error fetching system info.';
                });

     document.getElementById("save_button_system_info").innerText= "Saved!";


});
var fm_ram = new FluidMeter();
fm_ram.init({
      targetContainer: document.getElementById("fluid-meter-ram"),
      fillPercentage: 0,
      options: {
        fontFamily: "Raleway",
        drawPercentageSign: true,
        drawBubbles: true,
        size: 300,
        borderWidth: 10,
        backgroundColor: "#2ecc7055",
        foregroundColor: "#fafafa55",
        foregroundFluidLayer: {
          fillStyle: "#e74d3c",
          angularSpeed: 100,
          maxAmplitude: 12,
          frequency: 30,
          horizontalSpeed: -150
        },
        backgroundFluidLayer: {
          fillStyle: "pink",
          angularSpeed: 100,
          maxAmplitude: 9,
          frequency: 30,
          horizontalSpeed: 150
        }
      }
    });


    var fm_swap = new FluidMeter();
    fm_swap.init({
      targetContainer: document.getElementById("fluid-meter-swap"),
      fillPercentage: 0,
      options: {
        fontFamily: "Raleway",
        drawPercentageSign: true,
        drawBubbles: true,
        size: 300,
        borderWidth: 10,
        backgroundColor: "#2ecc7055",
        foregroundColor: "#fafafa55",
        foregroundFluidLayer: {
          fillStyle: "#e74d3c",
          angularSpeed: 100,
          maxAmplitude: 12,
          frequency: 30,
          horizontalSpeed: -150
        },
        backgroundFluidLayer: {
          fillStyle: "pink",
          angularSpeed: 100,
          maxAmplitude: 9,
          frequency: 30,
          horizontalSpeed: 150
        }
      }
    });
   

      // Function to update the chart with dynamic values
      function updateChart(total, usedValue, freeValue) {
            // Get the elements
           // var used = document.getElementById('used');
           // var free = document.getElementById('free');
            var ramtotal = document.getElementById('ramtotal');
            // Calculate the percentages
            var usedPercentage = (usedValue / total) * 100;
            var freePercentage = (freeValue / total) * 100;

            // Set the width of the segments
           // used.style.width = usedPercentage + '%';
           // free.style.width = freePercentage + '%';
            //console.log(freeValue);
            // Update tooltip titles
           // used.title = 'Used: ' + usedValue + ' Gb';
            //free.title = 'Free: ' + freeValue + ' Gb';
           
            //used.innerText="Used: "+ usedPercentage.toFixed(1) + '%';
            //free.innerText="Free: "+ freePercentage.toFixed(1) + '%';
           
            ramtotal.innerText="Memory: "+usedValue+' of '+total + ' Gb';
        }

        // Example usage:
        //var total = 10; // replace with your actual total value
       // var usedValue = 4; // replace with your actual used value
       // var freeValue = 5; // replace with your actual free value
        //updateChart(total, usedValue, freeValue);

        

        function parseOutputData(output) {
            const regex = /Total: ([0-9.]+) GB\nUsed: ([0-9.]+) GB\nFree: ([0-9.]+) GB/;
            const matches = output.match(regex);

            if (matches && matches.length === 4) {
                const total = parseFloat(matches[1]);
                const used = parseFloat(matches[2]);
                const free = parseFloat(matches[3]);
                return { total, used, free };
            } else {
                console.error('Failed to parse RAM data from the server output');
                return null;
            }
        }

        function fetchAndUpdateRAMUsage() {
           

                fetch('/get_ram_swap_usage') // Update with the correct endpoint
                .then(response => response.json())
                .then(data => {
                    //const systemInfoElement = document.getElementById('systemInfo');

                    // Check if 'ram' and 'swap' properties exist in the response
                    if (data.ram && data.swap) {
                        const { total: ramTotal, used: ramUsed, free: ramFree } = data.ram;
                        const { total: swapTotal, used: swapUsed, free: swapFree } = data.swap;

                        // systemInfoElement.innerHTML = `
                        //     <h2>System Info</h2>
                        //     <h3>RAM Usage</h3>
                        //     <p>Total: ${ramTotal.toFixed(2)} GB</p>
                        //     <p>Used: ${ramUsed.toFixed(2)} GB</p>
                        //     <p>Free: ${ramFree.toFixed(2)} GB</p>
                        //     <h3>Swap Usage</h3>
                        //     <p>Total: ${swapTotal.toFixed(2)} GB</p>
                        //     <p>Used: ${swapUsed.toFixed(2)} GB</p>
                        //     <p>Free: ${swapFree.toFixed(2)} GB</p>
                        // `;

                        var ram_usedPercentage = (ramUsed / ramTotal) * 100;
                        var ram_freePercentage = (ramFree / ramTotal) * 100;
                        var swap_usedPercentage = (swapUsed.toFixed(2) / swapTotal.toFixed(2)) * 100;
                        var swap_freePercentage = (swapFree / swapTotal) * 100;

                        if(swap_usedPercentage<0){
                          swap_usedPercentage=0;
                        }
                        fm_ram.setPercentage(Number(ram_usedPercentage));
                        fm_swap.setPercentage(Number(swap_usedPercentage));
                         
                        var ramtotal = document.getElementById('ramtotal');
                        ramtotal.innerText="RAM: "+ramUsed.toFixed(2)+' of '+ramTotal.toFixed(2) + ' Gb';
                        var swaptotal = document.getElementById('swaptotal');
                        swaptotal.innerText="SWAP: "+swapUsed.toFixed(2)+' of '+swapTotal.toFixed(2) + ' Gb';

                    } else {
                      console.error('Error fetching system info');
                    }
                })
                .catch(error => {
                    console.error('Error fetching system info:', error);
                    //const systemInfoElement = document.getElementById('systemInfo');
                    //systemInfoElement.innerHTML = 'Error fetching system info.';
                });
        }

        function fetchSystemName() {
           

            fetch('/system_name') // Update with the correct endpoint
            .then(response => response.json())
            .then(data => {
                console.log("in sysinfo - ",data.output);
                // Check if 'ram' and 'swap' properties exist in the response
                if (data.output) {
                    
// Split the string into lines
let lines = data.output.split('\n');

// Extract vendor and model information
let vendorInfo = lines[0].split(': ')[1];
let modelInfo = lines[1].split(': ')[1];

// Assuming you have an HTML element with id="systemInfo" to display the information
let systemInfoElement = document.getElementById('system-name');

// Create HTML content to display the information
let htmlContent = `
    <p><strong>System Vendor:</strong> ${vendorInfo}</p>
    <p><strong>System Model:</strong> ${modelInfo}</p>
`;

// Set the HTML content to the systemInfo element
systemInfoElement.innerHTML = htmlContent;
                } else {
                  console.error('Error fetching system info');
                }
            })
            .catch(error => {
                console.error('Error fetching system info:', error);
                //const systemInfoElement = document.getElementById('systemInfo');
                //systemInfoElement.innerHTML = 'Error fetching system info.';
            });
    }

        // Update RAM usage every 5 seconds (adjust as needed)
        setInterval(fetchAndUpdateRAMUsage, 1000);

        // Initial update
        fetchAndUpdateRAMUsage();
        fetchSystemName();
  