package com.example.ogani.controller;

import com.example.ogani.entity.Image;
import com.example.ogani.exception.BadRequestException;
import com.example.ogani.exception.InternalServerException;
import com.example.ogani.service.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = "*",maxAge = 3600)
public class ImageController {
    private static String UPLOAD_DIR  = System.getProperty("user.dir") + "/src/main/resources/static/photos/";

    @Autowired
    private ImageService imageService;


    @GetMapping("/")
    public ResponseEntity<?> getList(){
        List<Image> listImage = imageService.getListImage();

        return  ResponseEntity.ok(listImage);
    }

    @GetMapping("/user/{id}")
    @Operation(summary="Lấy ra danh sách hình ảnh của user bằng user_id")
    public ResponseEntity<?> getListByUser(@PathVariable long userId){
        List<Image> listImage = imageService.getListByUser(userId);

        return ResponseEntity.ok(listImage);
    }

    @PostMapping("/upload-file")
    @Operation(summary="Upload file lên database")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file){
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);;
        if (originalFilename != null && originalFilename.length() > 0) {
            if (!extension.equals("png") && !extension.equals("jpg") && !extension.equals("gif") && !extension.equals("svg") && !extension.equals("jpeg")) {
                throw new BadRequestException("Không hỗ trợ định dạng file này");
            }
            try {
                Image img = new Image();
                img.setName(file.getName());
                img.setSize(file.getSize());
                img.setType(extension);
                img.setData(file.getBytes());
                String uid = UUID.randomUUID().toString();
                String link = UPLOAD_DIR + uid + "." + extension;
                // Create file
                File serverFile = new File(link);
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(file.getBytes());
                stream.close();

                imageService.save(img);
                return ResponseEntity.ok(img);
            } catch (Exception e) {
                throw new InternalServerException("Lỗi khi upload file");
            }
        }

        throw new BadRequestException("File không hợp lệ");
    }
//    @PutMapping("/update-image/{imageId}")
//    @Operation(summary = "Cập nhật thông tin ảnh")
//    public ResponseEntity<?> updateImage(@PathVariable("imageId") String imageId, @RequestParam("file") MultipartFile file) {
//        try {
//            Image existingImage = imageService.findById(imageId);
//            if (existingImage == null) {
//                throw new NotFoundException("Không tìm thấy ảnh");
//            }
//
//            // Cập nhật thông tin ảnh
//            String originalFilename = file.getOriginalFilename();
//            String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
//            if (!extension.equals("png") && !extension.equals("jpg") && !extension.equals("gif") && !extension.equals("svg") && !extension.equals("jpeg")) {
//                throw new BadRequestException("Không hỗ trợ định dạng file này");
//            }
//            existingImage.setName(file.getName());
//            existingImage.setSize(file.getSize());
//            existingImage.setType(extension);
//            existingImage.setData(file.getBytes());
//
//            // Lưu ảnh đã cập nhật
//            imageService.save(existingImage);
//
//            return ResponseEntity.ok(existingImage);
//        } catch (Exception e) {
//            throw new InternalServerException("Lỗi khi cập nhật ảnh");
//        }
//    }

//    @DeleteMapping("/delete-image/{imageId}")
//    @Operation(summary = "Xóa ảnh")
//    public ResponseEntity<?> deleteImage(@PathVariable("imageId") String imageId) {
//        try {
//            Image existingImage = imageService.findById(imageId);
//            if (existingImage == null) {
//                throw new NotFoundException("Không tìm thấy ảnh");
//            }
//
//            // Xóa ảnh
//            imageService.delete(existingImage);
//
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            throw new InternalServerException("Lỗi khi xóa ảnh");
//        }
//    }
}
