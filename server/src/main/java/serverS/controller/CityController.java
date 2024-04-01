package serverS.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import serverS.dto.CityDTO;
import serverS.model.City;
import serverS.service.ICityService;
import serverS.service.ICrudService;

import java.util.List;

@RestController
@RequestMapping("city")
public class CityController extends CrudController<City, CityDTO, Long> {

    private final ICityService cityService;
    private final ModelMapper modelMapper;

    public CityController(ICityService cityService, ModelMapper modelMapper) {
        super(City.class, CityDTO.class);
        this.cityService = cityService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<City, Long> getService() {
        return cityService;
    }

    @Override
    public ModelMapper getModelMapper() {
        return modelMapper;
    }

    @GetMapping("city")
    public ResponseEntity<List<City>> findAllByCity(@RequestParam String city) {
        return ResponseEntity.ok(cityService.findAllByCity(city));
    }
}
