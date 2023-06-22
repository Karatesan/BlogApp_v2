package com.karatesan.Blogapp.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.karatesan.Blogapp.model.Image;
import com.karatesan.Blogapp.services.ImageService;

@RestController
@RequestMapping("/api/images")
public class ImageController {
	
	private final ImageService service;

	public ImageController(ImageService service) {
		super();
		this.service = service;
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<String> getImageById(@PathVariable String id) {
    	byte[] imageBytes = service.getImageById(id).getData();
        if (imageBytes !=null) {
            return ResponseEntity.ok(Base64.getEncoder().encodeToString(imageBytes));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
//	@GetMapping("/list")
//	public List<byte[]> getAllImagesForPost(List<String>imageIds){
//		List<byte[]> imagesBytes = new ArrayList<>();
//		service.findAllImages().stream().forEach(image->{
//			imagesBytes.add(image.getData());
//		});
//		return imagesBytes;
//	}
    
    @GetMapping
    public ResponseEntity<List<String>> getAllImages() throws IOException {
        List<byte[]> imageBytesList = service.findAllImages().stream().map(image->
			image.getData()).collect(Collectors.toList());    
		List<String> base64Images = imageBytesList.stream()
		        .map(Base64.getEncoder()::encodeToString)
		        .collect(Collectors.toList());
		return ResponseEntity.ok(base64Images);
    }
	
	@PostMapping
	public ResponseEntity<List<Image>> uploadImages(@RequestParam("files") List<MultipartFile> files) {
		List<Image> images = new ArrayList<>();
			
			files.stream().forEach(file->{	
				try {
					Image image = service.storeImage(file);
					images.add(image);
				} catch (IOException e) {
					e.printStackTrace();
				}	
			});

		return ResponseEntity.ok(images);
	}

}
