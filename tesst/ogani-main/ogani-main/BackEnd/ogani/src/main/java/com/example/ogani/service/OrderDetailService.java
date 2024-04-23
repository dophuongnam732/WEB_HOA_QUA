package com.example.ogani.service;

import com.example.ogani.entity.Order;
import com.example.ogani.entity.OrderDetail;

import java.util.List;

public interface OrderDetailService {
    OrderDetail getOrderDetailById(Long id);

    List<OrderDetail> getOrderDetailsByOrderId(Long id);

    void deleteByOrder(Order order);
}
