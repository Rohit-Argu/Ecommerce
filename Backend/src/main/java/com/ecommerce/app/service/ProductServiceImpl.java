package com.ecommerce.app.service;

import com.ecommerce.app.entity.Product;
import com.ecommerce.app.entity.User;
import com.ecommerce.app.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;
    private final UserService userService;
    @Override
    public ResponseEntity<Product> addProduct(Product product) {
        User user = this.userService.getUser().getBody();
        product.setSeller(user);
        productRepository.save(product);
        return ResponseEntity.ok(product);
    }

    @Override
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> productList = new ArrayList<>(productRepository.findAll());
        return ResponseEntity.ok(productList);
    }

    @Override
    public ResponseEntity<List<Product>> getProducts() {
        int userId = this.userService.getUser().getBody().getId();
        List<Product> productList = new ArrayList<>(productRepository.findBySellerId(userId));
        return ResponseEntity.ok(productList);
    }

    @Override
    public ResponseEntity<Product> getProduct(int id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        return ResponseEntity.ok(product);
    }

    @Override
    public ResponseEntity<Product> updateProduct(int id, Product product) {
        Product product1 = this.getProduct(id).getBody();
        product1.setName(product.getName());
        product1.setImage(product.getImage());
        product1.setDescription(product.getDescription());
        product1.setPrice(product.getPrice());
        product1.setStock(product.getStock());
        productRepository.save(product1);
        return ResponseEntity.ok(product1);
    }

    @Override
    public ResponseEntity<String> deleteProduct(int id) {
        productRepository.deleteById(id);
        return ResponseEntity.ok("Product deleted!");
    }
}
