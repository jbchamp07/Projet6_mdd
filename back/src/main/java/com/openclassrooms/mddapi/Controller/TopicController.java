package com.openclassrooms.mddapi.Controller;

import com.openclassrooms.mddapi.DTO.MessageResponse;
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

    //Get all topics
    @GetMapping("")
    public List<Topic> getTopics(){
        return topicService.getAllTopics();
    }

    //Add a topic subscription to a user
    @PostMapping("/subscribe")
    public MessageResponse addSubToTopic(@RequestBody int topicId){
        return topicService.subscription(topicId);
    }

    //Get all subscriptions of a user
    @GetMapping("/me")
    public List<Topic> getUserTopic(){
        return topicService.getTopicsFromUser();
    }

    //Unsubscribe a user from a topic
    @DeleteMapping("/unsubscribe/{id}")
    public MessageResponse unSubscribe(@PathVariable("id") long topicId){
        return topicService.unSubscribe(topicId);
    }

}
