package com.example.ogani.service;

import com.example.ogani.entity.Blog;
import com.example.ogani.model.request.CreateBlogRequest;

import java.util.List;

public interface BlogService {

    List<Blog> getList();

    List<Blog> getListNewest(int limit);

    Blog getBlog(long id);

    Blog createBlog(CreateBlogRequest request);

    Blog updateBlog(long id,CreateBlogRequest request);

    void deleteBlog(long id);
    List<Blog> findBlogsByTagId(Long tagId);


}
