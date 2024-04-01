package serverS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import serverS.model.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
