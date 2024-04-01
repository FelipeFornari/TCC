package serverS.service;

import serverS.model.Local;

import java.util.List;

public interface ILocalService extends ICrudService<Local, Long> {
    List<Local> findAllByName(String name);
}
