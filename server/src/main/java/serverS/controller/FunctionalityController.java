package serverS.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serverS.dto.FunctionalityDTO;
import serverS.model.Functionality;
import serverS.service.ICrudService;
import serverS.service.IFunctionalityService;

@RestController
@RequestMapping("functionalities")
public class FunctionalityController extends CrudController<Functionality, FunctionalityDTO, Long> {

    private final IFunctionalityService modalityService;
    private final ModelMapper modelMapper;

    public FunctionalityController(IFunctionalityService modalityService, ModelMapper modelMapper) {
        super(Functionality.class, FunctionalityDTO.class);
        this.modalityService = modalityService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Functionality, Long> getService() {
        return modalityService;
    }

    @Override
    public ModelMapper getModelMapper() {
        return modelMapper;
    }
}
