package com.karatesan.Blogapp.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.karatesan.Blogapp.model.BlogPostEntity;

public interface BlogPostRepository extends MongoRepository<BlogPostEntity, String> {
	
	public BlogPostEntity findByTitle(String title);

}
