package Repository;

import Interface.IEmployeeRepository;
import Model.Employee;
import Enum.Roles;

public class EmployeeSqlRepository implements IEmployeeRepository {

    @Override
    public Employee checkLogin(String email, String password) {
        if(email == "axel@connectedairlines.com" && password == "Fontys") {
            return new Employee(
                    1,
                    "axel@connectedairlines.com",
                    null,
                    "Axel",
                    "Kohler",
                    Roles.EMPLOYEE
            );
        }
        else {
            return null;
        }
    }
}
