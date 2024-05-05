package serverS.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private String ageGroup;

    @ManyToOne
    private Convenience convenience;

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
