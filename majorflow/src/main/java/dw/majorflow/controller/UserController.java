package dw.majorflow.controller;

import dw.majorflow.dto.SessionDto;
import dw.majorflow.dto.UserDto;
import dw.majorflow.model.User;
import dw.majorflow.service.UserDetailService;
import dw.majorflow.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;
    private UserDetailService userDetailService;
    private AuthenticationManager authenticationManager;
    private HttpServletRequest httpServletRequest;

    @Autowired
    public UserController(UserService userService, UserDetailService userDetailService, AuthenticationManager authenticationManager, HttpServletRequest httpServletRequest) {
        this.userService = userService;
        this.userDetailService = userDetailService;
        this.authenticationManager = authenticationManager;
        this.httpServletRequest = httpServletRequest;
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> getUsersAll() {
        return new ResponseEntity<>(userService.getUsersAll(), HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<Integer> signUp(@RequestBody UserDto user) {
        String result = userService.saveUser(user);
        if ("0".equals(result)) {
            return new ResponseEntity<>(0, HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(1, HttpStatus.CREATED);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto, HttpServletRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getUserId(), userDto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        HttpSession session = request.getSession(true);
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());

        return ResponseEntity.ok("Success");
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "You have been logged out.";
    }

    @GetMapping("/current")
    public SessionDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User is not authenticated");
        }
        SessionDto sessionDto = new SessionDto();
        sessionDto.setUserId(authentication.getName());
        sessionDto.setAuthority(authentication.getAuthorities());
        return sessionDto;
    }

    @PostMapping("/check-id")
    public ResponseEntity<Boolean> checkDuplicateId(@RequestBody UserDto userDto) {
        boolean exists = userService.checkDuplicateId(userDto.getUserId());
        return new ResponseEntity<>(exists, exists ? HttpStatus.CONFLICT : HttpStatus.OK);
    }

    @PostMapping("/check-nickname")
    public ResponseEntity<Boolean> checkDuplicateNickname(@RequestBody UserDto userDto) {
        boolean exists = userService.checkDuplicateNickname(userDto.getNickname());
        return new ResponseEntity<>(exists, exists ? HttpStatus.CONFLICT : HttpStatus.OK);
    }

    // 비밀번호 재설정 엔드포인트 추가
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody UserDto userDto) {
        boolean success = userService.resetPassword(userDto.getUserId(), userDto.getNewPassword());
        if (success) {
            return ResponseEntity.ok("비밀번호가 재설정되었습니다.");
        } else {
            return new ResponseEntity<>("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }
    }
}
