package Interface;

import Model.Customer;
import Model.Employee;

public interface IEmployeeRepo {

    boolean create(Employee newEmployee);

    Employee get(String userEmail);

    boolean update(Employee employee);

    boolean delete(int id);

    boolean checkEmail(String email);

    void closeConnection();
}
