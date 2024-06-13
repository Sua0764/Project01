package dw.majorflow.service;

import dw.majorflow.dto.UserDto;
import dw.majorflow.model.Authority;
import dw.majorflow.model.User;
import dw.majorflow.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private UserRepository userRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public List<User> getUsersAll() {
        return userRepository.findAll();
    }

    public String saveUser(UserDto userDto) {
        Optional<User> userOptional = userRepository.findByUserId(userDto.getUserId());
        if (userOptional.isPresent()){return "이미 등록된 ID";}
        Authority authority = new Authority();
        authority.setAuthorityName("ROLE_USER");
        User user = new User(
                userDto.getUserId(),
                userDto.getUserName(),
                bCryptPasswordEncoder.encode(userDto.getPassword()),
                userDto.getBirthDate(),
                userDto.getPhoneNumber(),
                userDto.getAddress(),
                userDto.getGender(),
                userDto.getEmail(),
                userDto.getNickname(),
                userDto.getGenre(),
                authority);
        return userRepository.save(user).getUserId();
    }
}
