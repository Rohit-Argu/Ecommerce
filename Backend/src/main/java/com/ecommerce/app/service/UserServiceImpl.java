package com.ecommerce.app.service;

import com.ecommerce.app.dao.UsersResp;
import com.ecommerce.app.entity.Address;
import com.ecommerce.app.entity.User;
import com.ecommerce.app.repository.AddressRepository;
import com.ecommerce.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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
    public ResponseEntity<UsersResp> getUsers(int page, int size, String sortField, String filterField, String filterValue) {

        Sort.Direction sortDir = Sort.Direction.ASC;

        Pageable p = PageRequest.of(page, size, Sort.by(sortDir, sortField));
        Page<User> pagePost = userRepository.findAll(filterByField(filterField, filterValue), p);
        List<User> allPosts = pagePost.getContent();

        UsersResp usersResp = new UsersResp();

        usersResp.setContent(allPosts);
        usersResp.setPageNumber(pagePost.getNumber());
        usersResp.setPageSize(pagePost.getSize());
        usersResp.setTotalElements(pagePost.getTotalElements());
        usersResp.setTotalPages(pagePost.getTotalPages());
        usersResp.setLastPage(pagePost.isLast());

        return ResponseEntity.ok(usersResp);
    }

    private Specification<User> filterByField(String filterField, String filterValue) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get(filterField), "%" + filterValue + "%");
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
        user1.setPhone(user.getPhone());
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
