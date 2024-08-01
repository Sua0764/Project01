package dw.majorflow.dto;

import dw.majorflow.model.User;
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDto {

//    @NotBlank
    private String userId;

//    @NotBlank
    private String name;

//    @NotBlank
//    @Size(min = 6)
    private String password;

//    @NotBlank
    private LocalDate birthDate;

//    @NotBlank
    private String phoneNumber;

//    @NotBlank
    private String address;

//    @NotBlank
    private List<String> gender;

//    @NotBlank
//    @Email
    private String email;

//    @NotBlank
    private String nickname;

//    @NotBlank
    private List<String> genre;

//    public static UserDto toUserDto(User user) {
//        return new UserDto(
//                user.getUserId(),
//                user.getName(),
//                null,
//                user.getBirthDate(),
//                user.getPhoneNumber(),
//                user.getAddress(),
//                user.getGender(),
//                user.getEmail(),
//                user.getNickname(),
//                user.getGenre()
//        );
//    }
}
