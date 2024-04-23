package com.example.ogani.controller;

import com.example.ogani.entity.Order;
import com.example.ogani.model.request.CreateOrderRequest;
import com.example.ogani.model.response.MessageResponse;
import com.example.ogani.service.OrderDetailService;
import com.example.ogani.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderController {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public OrderController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping("/")
    @Operation(summary = "Lấy ra danh sách đặt hàng")
    public ResponseEntity<List<Order>> getList() {
        List<Order> list = orderService.getList();

        return ResponseEntity.ok(list);
    }
    @GetMapping("/{id}")
    @Operation(summary = "Lấy đơn hàng theo ID")
    public ResponseEntity<Order> getOrderById(@PathVariable("id") Long id) {
        Order order = orderService.getOrderById(id);
        if (order!= null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.ok(order);
        }
    }
    @GetMapping("/user")
    @Operation(summary = "Lấy ra danh sách đặt hàng của người dùng bằng username")
    public ResponseEntity<List<Order>> getListByUser(@RequestParam("username") String username) {
        List<Order> list = orderService.getOrderByUser(username);

        return ResponseEntity.ok(list);
    }

    @PostMapping("/create")
    @Operation(summary = "Đặt hàng sản phẩm")
    public ResponseEntity<Long> placeOrder(@RequestBody CreateOrderRequest request) {

        // Gửi thông điệp WebSocket đến '/topic/newOrder'
//        messagingTemplate.convertAndSend("/topic/newOrder", "Có đơn hàng mới!");

        return ResponseEntity.ok(orderService.placeOrder(request));
    }

    @PostMapping("/changeStatus/{id}")
    @Operation(summary = "Thay đổi trạng thái đơn hàng")
    public ResponseEntity<?> changeStatus(@PathVariable Long id) {
        Boolean result = orderService.changeStatus(id);
        if (result) {
            return ResponseEntity.ok(new MessageResponse("Thay đổi thành công !"));
        }
        return ResponseEntity.ok(new MessageResponse("Thất bại !"));
    }

    @PostMapping("/destroyOrder/{id}")
    @Operation(summary = "Hủy đơn")
    public ResponseEntity<?> destroyOrder(@PathVariable Long id) {
        Boolean result = orderService.destroyOrder(id);
        if (result) {
            return ResponseEntity.ok(new MessageResponse("Hủy đơn thành công !"));
        }
        return ResponseEntity.ok(new MessageResponse("Thất bại !"));
    }
}
