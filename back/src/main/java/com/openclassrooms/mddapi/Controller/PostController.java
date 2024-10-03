package com.openclassrooms.mddapi.Controller;

import com.openclassrooms.mddapi.DTO.CommentDTO;
import com.openclassrooms.mddapi.DTO.MessageResponse;
import com.openclassrooms.mddapi.DTO.PostCreationDTO;
import com.openclassrooms.mddapi.Model.Comment;
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

    //Create a post
    @PostMapping
    public MessageResponse createPost(@RequestBody PostCreationDTO post) {
        return postService.createPost(post);
    }

    //Get all posts of a user subscriptions
    @GetMapping
    public List<Post> getAllPosts() {
        List<Post> p = postService.getAllPosts();
        return p;
    }

    //Get a post informations by id
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable("id") long id) {
        return postService.getPostById(id);
    }

    //Add a comment to a post
    @PostMapping("/{id}")
    public MessageResponse addComment(@PathVariable("id") long postId, @RequestBody CommentDTO commentDTO) {
        return postService.addComment(postId,commentDTO);
    }

    //Get all comments of a post
    @GetMapping("/{id}/comments")
    public List<Comment> getComments(@PathVariable("id") long postId){
        return postService.getComments(postId);
    }
}
