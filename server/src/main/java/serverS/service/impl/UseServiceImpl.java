package serverS.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import serverS.model.Accessibility;
import serverS.model.Convenience;
import serverS.model.Local;
import serverS.model.Use;
import serverS.repository.UseRepository;
import serverS.service.IUseService;

import java.util.List;

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

    @Override
    public List<Use> findByLocal(Local local) {
        return useRepository.findByLocal(local);
    }

    @Override
    public List<Use> findAllByLocalId(Long id) {
        return useRepository.findAllByLocalId(id);
    }

    @Override
    public Use save(Use entity) {

//        for(Convenience c : entity.getConvenience()) {
//            c.setDescription("");
//        }
//
//        for (Accessibility a: entity.getAccessibility()){
//            a.setType("");
//        }
        return super.save(entity);
    }
}
