package serverS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import serverS.model.City;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {
    List<City> findAllByCity(String city);
}

