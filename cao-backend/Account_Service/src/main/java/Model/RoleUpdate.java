package Model;
import Enum.Roles;

public class RoleUpdate {

    private int userId;
    private Roles role;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    public RoleUpdate() {
    }
}
