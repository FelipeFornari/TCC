package serverS.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import serverS.annotation.UniqueUsername;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private Long id;

    @NotNull(message = "{serverS.model.User.NotNull.message}")
    @Size(min = 4, max = 255, message = "{serverS.model.User.Size.message}")
    @UniqueUsername
    private String username;

    @NotNull
    @Size(min = 4, max = 255)
    private String displayName;

    @NotNull
    @Size(min = 6)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
            message = "{serverS.model.User.Password.Pattern.message}")
    private String password;

}
