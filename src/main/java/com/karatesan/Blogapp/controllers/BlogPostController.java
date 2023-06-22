package com.karatesan.Blogapp.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.karatesan.Blogapp.model.BlogPostDTO;
import com.karatesan.Blogapp.model.BlogPostEntity;
import com.karatesan.Blogapp.model.BlogPostRequest;
import com.karatesan.Blogapp.services.BlogPostService;
import ErrorHandlers.NotFoundException;

@RestController
@RequestMapping("/api/blogpost")
public class BlogPostController {
	
	private final BlogPostService blogPostService;
	

	public BlogPostController(BlogPostService blogPostService) {
		this.blogPostService = blogPostService;
	}


	@GetMapping
	public List<BlogPostDTO>getAllPosts(){
		return blogPostService.findAllBlogPosts();
	}
	
	@GetMapping("/{id}")
	public BlogPostDTO getBlogPostById(@PathVariable String id) {
	Optional<BlogPostEntity> optional =	blogPostService.findById(id);
	if(optional.isEmpty()) throw new NotFoundException("Post not found");
	return blogPostService.blogPostEntityToDTO(optional.get());
	}
	
	
//	@GetMapping("/images/{id}")
//	public ResponseEntity<List<String>>getPostImages(@PathVariable String id){
//		BlogPost post = blogPostService.findById(id).get();
//		Encoder encoder = Base64.getEncoder();
//		if(post != null) {
//			System.out.println("Mam posta");
//			List<String> idsList = new ArrayList<>(); 
//			for(int i=0;i<post.getImageIds().size();++i) 
//				idsList.add(post.getImageIds().get(i));
//			System.out.println("Lista id" + idsList);
//			
//			List<String> base64Images = idsList.stream().map(imageId->
//				encoder.encodeToString(imageService.getImageById(imageId).getData()))
//					.collect(Collectors.toList());
//				return ResponseEntity.ok(base64Images);	
//		}
//		else throw new RuntimeException("Incorect Blog id");
//	}
	
//	@PostMapping
//	public BlogPost createPost(@RequestParam("title") String title, 
//							   @RequestParam("content")String content, 
//							   @RequestParam("images")List<MultipartFile> images) {
//		
//		List<String>imageIds = new ArrayList<>();
//		
//		images.stream().forEach(image ->{
//			try {
//				Image createdImage = imageService.storeImage(image);
//				imageIds.add(createdImage.getId());
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
//		);
//
//		BlogPost createdBlogPostDTO = new BlogPost(title, content, imageIds);
//		return blogPostService.storeBlogPost(createdBlogPostDTO);
//		
//	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public BlogPostDTO createPost(@RequestParam("title") String title, 
							   @RequestParam("content")String content, 
							   @RequestParam("images")List<MultipartFile> images) {
		
		if(blogPostService.validateDuplicateTitle(title)) throw new NotFoundException("Post with this title already exists");
		BlogPostEntity postEntity = blogPostService.createBlogPost(title,content,images);
		return blogPostService.blogPostEntityToDTO(postEntity);
	}
	
	@PutMapping
	public BlogPostDTO updatePost(@RequestParam("title") String title, 
			   @RequestParam("content")String content, 
			   @RequestParam("newIages")List<MultipartFile> newIages,
			   @RequestParam("deletedIndexes")List<Integer>deletedIndexes) {
		System.out.println("jestem tu gdzie patrzwe kontroler/nfgsdfsd/nfdsfsdfsd");

		//BlogPostEntity postToUpdate = blogPostService.updateBlogPost(blogPostService.blogPostRequestToEntity(updatedPost));
		return null;	
	}
}
