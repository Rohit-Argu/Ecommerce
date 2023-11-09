package com.ecommerce.app.service;

import com.ecommerce.app.dao.ProductsResp;
import com.ecommerce.app.entity.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    ResponseEntity<Product> addProduct(String product, MultipartFile image);

    ResponseEntity<List<Product>> getAllProducts();
    ResponseEntity<ProductsResp> getAllProductsFiltered(int page, int size, String sortField, String sortOrder, String filterValue);

    ResponseEntity<List<Product>> getProducts();

    ResponseEntity<Product> getProduct(int id);

    ResponseEntity<Product> updateProduct(int id, Product product);

    ResponseEntity<String> deleteProduct(int id);

}
