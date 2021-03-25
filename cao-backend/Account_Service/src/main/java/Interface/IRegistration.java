package Interface;

import Model.Customer;

public interface IRegistration {

    boolean create(Customer newCustomer);

    Customer get(String email);

    boolean update(Customer customer);

    boolean delete(Customer customer);

    boolean checkEmail(String email);

    void closeConnection();
}
