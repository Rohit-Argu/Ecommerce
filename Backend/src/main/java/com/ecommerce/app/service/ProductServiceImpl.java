package com.ecommerce.app.service;

import com.ecommerce.app.dao.ProductsResp;
import com.ecommerce.app.dao.UsersResp;
import com.ecommerce.app.entity.Product;
import com.ecommerce.app.entity.User;
import com.ecommerce.app.repository.ProductRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;
    private final UserService userService;
    @Override
    public ResponseEntity<Product> addProduct(String product1, MultipartFile image) {

        ObjectMapper objectMapper = new ObjectMapper();

        Product product = null;
        try {
            product = objectMapper.readValue(product1, Product.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        User user = this.userService.getUser().getBody();
        product.setSeller(user);

        try {
            byte[] imageBytes = image.getBytes();
            String base64image = Base64.getEncoder().encodeToString(imageBytes);
            base64image = "data:image/png;base64," + base64image;
            product.setImage(base64image);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        productRepository.save(product);
        return ResponseEntity.ok(product);
    }

    @Override
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> productList = new ArrayList<>(productRepository.findAll());
        return ResponseEntity.ok(productList);
    }

    @Override
    public ResponseEntity<ProductsResp> getAllProductsFiltered(int page, int size, String sortField, String sortOrder, String filterValue) {

        page = page - 1;

        Sort.Direction sortDir;
        if(sortOrder.equals("asc")){
            sortDir = Sort.Direction.ASC;}
        else {sortDir = Sort.Direction.DESC;}

        Pageable p = PageRequest.of(page, size, Sort.by(sortDir, sortField));
        Page<Product> pagePost;

        if (filterValue.isEmpty()){
            pagePost = productRepository.findAll(p);
        } else {
            pagePost = productRepository.findAll(filterValue, p);
        }

        List<Product> allPosts = pagePost.getContent();

        ProductsResp productsResp = new ProductsResp();

        productsResp.setContent(allPosts);
        productsResp.setPageNumber(pagePost.getNumber());
        productsResp.setPageSize(pagePost.getSize());
        productsResp.setTotalElements(pagePost.getTotalElements());
        productsResp.setTotalPages(pagePost.getTotalPages());
        productsResp.setLastPage(pagePost.isLast());

        return ResponseEntity.ok(productsResp);

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
//        product1.setImage(product.getImage());
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
