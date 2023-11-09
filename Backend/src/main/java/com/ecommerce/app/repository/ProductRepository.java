package com.ecommerce.app.repository;

import com.ecommerce.app.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;


import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findBySellerId(int sellerId);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %:filterValue%")
    Page<Product> findAll(@Param("filterValue") String filterValue, Pageable p);
}
