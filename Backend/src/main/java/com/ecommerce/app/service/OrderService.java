package com.ecommerce.app.service;

import com.ecommerce.app.entity.Order;
import com.ecommerce.app.entity.Payment;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    ResponseEntity<Order> placeOrder(int addressId, Payment payment);

    ResponseEntity<List<Order>> getAllOrders();

    ResponseEntity<List<Order>> orderHistory();
}
