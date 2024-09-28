package com.openclassrooms.mddapi.Model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private String message;
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
    private Date createdAd;

}
