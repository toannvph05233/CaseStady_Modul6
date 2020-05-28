package com.codegym.Repository;

import com.codegym.Model.CommentEntity;

import java.util.List;

public interface ICommentRepoHQL {
    List<CommentEntity> findByPost(Long id);
}
