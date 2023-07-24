package com.karatesan.Blogapp.model;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BlogPostBasicResponse {
	@Id
	private String id;
	private String title;
	private String content;
	private LocalDateTime blogDate;
	private int rating;
	private ResponseImage poster;
}
