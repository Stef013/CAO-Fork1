package Logic;

import Model.Customer;
import Model.Employee;
import Model.UpdateEmployeeRole;
import Repository.CustomerSqlRepository;
import Repository.EmployeeSqlRepository;

import java.util.List;

public class Registration {

    CustomerSqlRepository CR = new CustomerSqlRepository();
    EmployeeSqlRepository ER = new EmployeeSqlRepository();

    public boolean registerCustomer(Customer newCustomer) {
        if (newCustomer != null && newCustomer.getEmail() != null && !newCustomer.getEmail().isBlank()
                && newCustomer.getPassword() != null && !newCustomer.getPassword().isBlank()
                && newCustomer.getFirstname() != null && !newCustomer.getFirstname().isBlank()
                && newCustomer.getLastname() != null && !newCustomer.getLastname().isBlank()
                && newCustomer.getNationality() != null && !newCustomer.getNationality().isBlank()
                && newCustomer.getDateOfBirth() != null) {
            return CR.create(newCustomer);
        }

        return false;
    }

    public Customer getCustomer(String customerEmail) {
        if (customerEmail != null && !customerEmail.isBlank()) {
            return CR.get(customerEmail);
        }
        return null;
    }

    public List<Customer> getAllCustomer() {
        List<Customer> allCustomers = CR.getAll();
        if (allCustomers != null && allCustomers.size() > 0) {
            return allCustomers;
        }
        return null;
    }

    public boolean updateCustomer(Customer updateCustomer) {
        if (updateCustomer != null && updateCustomer.getEmail() != null && !updateCustomer.getEmail().isBlank()
                && updateCustomer.getPassword() != null && !updateCustomer.getPassword().isBlank()
                && updateCustomer.getFirstname() != null && !updateCustomer.getFirstname().isBlank()
                && updateCustomer.getLastname() != null && !updateCustomer.getLastname().isBlank()
                && updateCustomer.getNationality() != null && !updateCustomer.getNationality().isBlank()
                && updateCustomer.getDateOfBirth() != null) {
            return CR.create(updateCustomer);
        }
        return false;
    }

    public boolean deleteCustomer(int id) {
        if (id != 0) {
            return CR.delete(id);
        }
        return false;
    }

    public boolean checkCustomer(String customerEmail) {
        if (customerEmail != null && !customerEmail.isBlank()) {
            return CR.checkEmail(customerEmail);
        }
        return false;
    }

    /////////////// employee////////////////////
    public boolean registerEmployee(Employee newEmployee) {
        if (newEmployee != null && newEmployee.getEmail() != null && !newEmployee.getEmail().isBlank()
                && newEmployee.getPassword() != null && !newEmployee.getPassword().isBlank()
                && newEmployee.getFirstname() != null && !newEmployee.getFirstname().isBlank()
                && newEmployee.getLastname() != null && !newEmployee.getLastname().isBlank()
                && newEmployee.getRole() != null) {
            return ER.create(newEmployee);
        }

        return false;
    }

    public Employee getEmployee(String employeeEmail) {
        if (employeeEmail != null && !employeeEmail.isBlank()) {
            return ER.get(employeeEmail);
        }
        return null;
    }

    public List<Employee> getAllEmployee() {

        List<Employee> allEmployees = ER.getAll();

        if (allEmployees != null && allEmployees.size() > 0) {
            return allEmployees;
        }
        return null;
    }

    public boolean update(Employee updateEmployee) {
        if (updateEmployee != null && updateEmployee.getEmail() != null && !updateEmployee.getEmail().isBlank()
                && updateEmployee.getPassword() != null && !updateEmployee.getPassword().isBlank()
                && updateEmployee.getFirstname() != null && !updateEmployee.getFirstname().isBlank()
                && updateEmployee.getLastname() != null && !updateEmployee.getLastname().isBlank()
                && updateEmployee.getRole() != null) {
            return ER.update(updateEmployee);
        }
        return false;
    }

    public boolean updateEmployee(UpdateEmployeeRole employeeToUpdate) {
        if (employeeToUpdate == null || employeeToUpdate.getUserId() == 0 || employeeToUpdate.getRole() != null) {
            return false;
        }

        if (!employeeToUpdate.getPassword().isEmpty() && employeeToUpdate.getPassword() != null) {
            return ER.updateRole(employeeToUpdate);
        }

        return ER.updateRoleAndPassword(employeeToUpdate);
    }

    public boolean deleteEmployee(int id) {
        if (id != 0) {
            return ER.delete(id);
        }
        return false;
    }

    public boolean checkEmployee(String employeeEmail) {
        if (employeeEmail != null && !employeeEmail.isBlank()) {
            return ER.accountWithEmailExists(employeeEmail);
        }
        return false;
    }

}
