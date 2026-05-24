package com.example.jwt.exceptions;

// exception/EmailAlreadyExistsException.java
public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(String email) {
        super("Email already registered: " + email);
    }
}
