package com.openclassrooms.mddapi.DTO;

import com.openclassrooms.mddapi.Model.Topic;
import lombok.Data;

import java.util.List;

@Data
public class PostCreationDTO {
    private String title;
    private String description;
    private List<Topic> topics;
}
