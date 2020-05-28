package com.codegym.Repository;

import com.codegym.Model.CommentEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ICommentRepo extends PagingAndSortingRepository<CommentEntity, Long> {
}
