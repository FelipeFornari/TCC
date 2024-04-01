package serverS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import serverS.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByUsername(String username);

}
