package serverS.service;


import serverS.model.City;

import java.util.List;

public interface ICityService extends ICrudService<City, Long> {
    List<City> findAllByCity(String city);
}
