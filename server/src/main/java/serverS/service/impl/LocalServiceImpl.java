package serverS.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import serverS.model.Local;
import serverS.repository.LocalRepository;
import serverS.service.ILocalService;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;

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
    public List<Local> findAllByName(String name) {
        return localRepository.findAllByName(name);
    }

}
