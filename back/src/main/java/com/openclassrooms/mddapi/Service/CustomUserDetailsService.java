package com.openclassrooms.mddapi.Service;

import com.openclassrooms.mddapi.Model.User;
import com.openclassrooms.mddapi.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    //Get user info
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).get();
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder().username(user.getUsername()).password(passwordEncoder.encode(user.getPassword())).authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))).build();
        return userDetails;
    }

}
