package com.example.jwt.service;

import com.example.jwt.entity.RefreshToken;
import com.example.jwt.entity.User;
import com.example.jwt.exceptions.TokenExpiredException;
import com.example.jwt.repository.RefreshTokenRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final long refreshTokenExpiration = 604800000; // Example: 7 days in ms

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional // 👈 Ensure transaction boundary is maintained
    public RefreshToken createRefreshToken(User user) {
        // 1. Permanently wipe out any older refresh tokens for this specific user
        refreshTokenRepository.deleteByUser(user);

        // 2. Ensure your changes flush directly to the database before the next insert
        refreshTokenRepository.flush();

        // 3. Construct a brand-new token entity with a unique UUID string
        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString()) // 👈 Generates a completely new unique key
                .expiryDate(Instant.now().plusMillis(refreshTokenExpiration))
                .build();

        // 4. Save clean entity state to the database
        return refreshTokenRepository.save(refreshToken);
    }
    public RefreshToken verifyExpiration(RefreshToken token) {
        // Check if the current time is past the token's expiration date
        if (token.getExpiryDate().isBefore(Instant.now())) {
            // Remove the expired token from the database if needed
            // refreshTokenRepository.delete(token);
            throw new TokenExpiredException();
        }
        return token; // 👈 Must return the token so it can pass to the next .map() block
    }
    // 1. Add this method to resolve the compilation error
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }
}
