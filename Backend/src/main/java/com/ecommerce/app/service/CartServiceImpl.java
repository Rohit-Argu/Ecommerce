package com.ecommerce.app.service;

import com.ecommerce.app.entity.Cart;
import com.ecommerce.app.entity.CartDetails;
import com.ecommerce.app.entity.Product;
import com.ecommerce.app.entity.User;
import com.ecommerce.app.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;
    private final UserService userService;
    private final ProductService productService;
    @Override
    public ResponseEntity<Cart> addToCart(int productId, int quantity) {
        Product product = this.productService.getProduct(productId).getBody();
        User user = this.userService.getUser().getBody();
        Cart userCart = user.getCart();
        if (userCart == null) {
            userCart = new Cart();
            userCart.setUser(user);
            cartRepository.save(userCart);
        }

        CartDetails cartDetails = null;
        if (userCart.getCartDetails() != null) {
            for (CartDetails details : userCart.getCartDetails()) {
                if (details.getProduct().getId() == productId) {
                    cartDetails = details;
                    break;
                }
            }
        }
        if (cartDetails == null) {
            cartDetails = new CartDetails();
            cartDetails.setCart(userCart);
            cartDetails.setProduct(product);
            cartDetails.setQuantity(quantity);
            userCart.getCartDetails().add(cartDetails);
        } else {
            cartDetails.setQuantity(cartDetails.getQuantity() + quantity);
        }

        BigDecimal totalAmount = userCart.getCartDetails().stream()
                .map(details -> details.getProduct().getPrice().multiply(BigDecimal.valueOf(details.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        userCart.setAmount(totalAmount);

        cartRepository.save(userCart);

        return ResponseEntity.ok(userCart);
    }

    @Override
    public ResponseEntity<Cart> viewCart() {
        User user = this.userService.getUser().getBody();
        Cart cart = user.getCart();
        return ResponseEntity.ok(cart);
    }

    @Override
    public ResponseEntity<String> emptyCart() {
        Cart cart = this.viewCart().getBody();

        if (cart != null) {
            cart.getCartDetails().clear();
            cart.setAmount(BigDecimal.ZERO);
            cartRepository.save(cart);
        }

        return ResponseEntity.ok("Cart emptied!");
    }
}
