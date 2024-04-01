package serverS.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import serverS.model.Convenience;
import serverS.repository.ConvenienceRepository;
import serverS.service.IConvenienceService;

@Service
public class ConvenienceServiceImpl extends CrudServiceImpl<Convenience, Long>
        implements IConvenienceService {
    private final ConvenienceRepository convenienceRepository;

    public ConvenienceServiceImpl(ConvenienceRepository convenienceRepository) {
        this.convenienceRepository = convenienceRepository;
    }

    @Override
    protected JpaRepository<Convenience, Long> getRepository() {
        return convenienceRepository;
    }

    @Override
    public void delete(Long id) {
        super.delete(id);
    }

//    @Override
//    public List<Cities> findAllByCity(String city) {
//        return citiesRepository.findAllByCity(city);
//    }
}
