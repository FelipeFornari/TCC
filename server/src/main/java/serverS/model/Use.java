package serverS.model;

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
    private Modality modality;

    private String openingTime;

    private String closingTime;

    private String scheduling;

    private float usageFee;

    @NotNull
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

    @NotNull
    private String reformDate;

    @NotNull
    private int maximumCapacity;

    @NotNull
    private int specialMaximumCapacity;
}
