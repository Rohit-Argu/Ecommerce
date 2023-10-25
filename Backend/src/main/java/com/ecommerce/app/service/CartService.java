package com.ecommerce.app.service;

import com.ecommerce.app.entity.Cart;
import com.ecommerce.app.entity.CartDetails;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CartService {
    ResponseEntity<Cart> addToCart(int productId, int quantity);

    ResponseEntity<Cart> viewCart();

    ResponseEntity<String> emptyCart();
}
