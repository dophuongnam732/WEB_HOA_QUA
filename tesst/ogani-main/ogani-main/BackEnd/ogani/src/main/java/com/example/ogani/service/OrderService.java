package com.example.ogani.service;

import com.example.ogani.entity.Order;
import com.example.ogani.model.request.CreateOrderRequest;

import java.util.List;

public interface OrderService {

    Long placeOrder(CreateOrderRequest request);

    List<Order> getList();

    List<Order> getOrderByUser(String username);
    Boolean changeStatus(Long id);
    Boolean destroyOrder(Long id);
    Order getOrderById(Long id);


}
