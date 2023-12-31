package com.ecommerce.app.controller;

import com.ecommerce.app.dao.JwtAuthenticationResponse;
import com.ecommerce.app.dao.SignUpRequest;
import com.ecommerce.app.dao.SigninRequest;
import com.ecommerce.app.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @PostMapping("/google/signin")
    public ResponseEntity<JwtAuthenticationResponse> googleSignin(@RequestBody String idToken){
        return ResponseEntity.ok(authenticationService.googleSignin(idToken));
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody SignUpRequest request) {
        return ResponseEntity.ok(authenticationService.signup(request));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest request) {
        return ResponseEntity.ok(authenticationService.signin(request));
    }
}
