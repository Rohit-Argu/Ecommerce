package com.ecommerce.app.controller;

import com.ecommerce.app.entity.Product;
import com.ecommerce.app.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/viewProducts")
    public ResponseEntity<List<Product>> viewProducts() {
        return this.productService.getProducts();
    }

    @GetMapping("/viewAllProducts")
    public ResponseEntity<List<Product>> viewAllProducts() {
        return this.productService.getAllProducts();
    }

    @GetMapping("/viewProduct/{id}")
    public ResponseEntity<Product> viewProduct(@PathVariable int id) {
        return this.productService.getProduct(id);
    }

    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return this.productService.addProduct(product);
    }
    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product product) {
        return this.productService.updateProduct(id, product);
    }

    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        return this.productService.deleteProduct(id);
    }
}
