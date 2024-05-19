package serverS.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import serverS.model.Accessibility;
import serverS.repository.AccessibilityRepository;
import serverS.service.IAccessibilityService;

@Service
public class AccessibilityServiceImpl extends CrudServiceImpl<Accessibility, Long>
        implements IAccessibilityService {
    private final AccessibilityRepository accessibilityRepository;

    public AccessibilityServiceImpl(AccessibilityRepository accessibilityRepository) {
        this.accessibilityRepository = accessibilityRepository;
    }

    @Override
    protected JpaRepository<Accessibility, Long> getRepository() {
        return accessibilityRepository;
    }

    @Override
    public void delete(Long id) {
        super.delete(id);
    }
}
