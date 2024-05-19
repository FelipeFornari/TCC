package serverS.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import serverS.model.Use;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConvenienceDTO {
    private Long id;

    @NotNull
    private String description;

//    @JsonIgnore
//    @ManyToOne
//    @JoinColumn(name="use_id")
//    private Use uses;
}
