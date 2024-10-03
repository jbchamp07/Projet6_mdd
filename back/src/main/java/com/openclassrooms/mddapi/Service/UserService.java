package com.openclassrooms.mddapi.Service;

import com.openclassrooms.mddapi.DTO.*;
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

    //Get user information by is id
    public User getUserById(long id){
        return userRepository.findById(id).get();
    }
    //Get user information by is username
    public User getUserByUsername(String username){
        return userRepository.findByUsername(username).get();
    }
    //Get user information by is email
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
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(user.getUsername(),request.getPassword()));
            return new AuthSuccess(token);
    }else{
        throw new Exception("Email or password incorrect");
    }
    }
    //Get user by authentication
    public User getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return  userRepository.findByUsername(username).get();
    }

    //Update user informations
    public MessageResponse updateUser(UserUpdater userUpdated) {
        try{
            User user = getUserInfo();
            user.setUsername(userUpdated.getUsername());
            user.setEmail(userUpdated.getEmail());
            userRepository.save(user);
            return new MessageResponse("Modifier éffectué avec succès");
        }catch (Exception e){
            return new MessageResponse("Erreur lors de la modification");
        }

    }
}
