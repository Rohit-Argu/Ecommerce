package com.ecommerce.app.repository;

import com.ecommerce.app.entity.Address;
import com.ecommerce.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    Optional<Address> findById(int id);

}
