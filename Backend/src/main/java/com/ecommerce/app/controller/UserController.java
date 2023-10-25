package com.ecommerce.app.controller;

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

    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getUsers() {
        return this.userService.getUsers();
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser() {
        return this.userService.getUser();
    }

    @PutMapping("/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return this.userService.updateUser(user);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        return this.userService.deleteUser(id);
    }

    @PostMapping("/addAddress")
    public ResponseEntity<Address> addAddress(@RequestBody Address address) {
        return this.userService.addAddress(address);
    }

    @GetMapping("/allAddress")
    public ResponseEntity<List<Address>> getAddresses() {
        return this.userService.getAddresses();
    }

    @GetMapping("/address/{id}")
    public ResponseEntity<Address> getAddress(@PathVariable int id) {
        return this.userService.getAddress(id);
    }

    @PutMapping("/updateAddress/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable int id, @RequestBody Address address) {
        return this.userService.updateAddress(id, address);
    }

    @DeleteMapping("/deleteAddress/{id}")
    public ResponseEntity<String> deleteAddress(@PathVariable int id) {
        return this.userService.deleteAddress(id);
    }
}
