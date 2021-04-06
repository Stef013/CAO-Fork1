package Interface;

import Model.Employee;
import Model.AccountCredentials;
import Model.RoleUpdate;

public interface IEmployeeRepository {
    /**
     * Create a new Employee account
     * @param newEmployee The new Employee object
     * @return Whether or not the creation succeeded
     */
    boolean create(Employee newEmployee);

    /**
     * Retrieve the Employee account details
     * @param userEmail The e-mail address of the Employee
     * @return An object with the Employee, or null if authentication failed
     */
    Employee get(String userEmail);

    /**
     * Update the Employee account details
     * @param employee The updated Employee object
     * @return Whether or not the update succeeded
     */
    boolean update(Employee employee);

    /**
     * Update the role of an Employee
     * @param newRole The new role to assign to the Employee account
     * @return Whether or not the update succeeded
     */
    boolean setRole(RoleUpdate newRole);

    /**
     * Delete an Employee account
     * @param id The id of the Employee account
     * @return Whether or not the erasure succeeded
     */
    boolean delete(int id);

    /**
     * Check if an Employee account with the given e-mail address exists
     * @param email The e-mail address to check
     * @return Whether or not an Employee account with the given e-mail address exists
     */
    boolean accountWithEmailExists(String email);

}
