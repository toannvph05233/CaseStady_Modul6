package com.codegym.Model;

import org.springframework.security.core.GrantedAuthority;
import java.util.Collection;

public class UserJwt {
    private Long id;
    private String token;
    private String type = "Bearer";
    private String userName;
    private Collection<? extends GrantedAuthority> roles;
    private String avatar;

    public UserJwt(Long id, String token, String userName, Collection<? extends GrantedAuthority> roles,String avatar) {
        this.id = id;
        this.token = token;
        this.userName = userName;
        this.roles = roles;
        this.avatar = avatar;
    }

    public UserJwt() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Collection<? extends GrantedAuthority> getRoles() {
        return roles;
    }

    public void setRoles(Collection<? extends GrantedAuthority> roles) {
        this.roles = roles;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
