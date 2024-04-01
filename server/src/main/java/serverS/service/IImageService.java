package serverS.service;

import org.springframework.web.multipart.MultipartFile;
import serverS.model.Image;

public interface IImageService extends ICrudService<Image, Long> {


    void saveImage(MultipartFile file, Image image);

    //void saveImageFile(MultipartFile file, Image image);

    String getImage(Long id);

}
