package com.karatesan.Blogapp.model;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogPostResponse {
	//sent from api to client
	
	@Id
	private String id;
	private String author;
	private String title;
	private String content;
	private LocalDateTime blogDate;
	private LocalDateTime updateBlogDate;
	private ResponseImage poster;
	private int rating;
	private List<ResponseImage> gallery;
	private List<Comment> comments;
	
}
