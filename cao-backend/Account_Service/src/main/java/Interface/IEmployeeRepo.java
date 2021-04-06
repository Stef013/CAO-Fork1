package Interface;

import Model.Employee;
import Model.UpdateEmployee;

public interface IEmployeeRepo {

    boolean create(Employee newEmployee);

    Employee get(String userEmail);

    boolean update(Employee employee);

    boolean updateRole(UpdateEmployee updateRole);

    boolean delete(int id);

    boolean checkEmail(String email);

    void closeConnection();
}
