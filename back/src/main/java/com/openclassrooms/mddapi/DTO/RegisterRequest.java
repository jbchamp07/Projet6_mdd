package com.openclassrooms.mddapi.DTO;

import lombok.Data;

@Data
public class RegisterRequest {

    private String username;

    private String email;

    private String password;

}
