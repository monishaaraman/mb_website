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