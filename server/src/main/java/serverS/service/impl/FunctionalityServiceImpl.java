package serverS.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import serverS.model.Functionality;
import serverS.repository.FunctionalityRepository;
import serverS.service.IFunctionalityService;

@Service
public class FunctionalityServiceImpl extends CrudServiceImpl<Functionality, Long>
        implements IFunctionalityService {
    private final FunctionalityRepository functionalityRepository;

    public FunctionalityServiceImpl(FunctionalityRepository functionalityRepository) {
        this.functionalityRepository = functionalityRepository;
    }

    @Override
    protected JpaRepository<Functionality, Long> getRepository() {
        return functionalityRepository;
    }

    @Override
    public void delete(Long id) {
        super.delete(id);
    }
}
