package serverS.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import serverS.model.Local;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageDTO {
    private Long id;

    private Local locals;

    private String imageName;

//    private byte[] imageFile;
//
//    private String imageFileName;
}
