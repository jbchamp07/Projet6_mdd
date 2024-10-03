package com.openclassrooms.mddapi.DTO;

import com.openclassrooms.mddapi.Model.Post;
import com.openclassrooms.mddapi.Model.User;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
public class CommentDTO {

    private String message;

}
