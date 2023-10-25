package com.ecommerce.app.controller;

import com.ecommerce.app.entity.Cart;
import com.ecommerce.app.entity.CartDetails;
import com.ecommerce.app.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/addToCart/{productId}/{quantity}")
    public ResponseEntity<Cart> addToCart(@PathVariable int productId, @PathVariable int quantity) {
        return this.cartService.addToCart(productId, quantity);
    }

    @GetMapping("/viewCart")
    public ResponseEntity<Cart> viewCart() {
        return this.cartService.viewCart();
    }

    @DeleteMapping("/emptyCart")
    public ResponseEntity<String> emptyCart() {
        return this.cartService.emptyCart();
    }
}
