package com.karatesan.Blogapp.services;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.karatesan.Blogapp.model.BlogPostDTO;
import com.karatesan.Blogapp.model.BlogPostEntity;
import com.karatesan.Blogapp.model.BlogPostRequest;
import com.karatesan.Blogapp.model.Image;
import com.karatesan.Blogapp.repositories.BlogPostRepository;

@Service
public class BlogPostService {
	
	private final BlogPostRepository repository;
	private final ImageService imageService;


	
	public BlogPostService(BlogPostRepository repository, ImageService imageService) {
		this.repository = repository;
		this.imageService = imageService;
	}

	public List<BlogPostDTO> findAllBlogPosts(){
		
		return repository.findAll().stream().map(post->blogPostEntityToDTO(post)).collect(Collectors.toList());
	}	
	
	public Optional<BlogPostEntity> findById(String id) {
		return repository.findById(id);
	}
	

	public Optional<BlogPostEntity> findByTitle(String title) {
		Optional<BlogPostEntity> optional = Optional.ofNullable(repository.findByTitle(title));
		return optional;
	}

	public BlogPostEntity createBlogPost(String title, String content, List<MultipartFile> images) {
		LocalDateTime dateTime = LocalDateTime.now();
		List<Image> imagesAsBytes = multiPartFIleToBytes(images);
		BlogPostEntity post = new BlogPostEntity(title, content, dateTime, imagesAsBytes);
		return repository.save(post);
	}
	
	public BlogPostEntity updateBlogPost(BlogPostEntity post) {
		
		return repository.save(post);
	}

	private List<Image> multiPartFIleToBytes(List<MultipartFile> images) {
		List<Image>imagesAsBytes = images.stream()
										  .map(image->{
											try {
												return imageService.fileToImage(image);
											} catch (IOException e) {
												e.printStackTrace();
											}
											return null;
										})
										  .collect(Collectors.toList());
		return imagesAsBytes;
	}

	public boolean validateDuplicateTitle(String title) {
		return repository.findByTitle(title)!=null?true:false;
	}
	
	public BlogPostDTO blogPostEntityToDTO(BlogPostEntity post) {

		BlogPostDTO newPost = new BlogPostDTO(post.getId(), post.getTitle(), post.getContent(), post.getBlogDate(), post.getImageDataAsBase64());
		return newPost;
}
	public BlogPostEntity blogPostRequestToEntity(BlogPostRequest post) {
		System.out.println("jestem tu gdzie patrzwe servis/nfgsdfsd/nfdsfsdfsd");
		
		BlogPostEntity newPost = new BlogPostEntity(post.getId(), 
				post.getTitle(), 
				post.getContent(), 
				post.getBlogDate(), 
				multiPartFIleToBytes(post.getImages()));
		return newPost;

		
	}
}
