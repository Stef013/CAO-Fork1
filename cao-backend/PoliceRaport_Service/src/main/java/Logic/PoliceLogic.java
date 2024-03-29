package Logic;

import Model.FoundPersonModel;
import Model.InterpolFlightTicket;
import Model.SearchModel;
import Model.UserModel;
import Repository.PoliceRepo;

import java.io.IOException;
import java.util.ArrayList;

public class PoliceLogic {

    PoliceRepo PR = new PoliceRepo();

    public ArrayList<InterpolFlightTicket> searchPerson(SearchModel personToFind) throws IOException {
        if (personToFind != null && personToFind.getFirstname() != null && !personToFind.getFirstname().isEmpty()
                && personToFind.getLastname() != null && !personToFind.getLastname().isEmpty()
                && personToFind.getDateOfBirth() != null && !personToFind.getDateOfBirth().isEmpty()) {

            return PR.searchPerson(personToFind);
        }

        return null;
    }

    /*public boolean createWarrant(SearchModel personToFind) {
        if (personToFind != null && personToFind.getFirstname() != null && !personToFind.getFirstname().isEmpty()
                && personToFind.getLastname() != null && !personToFind.getLastname().isEmpty()
                && personToFind.getDateOfBirth() != null && !personToFind.getDateOfBirth().isEmpty()) {
            return PR.createWarrant(personToFind);
        }

        return false;
    }*/

}
