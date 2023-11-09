package com.ecommerce.app.dao;

import com.ecommerce.app.entity.Product;
import com.ecommerce.app.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ProductsResp {

    private List<Product> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean lastPage;
}
