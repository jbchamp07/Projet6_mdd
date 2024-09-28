package com.openclassrooms.mddapi.DTO;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.openclassrooms.mddapi.Model.Comment;
import com.openclassrooms.mddapi.Model.Topic;
import com.openclassrooms.mddapi.Model.User;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
public class PostDTO {

    private long id;
    private String title;
    private String description;

    private User user;
    private List<Comment> comments;
    private List<Topic> topics;

    private List<User> subcribers;
    private Date createdAt;
}
