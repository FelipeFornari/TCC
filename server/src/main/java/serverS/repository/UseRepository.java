package serverS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import serverS.model.Local;
import serverS.model.Use;

import java.util.List;

public interface UseRepository extends JpaRepository<Use, Long> {
    List<Use> findByLocal(Local local);

    List<Use> findAllByLocalId(Long id);
}
