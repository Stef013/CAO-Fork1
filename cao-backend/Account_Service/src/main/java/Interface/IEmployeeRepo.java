package Interface;

import Model.Customer;
import Model.Employee;
import Model.RoleUpdate;

public interface IEmployeeRepo {

    boolean create(Employee newEmployee);

    Employee get(String userEmail);

    boolean update(Employee employee);

    boolean updateRole(RoleUpdate updateRole);

    boolean delete(int id);

    boolean checkEmail(String email);

    void closeConnection();
}
