package serverS.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EntrustedDTO {
    private Long id;

    @NotNull
    private String name;

    private String phoneNumber;

    private String eMail;
}
