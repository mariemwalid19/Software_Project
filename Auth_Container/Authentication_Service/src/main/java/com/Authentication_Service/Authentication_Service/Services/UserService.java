package com.Authentication_Service.Authentication_Service.Services;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Authentication_Service.Authentication_Service.DtoReturn.UserDtoReturn;
import com.Authentication_Service.Authentication_Service.Model.User;
import com.Authentication_Service.Authentication_Service.Repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public UserService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public UserDtoReturn getUserDtoReturn(User user) {
        return modelMapper.map(user, UserDtoReturn.class);
    }
    
    public Optional<User> getUserById(int userId) {
        return userRepository.findById(userId);
    }

    // Implement service methods here
}