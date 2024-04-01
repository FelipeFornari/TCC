package serverS.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import serverS.model.City;
import serverS.repository.CityRepository;
import serverS.service.ICityService;

import java.util.List;

@Service
public class CityServiceImpl extends CrudServiceImpl<City, Long>
        implements ICityService {
    private final CityRepository cityRepository;

    public CityServiceImpl(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    protected JpaRepository<City, Long> getRepository() {
        return cityRepository;
    }

    @Override
    public void delete(Long id) {
        super.delete(id);
    }

    @Override
    public List<City> findAllByCity(String city) {
        return cityRepository.findAllByCity(city);
    }
}
