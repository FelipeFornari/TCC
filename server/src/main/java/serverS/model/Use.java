package serverS.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "tb_use")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Use {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="local_id")
    private Local local;

    @ManyToOne
    private Functionality functionality;

    private String openingTime;

    private String closingTime;

    private boolean scheduling;

    private float usageFee;

    private boolean petAllowed;

    @ManyToOne
    private Entrusted entrusted;

    private String ageGroupInf;

    private String ageGroupSup;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name = "tb_use_convenience",
            joinColumns = @JoinColumn(name = "use_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "conveninence_id", referencedColumnName = "id") )
    private List<Convenience> convenience;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name = "tb_use_accessibility",
            joinColumns = @JoinColumn(name = "use_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "accessibility_id", referencedColumnName = "id") )
    private List<Accessibility> accessibility;

    @NotNull
    private String termsOfUse;

    @NotNull
    private String creationDate;

    private String reformDate;

    @NotNull
    private int maximumCapacity;

    @NotNull
    private int specialMaximumCapacity;
}
