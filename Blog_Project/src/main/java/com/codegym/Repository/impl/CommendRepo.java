package com.codegym.Repository.impl;

import com.codegym.Model.CommentEntity;
import com.codegym.Model.PostEntity;
import com.codegym.Repository.ICommentRepoHQL;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

public class CommendRepo implements ICommentRepoHQL {
    @PersistenceContext
    EntityManager em;

    @Transactional
    @Override
    public List<CommentEntity> findByPost(Long id) {
        TypedQuery<CommentEntity> query = em.createQuery("select c from CommentEntity c where c.postByPostId.id =: id",CommentEntity.class);
        query.setParameter("id", id);
        try {
            return query.getResultList();
        }catch(NoResultException n) {
            return null;}
    }
}
