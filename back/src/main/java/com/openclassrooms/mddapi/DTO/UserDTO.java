package com.openclassrooms.mddapi.DTO;

import com.openclassrooms.mddapi.Model.Post;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
public class UserDTO {
    private long Id;
    private String username;
    private String email;
    private String password;
    private List<Post> posts;
    private Date createdAt;
}
