package com.karatesan.Blogapp.controllers;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.karatesan.Blogapp.model.BlogPostBasicResponse;
import com.karatesan.Blogapp.model.BlogPostDTO;
import com.karatesan.Blogapp.model.BlogPostEntity;
import com.karatesan.Blogapp.model.BlogPostResponse;
import com.karatesan.Blogapp.services.BlogPostService;
import com.karatesan.Blogapp.errorHandlers.NotFoundException;

@RestController
@RequestMapping("/api/blogpost")
public class BlogPostController {
	
	private final BlogPostService blogPostService;
	
	public BlogPostController(BlogPostService blogPostService) {
		this.blogPostService = blogPostService;
	}
	
	@GetMapping
	public List<BlogPostResponse>getAllPosts(){
		return blogPostService.findAllBlogPosts();
	}
	
	@GetMapping("/basic")
	public List<BlogPostBasicResponse>getAllBasicPosts(){
		return blogPostService.findAllBasicBlogPosts();
	}
	
	//metoda do zwrocenia czesci postow (pagination) + zrobic osobny request zawierajacy tylko poster bez galerii
	
	@GetMapping("/{id}")
	public BlogPostResponse getBlogPostById(@PathVariable String id) {
	Optional<BlogPostEntity> optional =	blogPostService.findById(id);
	//if(optional.isEmpty()) throw new NotFoundException("Post not found");
	
	BlogPostResponse postResponse = blogPostService.blogPostEntityToResponse(optional.orElse(null));
	return postResponse;
		
	}
	
	
	//POST CREATE BLOG POST --------------------------------------------------------------------
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public BlogPostResponse createPost(@RequestParam("title") String title, 
							   @RequestParam("content")String content, 
							   @RequestParam("author")String author, 
							   @RequestParam("rating")String rating,
							   @RequestParam("images")List<MultipartFile> images)
							    {
		
		System.out.println("Jestem w kreacie1");
		
		//if(blogPostService.validateDuplicateTitle(title)) throw new NotFoundException("Post with this title already exists");
		BlogPostEntity postEntity = new BlogPostEntity();
		try {
			postEntity = blogPostService.createBlogPost(title,content, author,images,Integer.parseInt(rating));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return blogPostService.blogPostEntityToResponse(postEntity);
	}
	
	// DELETE BLOG POST --------------------------------------------------------------------------
	
	@DeleteMapping("/{id}")
	public void deletePost(@PathVariable String id) {
		blogPostService.deletePost(id);
	}
	
	// PUT UPDATE BLOG POST ---------------------------------------------------------------------------
	
	@PutMapping
	public BlogPostResponse updatePost(
			  @RequestParam("id") String id,
			  @RequestParam("title") String title, 
			  @RequestParam("blogDate")LocalDateTime blogDate,
			   @RequestParam("content")String content, 
			   @RequestParam(value = "newImages", required = false)List<MultipartFile> newImages,
			   @RequestParam(value ="deletedIndexes", required = false)List<Integer>deletedIndexes) {
		
		
		System.out.println("jestem tu gdzie patrzwe kontroler/nfgsdfsd/nfdsfsdfsd");

		BlogPostEntity postToUpdate = blogPostService.updateBlogPost(id, title,content,blogDate,newImages,deletedIndexes);
		return blogPostService.blogPostEntityToResponse(postToUpdate);
	}
}
