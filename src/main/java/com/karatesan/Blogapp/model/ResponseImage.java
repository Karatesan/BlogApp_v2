package com.karatesan.Blogapp.model;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseImage {
    @Id
    private String id;
    private String name;
    private long size;
    private String base64image;
    
}
