package Interface;

import Model.Customer;

import java.util.List;

public interface ICustomerRepo {

    boolean create(Customer newCustomer);

    Customer get(String userEmail);

    public List<Customer> getAll();

    boolean update(Customer customer);

    boolean delete(int id);

    boolean checkEmail(String email);

    void closeConnection();
}
