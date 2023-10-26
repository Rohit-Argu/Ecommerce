package com.ecommerce.app.service;

import com.ecommerce.app.entity.*;
import com.ecommerce.app.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;
    private final UserService userService;
    private final CartService cartService;
    @Override
    public ResponseEntity<Order> placeOrder(int addressId, Payment payment) {
        User user = this.userService.getUser().getBody();
        Address address = this.userService.getAddress(addressId).getBody();
        Cart cart = this.cartService.viewCart().getBody();
        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setAmount(cart.getAmount());
        order.setOrderedAt(LocalDateTime.now());
        for (CartDetails cartDetail : cart.getCartDetails()) {
            OrderDetails orderDetail = new OrderDetails();
            orderDetail.setOrder(order);
            orderDetail.setProduct(cartDetail.getProduct());
            orderDetail.setQuantity(cartDetail.getQuantity());
            order.getOrderDetails().add(orderDetail);
        }
        payment.setOrder(order);
        order.setPayment(payment);
        this.cartService.emptyCart();
        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }

    @Override
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orderList = new ArrayList<>(orderRepository.findAll());
        return ResponseEntity.ok(orderList);
    }

    @Override
    public ResponseEntity<List<Order>> orderHistory() {
        User user = this.userService.getUser().getBody();
        int userId = user.getId();
        List<Order> orderList = new ArrayList<>(orderRepository.findByUserId(userId));
        return ResponseEntity.ok(orderList);
    }
}
