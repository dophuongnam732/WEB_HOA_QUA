package com.example.ogani.service.impl;

import com.example.ogani.entity.Order;
import com.example.ogani.entity.OrderDetail;
import com.example.ogani.entity.Product;
import com.example.ogani.entity.User;
import com.example.ogani.exception.BadRequestException;
import com.example.ogani.exception.NotFoundException;
import com.example.ogani.model.request.CreateOrderDetailRequest;
import com.example.ogani.model.request.CreateOrderRequest;
import com.example.ogani.repository.OrderDetailRepository;
import com.example.ogani.repository.OrderRepository;
import com.example.ogani.repository.ProductRepository;
import com.example.ogani.repository.UserRepository;
import com.example.ogani.service.OrderDetailService;
import com.example.ogani.service.OrderService;
import com.example.ogani.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private ProductRepository productRepository;

    private final SimpMessagingTemplate messagingTemplate;

    public OrderServiceImpl(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }
    public void sendOrderNotification(String message) {
        messagingTemplate.convertAndSend("/topic/order-updates", message);
    }

    @Override
    public Long placeOrder(CreateOrderRequest request) {
        Order order = new Order();
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new NotFoundException("Not Found User With Username:" + request.getUsername()));
        order.setFirstname(request.getFirstname());
        order.setLastname(request.getLastname());
//        order.setCountry(request.getCountry());
        order.setAddress(request.getAddress());
        order.setTown(request.getTown());
        order.setState(request.getState());
        order.setPostCode(request.getPostCode());
        order.setEmail(request.getEmail());
        order.setPhone(request.getPhone());
        order.setNote(request.getNote());
        order.setPaymentStatus(request.getPaymentStatus());
        order.setCreateAt(new Timestamp(System.currentTimeMillis()));
        if (order.getPaymentStatus().equals("Thanh toán Online")){
            order.setStatus(0);
        } else {
            order.setStatus(1);
        }
        orderRepository.save(order);

        long totalPrice = 0;
        for (CreateOrderDetailRequest rq : request.getOrderDetails()) {
            Product product = productRepository.findByName(rq.getName());
            if(product.getQuantity() < rq.getQuantity()) {
                throw new BadRequestException("Hàng trong kho không đủ cho đơn của bạn");
            }
            if(product.getQuantity() == 0){
                throw new BadRequestException("Hết hàng !");
            }
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setName(rq.getName());
            orderDetail.setPrice(rq.getPrice());
            orderDetail.setQuantity(rq.getQuantity());
            orderDetail.setSubTotal(rq.getPrice() * rq.getQuantity());
            orderDetail.setOrder(order);
            totalPrice += orderDetail.getSubTotal();
            orderDetailRepository.save(orderDetail);
        }
        order.setTotalPrice(totalPrice);
        order.setUser(user);
        order = orderRepository.save(order);
        return order.getId();
    }

    @Override
    public List<Order> getList() {
        return orderRepository.findAll(Sort.by("id").descending());
    }


    @Override
    public List<Order> getOrderByUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NotFoundException("Not Found User With Username:" + username));

        List<Order> orders = orderRepository.getOrderByUser(user.getId());
        return orders;
    }

    @Override
    public Boolean changeStatus(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found Order"));
        if (order.getStatus() <= 3) {
            order.setStatus(order.getStatus() + 1);
            if (order.getStatus() == 2) {
                List<OrderDetail> orderDetail = orderDetailService.getOrderDetailsByOrderId(order.getId());
                for (OrderDetail o : orderDetail) {
                    Product product = productRepository.findByName(o.getName());
                    product.setQuantity(product.getQuantity() - o.getQuantity());
                    productRepository.save(product);
                }
            }
            orderRepository.save(order);
            return true;
        }
        return false;
    }

    @Override
    public Boolean destroyOrder(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found Order"));
        if (order.getStatus() == 0) {
            order.setStatus(1);
            orderRepository.save(order);
        } else {
            order.setStatus(0);
            orderRepository.save(order);
        }
        return true;
    }


    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }


    // 1 : xac nhan don
    // 2: dang chuan bi hang
    // 3: dang van chuyen
    // 4: Giao hàng thành công

}
