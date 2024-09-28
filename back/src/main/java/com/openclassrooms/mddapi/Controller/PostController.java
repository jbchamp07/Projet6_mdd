package com.openclassrooms.mddapi.Controller;

import com.openclassrooms.mddapi.DTO.PostCreationDTO;
import com.openclassrooms.mddapi.DTO.PostDTO;
import com.openclassrooms.mddapi.Model.Post;
import com.openclassrooms.mddapi.Model.Topic;
import com.openclassrooms.mddapi.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {

    @Autowired
    private PostService postService;

    // Endpoint pour créer un post
    @PostMapping
    public String createPost(@RequestBody PostCreationDTO post) {
        return postService.createPost(post);
    }

    // Endpoint pour obtenir tous les posts
    @GetMapping
    public List<Post> getAllPosts() {
        List<Post> p = postService.getAllPosts();
        return p;
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable("id") long id) {
        return postService.getPostById(id);
    }

/*
    // Endpoint pour obtenir un post par ID
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable("id") long id) {
        Post post = postService.getPostById(id);
        if (post != null) {
            return new ResponseEntity<>(post, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }*/

    // Endpoint pour mettre à jour un post
    /*@PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable("id") long id, @RequestBody Post updatedPost) {
        Post existingPost = postService.getPostById(id);
        if (existingPost != null) {
            updatedPost.setId(id); // s'assurer que l'ID correspond
            postService.updatePost(updatedPost);
            return new ResponseEntity<>(updatedPost, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }*/

    // Endpoint pour supprimer un post
    /*@DeleteMapping("/{id}")
    public String deletePost(@PathVariable("id") long id) {
        postService.deletePost(id);
        return "Post deleted";
    }*/

    // Endpoint pour obtenir les posts d'un sujet spécifique
    /*@GetMapping("/topic/{topic}")
    public ResponseEntity<List<Post>> getPostsFromATopic(@PathVariable("topic") String topic) {
        List<Post> posts = postService.getPostsFromATopic(topic);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }*/

    // Endpoint pour obtenir les posts de plusieurs sujets
    /*@PostMapping("/topics")
    public ResponseEntity<List<Post>> getPostsFromTopics(@RequestBody List<Topic> topics) {
        List<Post> posts = postService.getPostsFromTopics(topics);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }*/

}
