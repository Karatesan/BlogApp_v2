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
		private String title;
		private String content;
		private LocalDateTime blogDate;
		private List<Image> images;
		
		public BlogPostEntity(String title, String content, LocalDateTime blogDate, List<Image> images) {
			
			this.title = title;
			this.content = content;
			this.blogDate = blogDate;
			this.images = images;
		}

		public BlogPostEntity(String title, String content, List<Image> images) {
			super();
			this.title = title;
			this.content = content;
			this.images = images;
		}
		
		 public List<String> getImageDataAsBase64() {
		        return images.stream().map(image->Base64.getEncoder()
		        				  	  .encodeToString(image.getData()))
		        					  .collect(Collectors.toList());               
		    }
		
}