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
import com.karatesan.Blogapp.repositories.ImageRepository;

@Service
public class ImageService {
	
	private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image storeImage(MultipartFile file) throws IOException {

        return imageRepository.save(fileToImage(file));
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
        return image;
    }

    
    public String ImageDbToBase64String(Image image) {

    	return Base64.getEncoder().encodeToString(image.getData());
    }
    
    public Image base64StringToImage(MultipartFile image) {
    	
		return null;
    	
    }
}


