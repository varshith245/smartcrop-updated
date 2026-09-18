
package com.smartcrop.backend.config;

public class JwtConfig {
    public static final String SECRET = System.getenv("JWT_SECRET") != null && !System.getenv("JWT_SECRET").trim().isEmpty()
            ? System.getenv("JWT_SECRET").trim()
            : "smartcrop-secret";
}
