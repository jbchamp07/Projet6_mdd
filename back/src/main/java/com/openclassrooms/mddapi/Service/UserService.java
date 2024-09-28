package com.openclassrooms.mddapi.Service;

import com.openclassrooms.mddapi.DTO.AuthSuccess;
import com.openclassrooms.mddapi.DTO.LoginRequest;
import com.openclassrooms.mddapi.DTO.RegisterRequest;
import com.openclassrooms.mddapi.Model.User;
import com.openclassrooms.mddapi.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.NoSuchElementException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public void deleteUser(long id){
        userRepository.deleteById(id);
    }
    public User getUserById(long id){
        return userRepository.findById(id).get();
    }
    public User getUserByUsername(String username){
        return userRepository.findByUsername(username).get();
    }
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email).get();
    }

    //Register
    public AuthSuccess register(RegisterRequest request){
        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(Timestamp.from(Instant.now()));
        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return new AuthSuccess(token);
    }
    //Authenticate
    public AuthSuccess authenticate(LoginRequest request) throws Exception {
        User user;
        try{
            user = userRepository.findByEmail(request.getUsername()).get();
        }catch (NoSuchElementException e){
            user = userRepository.findByUsername(request.getUsername()).get();
        }

    if(passwordEncoder.matches(request.getPassword(),user.getPassword())){
            String token = jwtService.generateToken(user);
            //TODO verifier configuration du token
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(user.getUsername(),request.getPassword()));
            return new AuthSuccess(token);
    }else{
        throw new Exception("Email or password incorrect");
    }
    }
    //Get user by authentication
    //TODO
    public User getUserInfo() {
        /*Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return  userRepository.findByUsername(username).get();*/
        User u = new User();
        u.setUsername("u");
        u.setId(1);
        u.setEmail("a.a@gmail.com");
        u.setCreatedAt(null);
        u.setPassword("p");
        return u;
    }
}
