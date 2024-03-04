#include <iostream>
#include <iomanip>
#include <jsoncpp/json/json.h> // Make sure to have the JsonCpp library installed

#ifdef _WIN32
#include <windows.h>
#else
#include <sys/sysinfo.h>
#endif

// Function to get RAM usage information
Json::Value getRamUsage() {
    Json::Value ramInfo;
#ifdef _WIN32
    MEMORYSTATUSEX status;
    status.dwLength = sizeof(status);
    GlobalMemoryStatusEx(&status);
    ramInfo["total"] = static_cast<double>(status.ullTotalPhys) / (1024 * 1024 * 1024);
    ramInfo["used"] = static_cast<double>(status.ullTotalPhys - status.ullAvailPhys) / (1024 * 1024 * 1024);
    ramInfo["free"] = static_cast<double>(status.ullAvailPhys) / (1024 * 1024 * 1024);
#else
    struct sysinfo info;
    sysinfo(&info);
    ramInfo["total"] = static_cast<double>(info.totalram * info.mem_unit) / (1024 * 1024 * 1024);
    ramInfo["used"] = static_cast<double>((info.totalram - info.freeram) * info.mem_unit) / (1024 * 1024 * 1024);
    ramInfo["free"] = static_cast<double>(info.freeram * info.mem_unit) / (1024 * 1024 * 1024);
#endif
    return ramInfo;
}

// Function to get swap usage information
Json::Value getSwapUsage() {
    Json::Value swapInfo;
#ifdef _WIN32
    // Windows does not provide direct API for swap information, so set it to 0 for now
    swapInfo["total"] = 0.0;
    swapInfo["used"] = 0.0;
    swapInfo["free"] = 0.0;
#else
    struct sysinfo info;
    sysinfo(&info);
    swapInfo["total"] = static_cast<double>(info.totalswap * info.mem_unit) / (1024 * 1024 * 1024);
    swapInfo["used"] = static_cast<double>((info.totalswap - info.freeswap) * info.mem_unit) / (1024 * 1024 * 1024);
    swapInfo["free"] = static_cast<double>(info.freeswap * info.mem_unit) / (1024 * 1024 * 1024);
#endif
    return swapInfo;
}

int main() {
    Json::Value systemInfo;
    systemInfo["ram"] = getRamUsage();
    systemInfo["swap"] = getSwapUsage();

    // Output JSON response
    std::cout << systemInfo << std::endl;

    return 0;
}
