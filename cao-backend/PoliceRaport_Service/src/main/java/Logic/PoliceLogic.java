package Logic;

import Model.SearchModel;
import Model.UserModel;
import Repository.PoliceRepo;

public class PoliceLogic {

    PoliceRepo PR = new PoliceRepo();

    public UserModel searchPerson(SearchModel personToFind)
    {
        if (personToFind != null && personToFind.getFirstname() != null && !personToFind.getFirstname().isEmpty() &&
                personToFind.getLastname() != null && !personToFind.getLastname().isEmpty() &&
                personToFind.getDateOfBirth() != null && !personToFind.getDateOfBirth().isEmpty() &&
                personToFind.getNationality() != null && !personToFind.getNationality().isEmpty())
        {
            return PR.searchPerson(personToFind);
        }

        return null;
    }

    public boolean createWarrant(SearchModel personToFind)
    {
        if (personToFind != null && personToFind.getFirstname() != null && !personToFind.getFirstname().isEmpty() &&
                personToFind.getLastname() != null && !personToFind.getLastname().isEmpty() &&
                personToFind.getDateOfBirth() != null && !personToFind.getDateOfBirth().isEmpty() &&
                personToFind.getNationality() != null && !personToFind.getNationality().isEmpty())
        {
            return PR.createWarrant(personToFind);
        }

        return false;
    }

}
