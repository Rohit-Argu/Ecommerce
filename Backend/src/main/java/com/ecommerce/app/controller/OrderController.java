package com.ecommerce.app.controller;

import com.ecommerce.app.entity.Order;
import com.ecommerce.app.entity.Payment;
import com.ecommerce.app.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/placeOrder/{addressId}")
    public ResponseEntity<Order> placeOrder(@PathVariable int addressId, @RequestBody Payment payment) {
        return this.orderService.placeOrder(addressId,payment);
    }

    @GetMapping("/allOrders")
    public ResponseEntity<List<Order>> allOrders() {
        return this.orderService.getAllOrders();
    }
    @GetMapping("/orderHistory")
    public ResponseEntity<List<Order>> orderHistory() {
        return this.orderService.orderHistory();
    }
}
