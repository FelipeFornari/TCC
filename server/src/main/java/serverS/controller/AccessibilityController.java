package serverS.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serverS.dto.AccessibilityDTO;
import serverS.model.Accessibility;
import serverS.service.IAccessibilityService;
import serverS.service.ICrudService;

@RestController
@RequestMapping("accessibility")
public class AccessibilityController extends CrudController<Accessibility, AccessibilityDTO, Long> {

    private final IAccessibilityService accessibilityService;
    private final ModelMapper modelMapper;

    public AccessibilityController(IAccessibilityService accessibilityService, ModelMapper modelMapper) {
        super(Accessibility.class, AccessibilityDTO.class);
        this.accessibilityService = accessibilityService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Accessibility, Long> getService() {
        return accessibilityService;
    }

    @Override
    public ModelMapper getModelMapper() {
        return modelMapper;
    }

}
