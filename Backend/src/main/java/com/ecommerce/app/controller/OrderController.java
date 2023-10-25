package com.ecommerce.app.controller;

import com.ecommerce.app.entity.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/order")
@RequiredArgsConstructor
public class OrderController {

    @PostMapping("/placeOrder")
    public ResponseEntity<Order> placeOrder() {
        return null;
    }

    @GetMapping("/allOrders")
    public ResponseEntity<List<Order>> allProducts() {
        return null;
    }
    @GetMapping("/orderHistory")
    public ResponseEntity<List<Order>> orderHistory() {
        return null;
    }
}
