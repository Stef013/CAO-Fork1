package Controller;

import Logic.Registration;

public class RegistrationController {

    Registration RL = new Registration();

    public void RegistrateUser()
    {
        RL.registrateCustomer(null);
    }

}
