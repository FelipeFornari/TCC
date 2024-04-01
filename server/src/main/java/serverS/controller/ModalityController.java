package serverS.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serverS.dto.ModalityDTO;
import serverS.model.Modality;
import serverS.service.ICrudService;
import serverS.service.IModalityService;

@RestController
@RequestMapping("modalities")
public class ModalityController extends CrudController<Modality, ModalityDTO, Long> {

    private final IModalityService modalityService;
    private final ModelMapper modelMapper;

    public ModalityController(IModalityService modalityService, ModelMapper modelMapper) {
        super(Modality.class, ModalityDTO.class);
        this.modalityService = modalityService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Modality, Long> getService() {
        return modalityService;
    }

    @Override
    public ModelMapper getModelMapper() {
        return modelMapper;
    }
}
