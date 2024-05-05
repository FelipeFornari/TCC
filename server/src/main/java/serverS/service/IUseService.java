package serverS.service;

import serverS.model.Local;
import serverS.model.Use;

import java.util.List;

public interface IUseService extends ICrudService<Use, Long> {

    List<Use> findByLocal(Local local);

    List<Use> findAllByLocalId(Long id);
}
