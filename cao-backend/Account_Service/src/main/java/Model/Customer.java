package Model;

import Interface.IAccount;

import java.util.*;

public class Customer implements IAccount {

    private int id;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String nationality;
    private Date dateOfBirth;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Customer() {

    }

    public Customer(String email, String password, String firstname, String lastname, String nationality,
            Date dateOfBirth) {
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.nationality = nationality;
        this.dateOfBirth = dateOfBirth;
    }

    public Customer(int id, String email, String password, String firstname, String lastname, String nationality,
                    Date dateOfBirth) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.nationality = nationality;
        this.dateOfBirth = dateOfBirth;
    }
}
