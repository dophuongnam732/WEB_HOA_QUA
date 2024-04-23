package com.example.ogani.controller;

import com.example.ogani.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/api/product-image")
@CrossOrigin(origins = "*",maxAge = 3600)
public class ProductImage {
    @Autowired
    private ProductImageService productImageService;
    @DeleteMapping("/{productId}/{imageId}")
    public void deleteProductImage(@PathVariable("productId") long productId, @PathVariable("imageId") long imageId) {
        productImageService.deleteProductImage(productId, imageId);
    }
}
