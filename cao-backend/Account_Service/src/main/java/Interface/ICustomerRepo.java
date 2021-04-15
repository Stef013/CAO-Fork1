package Interface;

import Model.Customer;

import java.util.List;

<<<<<<< HEAD:cao-backend/Account_Service/src/main/java/Interface/ICustomerRepository.java
public interface ICustomerRepository {
=======
public interface ICustomerRepo {
>>>>>>> 45187750bb09b7b303db11893d430ee08e5880ae:cao-backend/Account_Service/src/main/java/Interface/ICustomerRepo.java

    boolean create(Customer newCustomer);

    Customer get(String userEmail);

    public List<Customer> getAll();

    boolean update(Customer customer);

    boolean delete(int id);

    boolean checkEmail(String email);

    void closeConnection();
}
