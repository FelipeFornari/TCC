package serverS.service;

import org.springframework.web.multipart.MultipartFile;
import serverS.dto.ImageDTO;
import serverS.model.Image;
import serverS.model.Local;

import java.io.File;
import java.util.List;

public interface IImageService extends ICrudService<Image, Long> {


    void saveImage(MultipartFile file, Image image);

    //void saveImageFile(MultipartFile file, Image image);

    String getImage(Long id);

    void saveImages(MultipartFile[] images, Local local);

    void saveImagesTest(MultipartFile images, Local local);

    List<ImageDTO> getImageList(Long id);

//    void removerArquivos(File f);
}
