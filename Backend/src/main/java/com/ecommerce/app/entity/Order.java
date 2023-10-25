package com.ecommerce.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(name = "ordered_at")
    private LocalDateTime orderedAt;

    @Column(name = "amount")
    private BigDecimal amount;

    @OneToMany(mappedBy = "order")
    private List<OrderDetails> orderDetails = new ArrayList<>();

    @OneToOne(mappedBy = "order")
    private Payment payment;
}
