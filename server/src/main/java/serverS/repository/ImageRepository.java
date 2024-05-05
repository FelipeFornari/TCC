package serverS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import serverS.model.Image;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findAllByLocalsId(Long id);
}
