package com.example.ogani.controller;

import com.example.ogani.entity.OrderDetail;
import com.example.ogani.service.OrderDetailService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;
    @GetMapping("/orderDetailByOrder/{id}")
    @Operation(summary = "Lấy chi tiết đơn hàng theo ID order")
    public ResponseEntity<List<OrderDetail>> getOrderDetailById(@PathVariable("id") Long id) {
        List<OrderDetail> orderDetails = orderDetailService.getOrderDetailsByOrderId(id);
        if (!orderDetails.isEmpty()) {
            return ResponseEntity.ok(orderDetails);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
