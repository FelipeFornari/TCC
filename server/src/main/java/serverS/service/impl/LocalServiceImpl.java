package serverS.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import serverS.model.Local;
import serverS.repository.LocalRepository;
import serverS.service.ILocalService;

import java.io.*;
import java.util.List;

@Service
@Slf4j
public class LocalServiceImpl extends CrudServiceImpl<Local, Long>
        implements ILocalService {

    private static final String FILE_PATH = File.separator + "uploads";
    private final LocalRepository localRepository;

    public LocalServiceImpl(LocalRepository localRepository) {
        this.localRepository = localRepository;
    }

    @Override
    protected JpaRepository<Local, Long> getRepository() {
        return this.localRepository;
    }

    @Override
    public void delete(Long id) {
        super.delete(id);
    }

    @Override
    public List<Local> findAllByNameContaining(String name) {
        return localRepository.findAllByNameContaining(name);
    }

    @Override
    public Local findAllByCoordinate(Double[] coordinate) {
        return localRepository.findAllByCoordinate(coordinate);
    }

}
