package com.openclassrooms.mddapi.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToMany
    @JoinTable(
            name = "post_topics", // Nom de la table d'association
            joinColumns = @JoinColumn(name = "post_id"), // Clé étrangère pour Post
            inverseJoinColumns = @JoinColumn(name = "topic_id") // Clé étrangère pour Topic
    )
    private List<Topic> topics;
    private Date createdAt;

}
