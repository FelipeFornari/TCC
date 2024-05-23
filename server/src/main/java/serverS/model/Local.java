package serverS.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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
    //@Convert(converter = PointConverter.class)
    //tipo Point
    private Double[] coordinate;

    private String description;

    @Column
    @OneToMany(cascade = CascadeType.REMOVE,
            mappedBy = "locals",
            fetch= FetchType.LAZY)
    public List<Image> image;

    @Column
    @OneToMany(cascade = CascadeType.REMOVE,
            mappedBy = "local",
            fetch= FetchType.LAZY)
    private List<Use> uses;

}
