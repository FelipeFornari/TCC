package serverS.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import serverS.model.Entrusted;
import serverS.repository.EntrustedRepository;
import serverS.service.IEntrustedService;

@Service
public class EntrustedServiceImpl extends CrudServiceImpl<Entrusted, Long>
        implements IEntrustedService {
    private final EntrustedRepository entrustedRepository;

    public EntrustedServiceImpl(EntrustedRepository entrustedRepository) {
        this.entrustedRepository = entrustedRepository;
    }

    @Override
    protected JpaRepository<Entrusted, Long> getRepository() {
        return entrustedRepository;
    }

    @Override
    public void delete(Long id) {
        super.delete(id);
    }
}
