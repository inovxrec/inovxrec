package com.leetcodeclone.backend.service;

import com.leetcodeclone.backend.entity.User;
import com.leetcodeclone.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean signup(String username, String email, String password) {
        if (userRepository.existsByEmail(email) || userRepository.existsByUsername(username)) {
            return false;
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        return true;
    }

    public boolean login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            return passwordEncoder.matches(password, userOpt.get().getPassword());
        }
        return false;
    }
}
