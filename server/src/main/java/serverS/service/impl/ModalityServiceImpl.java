package serverS.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import serverS.model.Modality;
import serverS.repository.ModalityRepository;
import serverS.service.IModalityService;

@Service
public class ModalityServiceImpl extends CrudServiceImpl<Modality, Long>
        implements IModalityService {
    private final ModalityRepository modalityRepository;

    public ModalityServiceImpl(ModalityRepository modalityRepository) {
        this.modalityRepository = modalityRepository;
    }

    @Override
    protected JpaRepository<Modality, Long> getRepository() {
        return modalityRepository;
    }

    @Override
    public void delete(Long id) {
        super.delete(id);
    }
}
