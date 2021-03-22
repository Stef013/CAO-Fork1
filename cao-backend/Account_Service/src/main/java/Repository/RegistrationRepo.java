package Repository;

import Interface.IRegistration;
import Model.Customer;
import javax.persistence.*;

public class RegistrationRepo implements IRegistration {

    @PersistenceContext
    private static EntityManagerFactory emf;
    private static EntityManager em;

    public RegistrationRepo(String persistenceUnit) {
        emf = Persistence.createEntityManagerFactory(persistenceUnit);
        em = emf.createEntityManager();
    }

    @Override
    public void closeConnection() {
        emf.close();
    }

    @Override
    public boolean insertCustomer(Customer newCustomer) {
        try {
            // hashing = new Hashing();
            // String hashedPassword = hashing.hash(user.getPassword());
            // user.setPassword(hashedPassword);

            em.getTransaction().begin();

            em.persist(newCustomer);
            em.getTransaction().commit();

            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
