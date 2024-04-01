package serverS.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;
import serverS.model.Image;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocalDTO {

    private Long id;

//    @Size(min = 2, max = 50)
//    @Column(length = 50, nullable = false)
//    private String name;

    @NotNull
    private String name;

    @NotNull
    private String street;

    @NotNull
    private String number;

    private String CEP;

    @NotNull
    private String district;

    private CityDTO city;

    @NotNull
    private Point coordinate;

    private String description;

    public List<Image> image;
}
