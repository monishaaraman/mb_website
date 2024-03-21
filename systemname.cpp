#include <iostream>
#include <fstream>
#include <string>

int main() {
    // Read system vendor
    std::ifstream sys_vendor_file("/sys/class/dmi/id/sys_vendor");
    if (!sys_vendor_file.is_open()) {
        std::cerr << "Error: Unable to open sys_vendor file." << std::endl;
        return 1;
    }

    std::string sys_vendor;
    std::getline(sys_vendor_file, sys_vendor);
    sys_vendor_file.close();

    // Read system model
    std::ifstream sys_model_file("/sys/class/dmi/id/product_name");
    if (!sys_model_file.is_open()) {
        std::cerr << "Error: Unable to open sys_model file." << std::endl;
        return 1;
    }

    std::string sys_model;
    std::getline(sys_model_file, sys_model);
    sys_model_file.close();

    // Print system vendor and model
    std::cout << "System Vendor: " << sys_vendor << std::endl;
    std::cout << "System Model: " << sys_model << std::endl;

    return 0;
}
