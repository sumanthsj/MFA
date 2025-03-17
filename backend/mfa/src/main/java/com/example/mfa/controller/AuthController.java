package com.example.mfa.controller;

import com.example.mfa.entity.User;
import com.example.mfa.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            System.out.println("Signup request received: " + user.getUsername());
            User createdUser = authService.signup(user);
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            System.err.println("Signup failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage()); // Return the exception message
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> loggedInUser = authService.login(user.getUsername(), user.getPassword());
        if (loggedInUser.isPresent()) {
            return ResponseEntity.ok(loggedInUser.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found or incorrect password.");
        }
    }

    @GetMapping("/checkUsername/{username}")
    public ResponseEntity<?> checkUsername(@PathVariable String username) {
        if (authService.usernameExists(username)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists.");
        } else {
            return ResponseEntity.ok("Username is available.");
        }
    }
}
