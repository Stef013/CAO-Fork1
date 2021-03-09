package Services;

import javax.enterprise.context.ApplicationScoped;
import Models.RegisterModel;

@ApplicationScoped
public class AccountService {

    public String register(RegisterModel registerModel) {

        return "registeren voltooid";
    }
}