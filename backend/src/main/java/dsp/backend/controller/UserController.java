package dsp.backend.controller;

import dsp.backend.Entity.User;
import dsp.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        userService.registerUser(user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> loginRequest) {
        String userId = loginRequest.get("userId");
        String password = loginRequest.get("password");
        String currentCookie = loginRequest.get("currentCookie");
        User user = userService.loginUser(userId, password, currentCookie);
        return new ResponseEntity<>(Collections.singletonMap("userId", user.getUserId()), HttpStatus.CREATED);
    }

    @PostMapping("/signout")
    public ResponseEntity<?> signout(@RequestBody Map<String, String> logoutRequest) {
        String currentCookie = logoutRequest.get("currentCookie");
        userService.logoutUser(currentCookie);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}