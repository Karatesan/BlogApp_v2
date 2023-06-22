package com.karatesan.Blogapp.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.karatesan.Blogapp.model.Image;

public interface ImageRepository extends MongoRepository<Image, String> {
	
	
		
	

}
