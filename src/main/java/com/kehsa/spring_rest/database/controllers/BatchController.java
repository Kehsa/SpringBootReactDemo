package com.kehsa.spring_rest.database.controllers;

import com.kehsa.spring_rest.database.entities.Good;
import com.kehsa.spring_rest.database.repositories.GoodsRepository;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

@BasePathAwareController
public class BatchController {
    private final GoodsRepository goodsRepository;

    public BatchController(GoodsRepository goodsRepository) {
        this.goodsRepository = goodsRepository;
    }

    @ResponseBody @Transactional
    @PatchMapping("batch/goods")
    public Iterable<Long> batchGoods(@RequestBody CollectionModel<Good> json) {
        var savedId = new ArrayList<Long>();
        goodsRepository.saveAll(json.getContent()).forEach(s -> savedId.add(s.getId()));
        return savedId;
    }
}
