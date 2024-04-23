package com.example.ogani.service.impl;

import com.example.ogani.entity.Image;
import com.example.ogani.entity.Product;
import com.example.ogani.repository.ImageRepository;
import com.example.ogani.repository.ProductRepository;
import com.example.ogani.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductImageServiceImpl implements ProductImageService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Override
    public void deleteProductImage(long productId, long imageId) {
        Optional<Product> productOptional = productRepository.findById(productId);
        Optional<Image> imageOptional = imageRepository.findById(imageId);

        if (productOptional.isPresent() && imageOptional.isPresent()) {
            Product product = productOptional.get();
            Image image = imageOptional.get();

            product.getImages().remove(image);
            productRepository.save(product);
        }
    }
}
