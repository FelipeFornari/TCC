package serverS.controller;


import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serverS.dto.UseDTO;
import serverS.model.Use;
import serverS.service.ICrudService;
import serverS.service.IUseService;

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

//    @GetMapping
//    public ResponseEntity<List<Local>> findAllByName(@RequestParam String name) {
//        return  ResponseEntity.ok( localsService.findAllByName(name) );
//    }
}
