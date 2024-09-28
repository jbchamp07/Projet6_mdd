package com.openclassrooms.mddapi.Service;

import com.openclassrooms.mddapi.DTO.PostCreationDTO;
import com.openclassrooms.mddapi.DTO.PostDTO;
import com.openclassrooms.mddapi.Model.Post;
import com.openclassrooms.mddapi.Model.Topic;
import com.openclassrooms.mddapi.Model.User;
import com.openclassrooms.mddapi.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    public String createPost(PostCreationDTO postDto){
        try{
            Post post = new Post();
            post.setTitle(postDto.getTitle());
            post.setDescription(postDto.getDescription());
            post.setTopics(postDto.getTopics());
            post.setCreatedAt(Date.from(Instant.now()));


            //TODO assigner user au post avec authentification
            User uCreator = new User();
            uCreator.setUsername("u");
            uCreator.setId(1);
            uCreator.setEmail("a.a@gmail.com");
            uCreator.setCreatedAt(null);
            uCreator.setPassword("p");
            post.setUser(uCreator);


            postRepository.save(post);
            return "Post created";
        }catch (Exception e){
            return "Error : " + e.getMessage() + " creating post :" + postDto.getTitle();
        }
    }
    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    public Post getPostById(long id){
        return postRepository.findById(id).get();
    }

    /*public void deletePost(long id){
        postRepository.deleteById(id);
    }
    public void updatePost(Post post){
        postRepository.save(post);
    }
    public Post getPostById(long id){
        return postRepository.findById(id).get();
    }

    public List<Post> getPostsFromATopic(String topic){
        return postRepository.findAll().stream().filter(p -> p.getTopics().contains(topic)).collect(Collectors.toList());
    }
    public List<Post> getPostsFromTopics(List<Topic> topics){
        return postRepository.findAll().stream().filter(t -> t.getTopics().stream().anyMatch(topics::contains)).collect(Collectors.toList());
    }*/
}
