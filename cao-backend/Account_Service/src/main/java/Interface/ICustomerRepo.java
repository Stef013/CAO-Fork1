package Interface;

import Model.Customer;

public interface ICustomerRepo {

    boolean create(Customer newCustomer);

    Customer get(String userEmail);

    boolean update(Customer customer);

    boolean delete(int id);

    boolean checkEmail(String email);

    void closeConnection();
}
