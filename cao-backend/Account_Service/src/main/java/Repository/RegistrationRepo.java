package Repository;

import Interface.IRegistration;
import Model.RegistrationCustomer;


public class RegistrationRepo implements IRegistration {

    public boolean RegistrateCustomer(RegistrationCustomer newCustomer)
    {
        boolean result = false;

        try{
            result = true;
        }
        catch (Exception ex)
        {
            System.out.println(ex.toString());
        }
        return result;
    }

}
