package com.karatesan.Blogapp.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

public class Comment {
	
	@Id
	private String id;
	private String author;
	private String content;
	private LocalDateTime time;
}
