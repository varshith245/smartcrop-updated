package com.smartcrop.backend.config;

import com.smartcrop.backend.auth.security.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    // 🔐 Password Encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 🔐 Security Rules
  @Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http)
        throws Exception {

    http
        .cors(cors -> {})
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth

            // PUBLIC
            .requestMatchers("/api/auth/**").permitAll()

            // FARMER + ADMIN MODULES
            .requestMatchers("/api/farms/**")
                .hasAnyRole("ADMIN","FARMER")

            .requestMatchers("/api/yield/**")
                .hasAnyRole("ADMIN","FARMER")

            .requestMatchers("/api/disease/**")
                .hasAnyRole("ADMIN","FARMER")

            .requestMatchers("/api/fertilizer/**")
                .hasAnyRole("ADMIN","FARMER")

            .requestMatchers("/api/irrigation/**")
                .hasAnyRole("ADMIN","FARMER")

            .requestMatchers("/api/recommend/**")
                .hasAnyRole("ADMIN","FARMER")

            .requestMatchers("/api/crops/**")
                .hasAnyRole("ADMIN","FARMER")

            .requestMatchers("/api/market/**")
                .hasAnyRole("ADMIN","FARMER")

            .requestMatchers("/api/bot/**")
                .hasAnyRole("ADMIN","FARMER")

            .requestMatchers("/api/water/**")
                .hasAnyRole("ADMIN","FARMER")

            .requestMatchers("/api/weather/**")
                .hasAnyRole("ADMIN","FARMER")

            .requestMatchers("/api/soil/**")
                .hasAnyRole("ADMIN","FARMER")

            // ADMIN ONLY
            .requestMatchers("/api/admin/**")
                .hasRole("ADMIN")

            // USER PROFILE
            .requestMatchers("/api/users/email")
                .hasAnyRole("ADMIN","FARMER")

            .requestMatchers("/api/users/**")
                .hasRole("ADMIN")

            .anyRequest().authenticated()
        )
        .addFilterBefore(
            new JwtFilter(),
            UsernamePasswordAuthenticationFilter.class
        );

    return http.build();
}
    // 🌍 Global CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOriginPatterns(
            List.of("http://localhost:5173")
        );

        config.setAllowedMethods(
            List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        config.setAllowedHeaders(List.of("*"));

        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
        
}
