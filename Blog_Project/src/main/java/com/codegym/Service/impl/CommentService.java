package com.codegym.Service.impl;

import com.codegym.Model.CommentEntity;
import com.codegym.Repository.ICommentRepo;
import com.codegym.Repository.ICommentRepoHQL;
import com.codegym.Service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CommentService implements ICommentService {
    @Autowired
    ICommentRepo commentRepo;
    @Autowired
    ICommentRepoHQL commentRepoHQL;
    @Override
    public List<CommentEntity> getCommentByPost(Long id) {
        return this.commentRepoHQL.findByPost(id);
    }

    @Override
    public void save(CommentEntity commentEntity) {
        this.commentRepo.save(commentEntity);
    }
}
