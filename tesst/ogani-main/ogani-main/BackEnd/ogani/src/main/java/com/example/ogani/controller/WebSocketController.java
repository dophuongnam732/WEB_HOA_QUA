//package com.example.ogani.controller;
//
//import com.example.ogani.entity.Order;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Controller;
//
//@Controller
//public class WebSocketController {
//
//    @Autowired
//    private SimpMessagingTemplate messagingTemplate;
//
//    @MessageMapping("/orderPlaced")
//    public void orderPlaced(Order order) {
//        messagingTemplate.convertAndSend("/topic/newOrder", order);
//    }
//}
