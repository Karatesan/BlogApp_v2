package com.karatesan.Blogapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "images")
@Data
@NoArgsConstructor
public class Image {
    @Id
    private String id;
    private String name;
    private byte[] data;
    
	public Image(String name, byte[] data) {
		super();
		this.name = name;
		this.data = data;
	}


}