package com.codegym.Model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "category", schema = "project")
public class CategoryEntity {
    private long id;
    @Column(name = "name",unique = true)
    private String name;

    private List<PostEntity> postEntityList;

    private CategoryEntity categoryByParentId;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @ManyToMany(fetch = FetchType.LAZY,mappedBy = "categoryEntityList",cascade = {CascadeType.MERGE, CascadeType.REMOVE})
    public List<PostEntity> getPostEntityList() {
        return postEntityList;
    }

    public void setPostEntityList(List<PostEntity> postEntityList) {
        this.postEntityList = postEntityList;
    }

    @ManyToOne
    @JoinColumn(name = "parentId", referencedColumnName = "id")
    public CategoryEntity getCategoryByParentId() {
        return categoryByParentId;
    }

    public void setCategoryByParentId(CategoryEntity categoryByParentId) {
        this.categoryByParentId = categoryByParentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
