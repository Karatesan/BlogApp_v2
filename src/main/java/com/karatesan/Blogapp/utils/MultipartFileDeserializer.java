//package com.karatesan.Blogapp.utils;
//
//import java.io.IOException;
//import java.util.Base64;
//
//import org.springframework.web.multipart.MultipartFile;
//
//import com.fasterxml.jackson.core.JsonParser;
//import com.fasterxml.jackson.databind.DeserializationContext;
//import com.fasterxml.jackson.databind.JsonDeserializer;
//
//public class MultipartFileDeserializer extends JsonDeserializer<MultipartFile> {
//
//    @Override
//    public MultipartFile deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
//            throws IOException {
//        // Implement the deserialization logic here
//        // Extract the necessary data from the JSON parser and create a MultipartFile object
//        
//        // Example: Assuming Base64 encoded data is passed in the JSON
//        byte[] fileBytes = Base64.getDecoder().decode(jsonParser.getValueAsString());
//        return new MultipartFile("file", fileBytes);
//    }
//}
