package com.example.jwt.exceptions;

// exception/TokenNotFoundException.java
public class TokenNotFoundException extends RuntimeException {
    public TokenNotFoundException() {
        super("Refresh token not found.");
    }
}
