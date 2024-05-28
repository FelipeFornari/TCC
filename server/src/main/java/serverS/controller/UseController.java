package serverS.controller;


import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import serverS.dto.UseDTO;
import serverS.model.Local;
import serverS.model.Use;
import serverS.service.ICrudService;
import serverS.service.IUseService;

import java.util.List;

@RestController
@RequestMapping("use")
public class UseController extends CrudController<Use, UseDTO, Long> {

    private final IUseService useService;
    private final ModelMapper modelMapper;

    public UseController(IUseService useService, ModelMapper modelMapper) {
        super(Use.class, UseDTO.class);
        this.useService = useService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Use, Long> getService() {
        return useService;
    }

    @Override
    public ModelMapper getModelMapper() {
        return modelMapper;
    }

    @GetMapping("search/local")
    public ResponseEntity<List<Use>> findByLocal(@RequestParam Local local) {
        return ResponseEntity.ok(useService.findByLocal(local));
    }

    @GetMapping("search/localId")
    public ResponseEntity<List<Use>> findAllByLocalId(@RequestParam String id ){
        return ResponseEntity.ok(useService.findAllByLocalId(Long.parseLong(id)));
    }


}
