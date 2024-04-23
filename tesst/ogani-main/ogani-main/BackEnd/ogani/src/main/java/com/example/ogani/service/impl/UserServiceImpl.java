package com.example.ogani.service.impl;

import com.example.ogani.email.EmailSender;
import com.example.ogani.entity.ERole;
import com.example.ogani.entity.Role;
import com.example.ogani.entity.User;
import com.example.ogani.exception.BadRequestException;
import com.example.ogani.exception.NotFoundException;
import com.example.ogani.model.request.ChangePasswordRequest;
import com.example.ogani.model.request.CreateUserRequest;
import com.example.ogani.model.request.UpdateProfileRequest;
import com.example.ogani.repository.RoleRepository;
import com.example.ogani.repository.UserRepository;
import com.example.ogani.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private EmailSender emailSender;

    @Override
    public void register(CreateUserRequest request) {
        // TODO Auto-generated method stub
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        Set<String> strRoles = request.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        user.setStatus(0);
        user.setVerificationCode(generateRandomString());
        user = userRepository.save(user);
        String verifyUrl = "http://localhost:8080/api/auth/verify?code=" + user.getVerificationCode();
        String sendTo = user.getEmail();
        String subject = "Shop Origin - Kích hoạt tài khoản người dùng !";
        String body = "Mời bạn nhấn vào đường link: " + verifyUrl + " để kích hoạt tài khoản !";
        emailSender.sendEmail(sendTo, subject, body);
        System.out.println(verifyUrl);
    }

    @Override
    public User getUserByUsername(String username) {
        // TODO Auto-generated method stub
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NotFoundException("Not Found User"));
        return user;
    }

    @Override
    public User updateUser(UpdateProfileRequest request) {
        // TODO Auto-generated method stub
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new NotFoundException("Not Found User"));
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setCountry(request.getCountry());
        user.setState(request.getState());
        user.setAddress(request.getAddress());
        user.setPhone(request.getPhone());
        userRepository.save(user);
        return user;
    }

    @Override
    public void changePassword(ChangePasswordRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new NotFoundException("Not Fount User"));
        if (!encoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new BadRequestException("Mật khẩu cũ không tồn tại !");
        }
        if (request.getOldPassword().equals(request.getNewPassword())) {
            throw new BadRequestException("Old Password must be not New Password");
        }
        if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            throw new BadRequestException("New Password giong ConFirmPassrord");
        }
        String newPassword = encoder.encode(request.getNewPassword());
        user.setPassword(newPassword);
        userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Boolean changeStatus(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User Not Found"));
        if (user.getStatus() == 1) {
            user.setStatus(0);
        } else {
            user.setStatus(1);
        }
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean verifyAcount(String code) {
        User user =  userRepository.findByVerificationCode(code);
        if(user == null){
            return false;
        }
        user.setStatus(1);
        user.setVerificationCode(null);
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean forgotPassword(String email) {
        User user =  userRepository.findByEmail(email);
        if(user == null){
            return false;
        }
        String newPass = generateRandomString();
        user.setPassword(encoder.encode(newPass));
        userRepository.save(user);
        String sendTo = user.getEmail();
        String subject = "Shop Orrigin - Mật khẩu mới !";
        String body = "Mật khẩu mới của bạn là: " + newPass + " \n Vui lòng đổi mật khẩu sau khi đăng nhập !";
        emailSender.sendEmail(sendTo, subject, body);
        return true;
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    private String generateRandomString() {
        String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        Random random = new Random();
        StringBuilder sb = new StringBuilder(10);

        for (int i = 0; i < 10; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            sb.append(randomChar);
        }

        return sb.toString();
    }
}
