package com.openclassrooms.mddapi.Controller;

import com.openclassrooms.mddapi.Model.Topic;
import com.openclassrooms.mddapi.Service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = "http://localhost:4200")
public class TopicController {
    @Autowired
    private TopicService topicService;

    @GetMapping("")
    public List<Topic> getTopics(){
        return topicService.getAllTopics();
    }


    @PostMapping("/subscribe")
    public String addSubToTopic(@RequestBody int topicId){
        return topicService.subscription(topicId);
    }

    @GetMapping("/me")
    public List<Topic> getUserTopic(){
        return topicService.getTopicsFromUser();
    }
    /*@PostMapping("")
    public String createTopic(Topic topic){
        return topicService.createTopic(topic);
    }
    @PutMapping("/{id}")
    public String updateTopics(Topic topic){
        return topicService.updateTopic(topic);
    }
    @DeleteMapping("")
    public String deleteTopic(long id){
        return topicService.deleteTopic(id);
    }*/
}
