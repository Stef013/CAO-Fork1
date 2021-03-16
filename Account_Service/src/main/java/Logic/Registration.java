package Logic;

import Model.RegistrationCustomer;
import Repository.RegistrationRepo;


public class Registration {

    RegistrationRepo RR = new RegistrationRepo();

    public boolean registrateCustomer(RegistrationCustomer newCustomer)
    {
        if (newCustomer != null || newCustomer.getEmail() != null || !newCustomer.getEmail().isBlank() || newCustomer.getPassword() != null || !newCustomer.getPassword().isBlank() ||
                newCustomer.getFirstname() != null || !newCustomer.getFirstname().isBlank()|| newCustomer.getLastname() != null || !newCustomer.getLastname().isBlank() ||
                newCustomer.getNationality() != null || !newCustomer.getNationality().isBlank() || newCustomer.getDateOfBirth() != null)
        {
            return RR.RegistrateCustomer(newCustomer);
        }
        return false;

    }

}
