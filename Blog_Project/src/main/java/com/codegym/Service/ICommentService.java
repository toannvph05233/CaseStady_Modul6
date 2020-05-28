package com.codegym.Service;

import com.codegym.Model.CommentEntity;

import java.util.List;

public interface ICommentService {
    List<CommentEntity> getCommentByPost(Long id);

    void save(CommentEntity commentEntity);
}
