package com.example.jwt.exceptions;

// exception/TokenExpiredException.java
public class TokenExpiredException extends RuntimeException {
    public TokenExpiredException() {
        super("Refresh token expired. Please login again.");
    }
}
