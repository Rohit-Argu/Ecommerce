package com.ecommerce.app.service;

import com.ecommerce.app.entity.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    ResponseEntity<Product> addProduct(Product product);

    ResponseEntity<List<Product>> getAllProducts();

    ResponseEntity<List<Product>> getProducts();

    ResponseEntity<Product> getProduct(int id);

    ResponseEntity<Product> updateProduct(int id, Product product);

    ResponseEntity<String> deleteProduct(int id);
}
