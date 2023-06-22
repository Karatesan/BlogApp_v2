package com.karatesan.Blogapp.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class BlogPostDTO {
	
	@Id
	private String id;
	private String title;
	private String content;
	private LocalDateTime blogDate;
	//base64 string encoded images
	private List<String> images;
	

	public BlogPostDTO(String id, String title, String content, LocalDateTime blogDate, List<String> images) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
		this.blogDate = blogDate;
		this.images = images;
	}
}
