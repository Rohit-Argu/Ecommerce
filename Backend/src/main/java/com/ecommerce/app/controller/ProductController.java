package com.ecommerce.app.controller;

import com.ecommerce.app.dao.ProductsResp;
import com.ecommerce.app.entity.Product;
import com.ecommerce.app.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/viewAllProductsFiltered")
    public ResponseEntity<ProductsResp> viewAllProductsFiltered(
            @RequestParam(defaultValue = "1", required = false) int page,
            @RequestParam(defaultValue = "10", required = false) int size,
            @RequestParam(defaultValue = "id", required = false) String sortField,
            @RequestParam(defaultValue = "asc", required = false) String sortOrder,
            @RequestParam(defaultValue = "", required = false) String filterValue
    ) {
        return this.productService.getAllProductsFiltered(page, size, sortField, sortOrder, filterValue);
    }

    @GetMapping("/viewProduct/{id}")
    public ResponseEntity<Product> viewProduct(@PathVariable int id) {
        return this.productService.getProduct(id);
    }

    @PostMapping(path = "/seller/addProduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> addProduct(@RequestPart("product") String product, @RequestPart("image") MultipartFile image) {
        return this.productService.addProduct(product, image);
    }

    @PutMapping("/seller/updateProduct/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product product) {
        return this.productService.updateProduct(id, product);
    }

    @DeleteMapping("/seller/deleteProduct/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        return this.productService.deleteProduct(id);
    }
}
