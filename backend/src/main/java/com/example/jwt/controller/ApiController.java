package com.example.jwt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ApiController {

    // Any authenticated user
    @GetMapping("/profile")
    public ResponseEntity<Map<String, String>> getProfile(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(Map.of(
                "email", userDetails.getUsername(),
                "role", userDetails.getAuthorities().toString()
        ));
    }

    // Any authenticated user
    @GetMapping("/payments")
    public ResponseEntity<List<String>> getPayments() {
        return ResponseEntity.ok(List.of(
                "Payment #1 - Rs.1000",
                "Payment #2 - Rs.2500",
                "Payment #3 - Rs.750"
        ));
    }

    // Admin only
    @GetMapping("/admin/users")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<String>> getAllUsers() {
        return ResponseEntity.ok(List.of(
                "user1@gmail.com",
                "user2@gmail.com"
        ));
    }
}
