package serverS.service;

import org.springframework.data.geo.Point;
import serverS.model.Local;

import java.util.List;

public interface ILocalService extends ICrudService<Local, Long> {
    List<Local> findAllByName(String name);

    Local findAllByCoordinate(Double[] coordinate);
}
