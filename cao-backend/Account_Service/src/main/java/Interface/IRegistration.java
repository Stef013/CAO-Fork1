package Interface;

import Model.Customer;

public interface IRegistration {

    boolean insertCustomer(Customer newCustomer);

    void closeConnection();
}
