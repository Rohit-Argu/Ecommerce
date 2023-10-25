package com.ecommerce.app.service;

import com.ecommerce.app.dao.JwtAuthenticationResponse;
import com.ecommerce.app.dao.SignUpRequest;
import com.ecommerce.app.dao.SigninRequest;

public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SigninRequest request);
}
