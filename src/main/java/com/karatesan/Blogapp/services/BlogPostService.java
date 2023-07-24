package com.karatesan.Blogapp.services;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.Fields;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.karatesan.Blogapp.model.BlogPostBasicResponse;
import com.karatesan.Blogapp.model.BlogPostDTO;
import com.karatesan.Blogapp.model.BlogPostEntity;
import com.karatesan.Blogapp.model.BlogPostResponse;
import com.karatesan.Blogapp.model.Image;
import com.karatesan.Blogapp.model.ResponseImage;
import com.karatesan.Blogapp.repositories.BlogPostRepository;

import ErrorHandlers.NotFoundException;
import ch.qos.logback.core.joran.conditional.IfAction;

@Service
public class BlogPostService {
	
	private final BlogPostRepository repository;
	private final ImageService imageService;
	private final MongoTemplate mongoTemplate;


	public BlogPostService(BlogPostRepository repository, ImageService imageService, MongoTemplate mongoTemplate) {
		super();
		this.repository = repository;
		this.imageService = imageService;
		this.mongoTemplate = mongoTemplate;
	}
	
	
// Fetching from database -------------------------------------------------------------------
	
	public List<BlogPostResponse> findAllBlogPosts(){
		
		return repository.findAll().stream().map(post->blogPostEntityToResponse(post)).collect(Collectors.toList());
	}	
	
	//--------------------------------------------------------------------------------------
	
	public List<BlogPostBasicResponse> findAllBasicBlogPosts(){
		
		List<BlogPostEntity> posts = repository.findAllPostsBasic();
		List<BlogPostBasicResponse> basicResponsePosts = posts.stream().map(post->blogPostEntityToBlogPostBasicResponse(post)).collect(Collectors.toList());
		return basicResponsePosts;
	}
	
	//--------------------------------------------------------------------------------------
	
	public Optional<BlogPostEntity> findById(String id) {
		return repository.findById(id);
	}
	
	//--------------------------------------------------------------------------------------

	public Optional<BlogPostEntity> findByTitle(String title) {
		Optional<BlogPostEntity> optional = Optional.ofNullable(repository.findByTitle(title));
		return optional;
	}
	
	// CREATE -------------------------------------------------------------------------------------

	public BlogPostEntity createBlogPost(String title, String content, String author, List<MultipartFile> images,int rating) throws IOException {
		LocalDateTime dateTime = LocalDateTime.now();
		
		Image poster = null;
		List<Image> gallery = new ArrayList<>();
		if(images.size()>0) {
			poster = imageService.fileToImage(images.get(0));
		}
		
		if(images.size()>1) {
		for(int i=1;i<images.size();++i)
			gallery.add(imageService.fileToImage(images.get(i)));
		}
		BlogPostEntity post = new BlogPostEntity(author, title, content, dateTime, null, poster, rating, gallery, null);
		return repository.save(post);
		}
	
	// UPDATE-------------------------------------------------------------------------------------
	
	public BlogPostEntity updateBlogPost(String id, String title, String content, LocalDateTime blogDate,
			List<MultipartFile> newImages, List<Integer> deletedIndexes) {

		Optional<BlogPostEntity> post = findById(id);
		BlogPostEntity updatedPost = new BlogPostEntity();
		if(post.isPresent()) {
			updatedPost.setId(id);
			updatedPost.setTitle(title);
			updatedPost.setContent(content);
			updatedPost.setBlogDate(blogDate);
			List<Image> currentImages = post.get().getImages();
			if(deletedIndexes!=null) {
				for(int i=0;i<deletedIndexes.size();++i) {
					currentImages.remove(deletedIndexes.get(i).intValue());

				}
			}
			if(newImages!=null)currentImages.addAll(multiPartFIleToBytes(newImages));
				updatedPost.setImages(currentImages);	
				return repository.save(updatedPost);
				}
		throw new NotFoundException("Post not found");
	}
	
	// DELETE-------------------------------------------------------------------------------------

	public void deletePost(String id) {
		repository.deleteById(id);	
	}
	
	// -------------------------------------------------------------------------------------
	

	public boolean validateDuplicateTitle(String title) {
		return repository.findByTitle(title)!=null?true:false;
	}
	
	// BlogPost entity (database model) to BlogPost responmse (Model sent to client) ------------------------------------------------
	
	public BlogPostResponse blogPostEntityToResponse(BlogPostEntity post) {
		
		ResponseImage poster = imageService.imageToResponseImage(post.getPoster());
		List<ResponseImage>galleryImages = post.getGallery().stream().map(image->imageService.imageToResponseImage(image)).collect(Collectors.toList());
		BlogPostResponse newPost = new BlogPostResponse(post.getId(), post.getAuthor(),post.getTitle(), post.getContent(), post.getBlogDate(), post.getUpdateBlogDate(), poster, post.getRating(), galleryImages,post.getComments());
		return newPost;
}
	
	//BlogPost Basic - returns model for main page - containing only poster, no gallery --------------------------------------
	
	public BlogPostBasicResponse blogPostEntityToBlogPostBasicResponse(BlogPostEntity post) {
						
		BlogPostBasicResponse post2 = new BlogPostBasicResponse(post.getId(), 
													  post.getTitle(), 
													  post.getContent(), 
													  post.getBlogDate(), 
													  post.getRating(),
													  imageService.imageToResponseImage(post.getPoster()));
		return post2;
	}
	

}
