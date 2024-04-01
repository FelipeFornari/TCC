package serverS.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serverS.dto.ConvenienceDTO;
import serverS.model.Convenience;
import serverS.service.IConvenienceService;
import serverS.service.ICrudService;

@RestController
@RequestMapping("convenience")
public class ConvenienceController extends CrudController<Convenience, ConvenienceDTO, Long> {

    private final IConvenienceService convenienceService;
    private final ModelMapper modelMapper;

    public ConvenienceController(IConvenienceService convenienceService, ModelMapper modelMapper) {
        super(Convenience.class, ConvenienceDTO.class);
        this.convenienceService = convenienceService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Convenience, Long> getService() {
        return convenienceService;
    }

    @Override
    public ModelMapper getModelMapper() {
        return modelMapper;
    }

}
