package serverS.repository;

import org.springframework.data.geo.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import serverS.model.Local;

import java.util.List;

public interface LocalRepository extends JpaRepository<Local, Long> {

    List<Local> findAllByNameContaining(String name);

    Local findAllByCoordinate(Double[] coordinate);
}
