package com.Authentication_Service.Authentication_Service.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.Authentication_Service.Authentication_Service.Model.User;


public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User findByRole(String role);
    User findUserByUsername(String username);
    User findByUserid(int userid);
}
