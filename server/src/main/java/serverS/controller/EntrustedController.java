package serverS.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serverS.dto.EntrustedDTO;
import serverS.model.Entrusted;
import serverS.service.ICrudService;
import serverS.service.IEntrustedService;

@RestController
@RequestMapping("entrusteds")
public class EntrustedController extends CrudController<Entrusted, EntrustedDTO, Long> {

    private final IEntrustedService entrustedService;
    private final ModelMapper modelMapper;

    public EntrustedController(IEntrustedService entrustedService, ModelMapper modelMapper) {
        super(Entrusted.class, EntrustedDTO.class);
        this.entrustedService = entrustedService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Entrusted, Long> getService() {
        return entrustedService;
    }

    @Override
    public ModelMapper getModelMapper() {
        return modelMapper;
    }
}
