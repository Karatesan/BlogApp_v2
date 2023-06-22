package com.karatesan.Blogapp.model;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.annotation.Id;
import lombok.Data;

@Data
public class BlogPostRequest {
	
	@Id
	private String id;
	private String title;
	private String content;
	private LocalDateTime blogDate;
	private List<String> images;
	
	public BlogPostRequest(String title, String content, LocalDateTime blogDate, List<String> images) {
		super();
		this.title = title;
		this.content = content;
		this.blogDate = blogDate;
		this.images = images;
	}

	public BlogPostRequest(String title, String content, List<String> images) {
		this.title = title;
		this.content = content;
		this.images = images;
	}
	
	
	
	

}
