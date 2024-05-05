package serverS.service.impl;


import serverS.dto.ImageDTO;
import serverS.model.Image;
import serverS.model.Local;
import serverS.repository.ImageRepository;
import serverS.service.IImageService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
@Service
@Slf4j
public class ImageServiceImpl extends CrudServiceImpl<Image, Long>
        implements IImageService {
    private static final String FILE_PATH = File.separator + "uploads";

    private final ImageRepository imageRepository;

    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    protected JpaRepository<Image, Long> getRepository() {
        return this.imageRepository;
    }

    @Override
    public void saveImage(MultipartFile file, Image image) {
        File dir = new File(FILE_PATH + File.separator + "images-local");

        if (!dir.exists()) {
            dir.mkdirs();
        }

        String suffix = Objects.requireNonNull(file.getOriginalFilename()).
                substring( file.getOriginalFilename().lastIndexOf(".") );
        try {
            FileOutputStream fileOut = new FileOutputStream(
                    new File(dir + File.separator + image.getId() + suffix)
            );
            BufferedOutputStream bufferedOut = new BufferedOutputStream(fileOut);
            bufferedOut.write(file.getBytes());
            bufferedOut.close();
            fileOut.close();

            image.setImageName(image.getId() + suffix);
            imageRepository.save(image);
        } catch (Exception e) {
            log.error("Error in saveImage() - " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public String getImage(Long id) {
        try {
            Image image = imageRepository.findById(id).orElse(null);
            if (image != null) {
                String filename = FILE_PATH + File.separator + "images-local" +
                        File.separator + image.getImageName();
                return encodeFileToBase64(filename);
            }
        } catch (Exception e) {
            log.error("Error in getLocalImage() - " + e.getMessage());
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public void saveImages(MultipartFile[] images, Local local) {
        for( MultipartFile imageFile: images) {
            Image image = new Image();
            image.setLocals(local);
            imageRepository.save(image);
            saveImage(image, imageFile);
        }
    }


    public void saveImagesTest(MultipartFile imageFile, Local local) {
            Image image = new Image();
            image.setLocals(local);
            imageRepository.save(image);
            saveImage(image, imageFile);
    }

    @Override
    public List<ImageDTO> getImageList(Long id) {
        List<ImageDTO> imageDTOList = new ArrayList<>();

        List<Image> images = imageRepository.findAllByLocalsId(id);

        String filename = FILE_PATH + File.separator + "images-local" + File.separator + id;
        for (Image image : images) {
            ImageDTO imageDTO = new ImageDTO();
            imageDTO.setId(image.getId());
            imageDTO.setImageName(image.getImageName());
            imageDTO.setImage( encodeFileToBase64(filename + File.separator + image.getImageName()) );
            imageDTOList.add(imageDTO);
        }
        return imageDTOList;
    }

    private void saveImage(Image image, MultipartFile file) {
        // cria a pasta com o id do local na qual serao salvas todas as imagens
        File dir = new File(FILE_PATH + File.separator + "images-local" +
                            File.separator + image.getLocals().getId());

        if (!dir.exists()) {
            dir.mkdirs();
        }

        String suffix = Objects.requireNonNull(file.getOriginalFilename()).substring( file.getOriginalFilename().lastIndexOf(".") );
        try {
            FileOutputStream fileOut = new FileOutputStream(
                    new File(dir + File.separator + image.getId() + suffix)
            );
            BufferedOutputStream bufferedOut = new BufferedOutputStream(fileOut);
            bufferedOut.write(file.getBytes());
            bufferedOut.close();
            fileOut.close();

            image.setImageName(image.getId() + suffix);
            imageRepository.save(image);
        } catch (Exception e) {
            log.error("Error in saveImage() - " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private String encodeFileToBase64(String filename) {
        try {
            File file = new File(filename);
            FileInputStream stream = new FileInputStream(file);
            byte[] encoded = Base64.encodeBase64(IOUtils.toByteArray(stream));
            stream.close();
            return new String(encoded, StandardCharsets.US_ASCII);
        } catch (Exception ex){
            return "";
        }
    }

//    public void removerArquivos(File f) {
//        if (f.isDirectory()) {
//            File[] files = f.listFiles();
//            for (File file : files) {
//                file.delete();
//            }
//        }
//    }

}
