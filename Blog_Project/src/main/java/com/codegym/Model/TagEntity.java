package com.codegym.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tag", schema = "project")
public class TagEntity {
    private long id;
    private String tagname;

    private List<PostEntity> postEntityList;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "tagname",unique = true)
    public String getTagname() {
        return tagname;
    }

    public void setTagname(String tagname) {
        this.tagname = tagname;
    }
    @ManyToMany(fetch = FetchType.LAZY,mappedBy = "tagEntityList",cascade = {CascadeType.MERGE, CascadeType.REMOVE})
    @JsonIgnore
    public List<PostEntity> getPostEntityList() {
        return postEntityList;
    }

    public void setPostEntityList(List<PostEntity> postEntityList) {
        this.postEntityList = postEntityList;
    }
}
