package com.karatesan.Blogapp.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BlogPostDTO {
	
	@Id
	private String id;
	private String author;
	private String title;
	private String content;
	private LocalDateTime blogDate;
	private LocalDateTime updateBlogDate;
	private String poster;
	private List<String> gallery;
	private List<Comment> comments;
	
	public BlogPostDTO(String id, String author, String title, String content, LocalDateTime blogDate,
			LocalDateTime updateBlogDate, String poster, List<String> gallery, List<Comment> comments) {
		
		super();
		this.id = id;
		this.author = author;
		this.title = title;
		this.content = content;
		this.blogDate = blogDate;
		this.updateBlogDate = updateBlogDate;
		this.poster = poster;
		this.gallery = gallery;
		this.comments = comments;
	}
}
