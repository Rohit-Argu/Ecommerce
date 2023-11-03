package com.ecommerce.app.controller;

import com.ecommerce.app.dao.UsersResp;
import com.ecommerce.app.entity.Address;
import com.ecommerce.app.entity.User;
import com.ecommerce.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/admin/getUsers")
    public ResponseEntity<UsersResp> getUsers(
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "10", required = false) int size,
            @RequestParam(defaultValue = "id", required = false) String sortField,
            @RequestParam(defaultValue = "asc", required = false) String sortOrder,
//            @RequestParam(defaultValue = "", required = false) String filterField,
            @RequestParam(defaultValue = "", required = false) String filterValue
    ) {
        return this.userService.getUsers(page, size, sortField, sortOrder, filterValue);
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser() {
        return this.userService.getUser();
    }

    @PutMapping("/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return this.userService.updateUser(user);
    }

    @DeleteMapping("/admin/deleteUser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        return this.userService.deleteUser(id);
    }

    @PostMapping("/address/addAddress")
    public ResponseEntity<Address> addAddress(@RequestBody Address address) {
        return this.userService.addAddress(address);
    }

    @GetMapping("/customer/allAddress")
    public ResponseEntity<List<Address>> getAddresses() {
        return this.userService.getAddresses();
    }

    @GetMapping("/customer/address/{id}")
    public ResponseEntity<Address> getAddress(@PathVariable int id) {
        return this.userService.getAddress(id);
    }

    @PutMapping("/customer/updateAddress/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable int id, @RequestBody Address address) {
        return this.userService.updateAddress(id, address);
    }

    @DeleteMapping("/customer/deleteAddress/{id}")
    public ResponseEntity<String> deleteAddress(@PathVariable int id) {
        return this.userService.deleteAddress(id);
    }
}
