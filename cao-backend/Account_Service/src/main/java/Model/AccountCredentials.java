package Model;

import Interface.IAccount;
import Interface.IAccountCredentials;
import Utilities.Cryptography;

public class AccountCredentials implements IAccountCredentials {
    private String email;
    private String password;
    private final Cryptography cryptography = new Cryptography();

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isMatchingAccount(IAccount account) {
        return account != null &&
                this.email.equals(account.getEmail()) &&
                cryptography.hash(this.password).equals(account.getPassword());
    }
}
