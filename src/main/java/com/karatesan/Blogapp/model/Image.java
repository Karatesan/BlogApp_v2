package com.karatesan.Blogapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Image {
    @Id
    private String id;
    private String name;
    private long size;
    private byte[] data;
    
	public Image(String name, long size, byte[] data) {
		super();
		this.name = name;
		this.size = size;
		this.data = data;
	}
    


}