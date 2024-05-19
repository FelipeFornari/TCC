package serverS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import serverS.model.Accessibility;

public interface AccessibilityRepository extends JpaRepository<Accessibility, Long> {
}
