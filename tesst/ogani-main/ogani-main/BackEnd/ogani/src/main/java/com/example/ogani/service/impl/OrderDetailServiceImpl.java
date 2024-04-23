package com.example.ogani.service.impl;

import com.example.ogani.entity.Order;
import com.example.ogani.entity.OrderDetail;
import com.example.ogani.repository.OrderDetailRepository;
import com.example.ogani.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public OrderDetail getOrderDetailById(Long id) {
        return orderDetailRepository.findById(id).orElse(null);
    }

    @Override
    public List<OrderDetail> getOrderDetailsByOrderId(Long id) {
        return orderDetailRepository.findByOrder_Id(id);
    }

    @Override
    public void deleteByOrder(Order order) {
        orderDetailRepository.deleteAllByOrderId(order.getId());
    }
}
