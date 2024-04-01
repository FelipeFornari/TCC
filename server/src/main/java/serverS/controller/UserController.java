package serverS.controller;

import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serverS.dto.UserDTO;
import serverS.model.User;
import serverS.service.UserService;
import serverS.shared.GenericResponse;

@RestController
@RequestMapping("users")
public class UserController {

    private final UserService userService;

    private final ModelMapper modelMapper;

    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    public GenericResponse createUser(@Valid @RequestBody UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        userService.save(user);
        GenericResponse genericResponse = new GenericResponse();
        genericResponse.setMessage("User saved");
        return genericResponse;
    }

}
