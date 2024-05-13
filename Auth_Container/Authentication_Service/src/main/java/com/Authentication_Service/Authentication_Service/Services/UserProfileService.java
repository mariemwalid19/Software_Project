package com.Authentication_Service.Authentication_Service.Services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import  com.Authentication_Service.Authentication_Service.Dto.ProfileDto;
import com.Authentication_Service.Authentication_Service.Model.UserProfile;
import com.Authentication_Service.Authentication_Service.Repository.UserProfileRepository;

@Service
public class UserProfileService {
    private List<String> AllowedExtensions = Arrays.asList(".jpg", ".png");
    @Autowired
    private final static ModelMapper modelMapper = new ModelMapper();
    // @Autowired
    private static UserProfileRepository userProfileRepository;

    @Autowired
    public UserProfileService(UserProfileRepository userProfileRepository) {
        UserProfileService.userProfileRepository = userProfileRepository;
    }

    public static UserProfile getProfileByUserId(int userId) {
        UserProfile profile =userProfileRepository.findByUserid(userId);
        // ProfileDtoReturn profile = modelMapper.map(userProfileRepository.findByUserid(userId),ProfileDtoReturn.class);
        return profile;
    }

    public static String updateProfile(int userId, ProfileDto user__profileDto) {

        UserProfile profile = userProfileRepository.findByUserid(userId);

        if (profile == null) {
            return "there is no profile with this id";
        }
        if (user__profileDto.getProfileimage() != null) {
            try {
                byte[] profileImage = convertMultipartFileToByteArray(user__profileDto.getProfileimage());
                profile.setProfileimage(profileImage);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        profile.setFname(user__profileDto.getFname());
        profile.setLname(user__profileDto.getLname());
        profile.setEmail(user__profileDto.getEmail());

        userProfileRepository.save(profile);
        return String.format("profile With User Id %d have been updated successfully", userId);
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

    public static byte[] convertMultipartFileToByteArray(MultipartFile file) throws IOException {
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
}
