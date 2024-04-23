package com.example.ogani.repository;

import com.example.ogani.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {
    List<OrderDetail> findByOrder_Id(Long id);

    void deleteAllByOrderId(Long order);
}
