package Repository;

import Interface.IRegistration;
import Model.Customer;

public class RegistrationRepo implements IRegistration {

    public void closeConnection() {
        // TODO Auto-generated method stub

    }

    @Override
    public boolean create(Customer newCustomer) {
        // hashing = new Hashing();
        // String hashedPassword = hashing.hash(user.getPassword());
        // user.setPassword(hashedPassword);

        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public Customer get(String email) {
        // TODO Auto-generated method stub
        return null;
    }

    public boolean checkEmail(String email) {
        try {
            // check of email bestaat
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    @Override
    public boolean update(Customer customer) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean delete(Customer customer) {
        // TODO Auto-generated method stub
        return false;
    }

}
