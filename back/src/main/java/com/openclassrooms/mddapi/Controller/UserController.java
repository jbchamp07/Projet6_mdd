package com.openclassrooms.mddapi.Controller;


import com.openclassrooms.mddapi.DTO.AuthSuccess;
import com.openclassrooms.mddapi.DTO.LoginRequest;
import com.openclassrooms.mddapi.DTO.RegisterRequest;
import com.openclassrooms.mddapi.Model.User;
import com.openclassrooms.mddapi.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth/")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("register")
    public ResponseEntity<AuthSuccess> register(@RequestBody RegisterRequest user){
        return ResponseEntity.ok(new AuthSuccess("Token"));
    }

    @PostMapping("login")
    public ResponseEntity<AuthSuccess> login(@RequestBody LoginRequest user){
        try{
            return ResponseEntity.ok(userService.authenticate(user));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AuthSuccess("Token"));
        }

    }

    @GetMapping("me")
    public ResponseEntity<User> login(){
        return ResponseEntity.ok(userService.getUserInfo());
    }
}
