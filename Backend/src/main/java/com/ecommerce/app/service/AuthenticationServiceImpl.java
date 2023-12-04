package com.ecommerce.app.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.ecommerce.app.dao.JwtAuthenticationResponse;
import com.ecommerce.app.dao.SignUpRequest;
import com.ecommerce.app.dao.SigninRequest;
import com.ecommerce.app.entity.Role;
import com.ecommerce.app.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import lombok.RequiredArgsConstructor;
import com.ecommerce.app.entity.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Override
    public JwtAuthenticationResponse signup(SignUpRequest request) {
        var user = User.builder().firstName(request.getFirstName()).lastName(request.getLastName())
                .email(request.getEmail()).password(passwordEncoder.encode(request.getPassword()))
                .createdAt(LocalDateTime.now()).role(request.getRole()).build();
        userRepository.save(user);
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    @Override
    public JwtAuthenticationResponse signin(SigninRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    @Override
    public JwtAuthenticationResponse googleSignin(String googleToken) {
        try {
            // Initialize the HTTP transport
            HttpTransport transport = GoogleNetHttpTransport.newTrustedTransport();

            // Initialize the JSON factory
            JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();

            // Now, you can use these objects in your GoogleIdTokenVerifier
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    .setAudience(Collections.singletonList("968868325006-u17s49aqmuu6lagj9r06tjlm0g8mn0r7.apps.googleusercontent.com"))
                    // Other configurations if needed
                    .build();
            GoogleIdToken idToken = verifier.verify(googleToken);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                // Print user identifier
                String userId = payload.getSubject();
                System.out.println("User ID: " + userId);

                // Get profile information from payload
                String email = payload.getEmail();
                boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
                String password = googleToken;
                String firstName = (String) payload.get("given_name");
                String lastName = (String) payload.get("family_name");
                Role role = Role.CUSTOMER;

                // Use or store profile information
                // ...
                if(userRepository.findByEmail(email).equals(Optional.empty())){
                    var token = this.signup(new SignUpRequest(firstName,lastName,email,password,role));

                    return token;
                }
                else {
                    var user = userRepository.findByEmail(email)
                            .orElseThrow(() -> new IllegalArgumentException("Invalid email"));

                    var jwt = jwtService.generateToken(user);
                    return JwtAuthenticationResponse.builder().token(jwt).build();
                }

            } else {
                return null;
            }

            // Use the verifier as needed for verifying Google ID tokens
            // ...
        } catch (Exception e) {
            e.printStackTrace();
            return null;
            // Handle any exceptions
        }

    }
}