package Interface;

import Model.Employee;

public interface IEmployeeRepository {

    Employee checkLogin(String email, String password);

}
