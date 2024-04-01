package serverS.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

import java.util.List;

@Entity
@Table(name = "tb_locals")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Local {

//    @Size(min = 2, max = 50)
//    @Column(length = 50, nullable = false)
//    private String name;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String street;

    @NotNull
    private String number;

    private String CEP;

    @NotNull
    private String district;

    @ManyToOne
    private City city;

    @NotNull
    private Point coordinate;

    private String description;

    @Column
    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "locals",
            fetch= FetchType.LAZY)
    //@JoinColumn(name="image_id")
    public List<Image> image;

}
