package com.karatesan.Blogapp.services;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.karatesan.Blogapp.model.Image;
import com.karatesan.Blogapp.model.ResponseImage;
import com.karatesan.Blogapp.repositories.ImageRepository;

@Service
public class ImageService {
	
	private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image getImageById(String id) {
        return imageRepository.findById(id).orElse(null);
    } 
    
    public List<Image> findAllImages(){
    	return imageRepository.findAll();
    }
    
    public Image fileToImage(MultipartFile file) throws IOException {
        byte[] imageData = file.getBytes();
        String imageName = file.getOriginalFilename();

        Image image = new Image();
        image.setName(imageName);
        image.setData(imageData);
        image.setSize(file.getSize());
        return image;
    }
    
	 public String getImageDataAsBase64(byte[] image) {
		 
	        return Base64.getEncoder().encodeToString(image);		 	 
}
	 
	 public ResponseImage imageToResponseImage(Image image) {
		 
		 ResponseImage responseImage = new ResponseImage(image.getId(), 
				 image.getName(), 
				 image.getDescription(), 
				 image.getSize(), 
				 getImageDataAsBase64(image.getData()));
		 return responseImage;
}
}


