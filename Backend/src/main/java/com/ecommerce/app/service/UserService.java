package com.ecommerce.app.service;

import com.ecommerce.app.dao.UsersResp;
import com.ecommerce.app.entity.Address;
import com.ecommerce.app.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    UserDetailsService userDetailsService();

    ResponseEntity<UsersResp> getUsers(int page, int size, String sortField, String filterField, String filterValue);

    ResponseEntity<User> getUser();

    ResponseEntity<User> updateUser(User user);

    ResponseEntity<String> deleteUser(int id);

    ResponseEntity<Address> addAddress(Address address);

    ResponseEntity<List<Address>> getAddresses();

    ResponseEntity<Address> getAddress(int id);

    ResponseEntity<Address> updateAddress(int id, Address address);

    ResponseEntity<String> deleteAddress(int id);
}
