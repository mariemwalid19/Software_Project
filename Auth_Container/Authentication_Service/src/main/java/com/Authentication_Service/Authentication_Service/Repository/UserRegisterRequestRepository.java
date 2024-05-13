package com.Authentication_Service.Authentication_Service.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.Authentication_Service.Authentication_Service.Model.UserRegisterRequest;

public interface UserRegisterRequestRepository extends JpaRepository<UserRegisterRequest, Integer> {
    UserRegisterRequest findByUsername(String username);
    UserRegisterRequest findByEmail(String email);
}
