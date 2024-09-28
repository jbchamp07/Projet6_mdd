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
    /*@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments;*/
    //@Enumerated(EnumType.STRING)
    @ManyToMany
    @JoinTable(
            name = "post_topics", // Nom de la table d'association
            joinColumns = @JoinColumn(name = "post_id"), // Clé étrangère pour Post
            inverseJoinColumns = @JoinColumn(name = "topic_id") // Clé étrangère pour Topic
    )
    private List<Topic> topics;
    /*@ManyToMany
    @JoinTable(name = "post_subscribers", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> subcribers;*/
    private Date createdAt;

}
