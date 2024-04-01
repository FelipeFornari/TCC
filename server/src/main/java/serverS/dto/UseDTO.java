package serverS.dto;

import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import serverS.model.Entrusted;

import java.math.BigDecimal;
import java.sql.Time;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UseDTO {

    private Long id;

    @ManyToOne
    private FunctionalityDTO functionalitiesId;

    private Time openingTime;

    private Time closingTime;

    private String scheduling;

    private BigDecimal usageFee;

    @NotNull
    private boolean petAllowed;

    private Entrusted entrusted;

    private String ageGroup;

    @NotNull
    private boolean lockerRooms;

    @NotNull
    private boolean bathrooms;

    @NotNull
    private boolean waterDrinker;

    @NotNull
    private boolean bleachers;

    @NotNull
    private boolean wiFi;

    @NotNull
    private boolean accessibility;

    @NotNull
    private String termsOfUse;

    @NotNull
    private Date creationDate;

    @NotNull
    private Date reformDate;

    @NotNull
    private int maximumCapacity;

    @NotNull
    private int specialMaximumCapacity;

}
