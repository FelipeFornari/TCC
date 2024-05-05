package serverS.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import serverS.model.Convenience;
import serverS.model.Entrusted;
import serverS.model.Functionality;

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
    private FunctionalityDTO functionality;

    @ManyToOne
    private LocalDTO local;

    private String openingTime;

    private String closingTime;

    private boolean scheduling;

    private float usageFee;

    private boolean petAllowed;

    @ManyToOne
    private EntrustedDTO entrusted;

    private String ageGroup;

    @ManyToOne
    private ConvenienceDTO convenience;

    @NotNull
    private String termsOfUse;

    private String creationDate;

    private String reformDate;

    private int maximumCapacity;

    private int specialMaximumCapacity;
}
