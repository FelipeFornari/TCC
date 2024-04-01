package serverS.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import serverS.dto.LocalDTO;
import serverS.model.Local;
import serverS.service.ICrudService;
import serverS.service.ILocalService;

import java.util.List;

@RestController
@RequestMapping("locals")
public class LocalController extends CrudController<Local, LocalDTO, Long> {

    private final ILocalService localService;
    private final ModelMapper modelMapper;

    public LocalController(ILocalService localService, ModelMapper modelMapper) {
        super(Local.class, LocalDTO.class);
        this.localService = localService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Local, Long> getService() {
        return localService;
    }

    @Override
    public ModelMapper getModelMapper() {
        return modelMapper;
    }

    @GetMapping("name")
    public ResponseEntity<List<Local>> findByName(@RequestParam String name) {
        return ResponseEntity.ok(localService.findByName(name));
    }


}
