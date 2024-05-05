package serverS.controller;

import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.data.geo.Point;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import serverS.dto.LocalDTO;
import serverS.model.Image;
import serverS.model.Local;
import serverS.service.ICrudService;
import serverS.service.IImageService;
import serverS.service.ILocalService;

import java.util.List;

@RestController
@RequestMapping("locals")
public class LocalController extends CrudController<Local, LocalDTO, Long> {

    private final ILocalService localService;
    private final IImageService imageService;
    private final ModelMapper modelMapper;

    public LocalController(ILocalService localService, ModelMapper modelMapper, IImageService imageService) {
        super(Local.class, LocalDTO.class);
        this.localService = localService;
        this.modelMapper = modelMapper;
        this.imageService = imageService;
    }

    @Override
    protected ICrudService<Local, Long> getService() {
        return localService;
    }

    @Override
    public ModelMapper getModelMapper() {
        return modelMapper;
    }

    @GetMapping("search/name")
    public ResponseEntity<List<Local>> findAllByName(@RequestParam String name) {
        return ResponseEntity.ok(localService.findAllByName(name));
    }

    @GetMapping("search/coordinate")
    public ResponseEntity<Local> findAllByCoordinate(@RequestParam String coordinate) {
        String[] coord = coordinate.split(",");
        Double[] coordinates = new Double[coord.length];
        for (int i = 0; i < coord.length; i++) {
            coordinates[i] = Double.parseDouble(coord[i]);
        }
        return ResponseEntity.ok(localService.findAllByCoordinate(coordinates));
    }

    @PostMapping("save-and-upload")
    public Local save(@RequestPart("local") @Valid Local local,
                      @RequestPart("images") MultipartFile[] images) {
        getService().save(local);
        imageService.saveImages(images, local);
        return local;
    }

}
