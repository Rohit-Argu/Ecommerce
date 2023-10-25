package com.ecommerce.app.service;

import com.ecommerce.app.entity.Address;
import com.ecommerce.app.entity.User;
import com.ecommerce.app.repository.AddressRepository;
import com.ecommerce.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return (UserDetails) userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }

    @Override
    public ResponseEntity<List<User>> getUsers() {
        List<User> li = new ArrayList<>(userRepository.findAll());
        return ResponseEntity.ok(li);
    }

    @Override
    public ResponseEntity<User> getUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByEmail(currentPrincipalName).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }

    @Override
    public ResponseEntity<User> updateUser(User user) {
        User user1 = this.getUser().getBody();
        user1.setFirstName(user.getFirstName());
        user1.setLastName(user.getLastName());
        user1.setPhone(user.getLastName());
        userRepository.save(user1);
        return ResponseEntity.ok(user1);
    }

    @Override
    public ResponseEntity<String> deleteUser(int id) {
        if(userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Address> addAddress(Address address) {
        User user = this.getUser().getBody();
        address.setUser(user);
        user.getAddresses().add(address);
        userRepository.save(user);
        return ResponseEntity.ok(address);
    }

    @Override
    public ResponseEntity<List<Address>> getAddresses() {
        User user = this.getUser().getBody();
        List<Address> address = new ArrayList<>(user.getAddresses());
        return ResponseEntity.ok(address);
    }

    @Override
    public ResponseEntity<Address> getAddress(int id) {
        Address address = addressRepository.findById(id).orElseThrow(() -> new RuntimeException("Address not found"));
        return ResponseEntity.ok(address);
    }

    @Override
    public ResponseEntity<Address> updateAddress(int id, Address address) {
        Address address1 = this.getAddress(id).getBody();
        address1.setHouseNo(address.getHouseNo());
        address1.setLocality(address.getLocality());
        address1.setDistrict(address.getDistrict());
        address1.setState(address.getState());
        address1.setCountry(address.getCountry());
        address1.setPincode(address.getPincode());
        addressRepository.save(address1);
        return ResponseEntity.ok(address1);
    }

    @Override
    public ResponseEntity<String> deleteAddress(int id) {
        addressRepository.deleteById(id);
        return ResponseEntity.ok("Address deleted!");
    }
}
