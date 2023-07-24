package com.karatesan.Blogapp.model;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "blog_posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostEntity {

		@Id
		private String id;
		private String author;
		private String title;
		private String content;
		private LocalDateTime blogDate;
		private LocalDateTime updateBlogDate;
		private Image poster;
		private int rating;
		private List<Image> gallery;
		private List<Comment> comments;
		public BlogPostEntity(String author, String title, String content, LocalDateTime blogDate,
				LocalDateTime updateBlogDate, Image poster, int rating, List<Image> gallery, List<Comment> comments) {
			super();
			this.author = author;
			this.title = title;
			this.content = content;
			this.blogDate = blogDate;
			this.updateBlogDate = updateBlogDate;
			this.poster = poster;
			this.rating = rating;
			this.gallery = gallery;
			this.comments = comments;
		}
}