package com.Authentication_Service.Authentication_Service.Services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.Authentication_Service.Authentication_Service.Repository.UserRegisterRequestRepository;

@Component

public class UserRegisterRequestService {
    private List<String> AllowedExtensions = Arrays.asList(".jpg", ".png");

    @Autowired
    private UserRegisterRequestRepository userRegisterRequestRepository;
    private final ModelMapper modelMapper;

    public UserRegisterRequestService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public String getFileExtension(String filename) {
        int lastIndex = filename.lastIndexOf(".");
        if (lastIndex == -1) {
            return "";
        }
        return filename.substring(lastIndex).toLowerCase();
    }

    public boolean isAllowedExtension(String extension) {
        // Define your allowed extensions logic here
        return AllowedExtensions.contains(extension);
    }

    public byte[] convertMultipartFileToByteArray(MultipartFile file) throws IOException {
        try (InputStream inputStream = file.getInputStream();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            return outputStream.toByteArray();
        }
    }

    // Implement
}
