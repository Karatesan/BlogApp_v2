package com.karatesan.Blogapp.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.karatesan.Blogapp.model.BlogPostBasicResponse;
import com.karatesan.Blogapp.model.BlogPostEntity;

public interface BlogPostRepository extends MongoRepository<BlogPostEntity, String> {
	
	public BlogPostEntity findByTitle(String title);
	
	
	@Query(value = "{}", fields = "{ 'gallery' : 0,'comments':0, 'updateBlogDate':0 }")
	public List<BlogPostEntity> findAllPostsBasic();
}
