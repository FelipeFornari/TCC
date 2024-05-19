package serverS.controller;

import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import serverS.dto.ImageDTO;
import serverS.model.Image;
import serverS.service.ICrudService;
import serverS.service.IImageService;

import java.util.List;

@RestController
@RequestMapping("images")
public class ImageController extends CrudController<Image, ImageDTO, Long> {

    private final IImageService imageService;
    private final ModelMapper modelMapper;


    public ImageController(IImageService imageService, ModelMapper modelMapper) {
        super(Image.class, ImageDTO.class);
        this.imageService = imageService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Image, Long> getService() {
        return this.imageService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return this.modelMapper;
    }

    @PostMapping("upload-fs")
    public Image save(@RequestPart("image") @Valid Image image,
                        @RequestPart("images") MultipartFile file) {
        getService().save(image);
        imageService.saveImage(file, image);
        return image;
    }

    @GetMapping("list/{id}")
    public List<ImageDTO> getImageListFromLocal(@PathVariable Long id ){
        return imageService.getImageList(id);
    }

//    @PostMapping("del")
//    public void remover(@RequestPart File f){
//        imageService.removerArquivos(f);
//    }

    @DeleteMapping("deletefile/{id}")
    public void deleteFile(@PathVariable Long id) {imageService.deleteFile(id);}
}
