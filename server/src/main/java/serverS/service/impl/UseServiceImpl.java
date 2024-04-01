package serverS.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import serverS.model.Use;
import serverS.repository.UseRepository;
import serverS.service.IUseService;

@Service
public class UseServiceImpl extends CrudServiceImpl<Use, Long>
        implements IUseService {
    private final UseRepository useRepository;

    public UseServiceImpl(UseRepository useRepository) {
        this.useRepository = useRepository;
    }

    @Override
    protected JpaRepository<Use, Long> getRepository() {
        return useRepository;
    }

    @Override
    public void delete(Long id) {
        super.delete(id);
    }

}
