package com.codegym.Service.impl;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class JwtService {
    private static final String SECRET_KEY = "groupf4";
    private static final long EXPIRE_TIME = 604800000L;
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + EXPIRE_TIME);
    private static final Logger logger = LoggerFactory.getLogger(JwtService.class.getName());

    public String generateTokenLogin(String userName) {
        return Jwts.builder()
                .setSubject(userName)
                .setIssuedAt(this.now)
                .setExpiration(this.expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }
    public String generateTokenPost(String userName,String id) {
        final String SECRET_KEY1 = userName;
        System.out.println(SECRET_KEY1);
        return Jwts.builder()
                .setSubject(id)
//                .setIssuedAt(new Date())
//                .setExpiration(this.expiryDate)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY1)
                .compact();
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser().setSigningKey(this.SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature -> Message: {} ", e);
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token -> Message: {}", e);

        } catch (ExpiredJwtException e) {
            logger.error("Expired JWT token -> Message: {}", e);
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token -> Message: {}", e);
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty -> Message: {}", e);
        }
        return false;
    }

    public String getUserName(String token) {
        String userName = Jwts.parser().setSigningKey(this.SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
        return userName;
    }
    public Long getIdPost(String token,String username) {
        String id = Jwts.parser().setSigningKey(username).parseClaimsJws(token).getBody().getSubject();
        return Long.valueOf(id);
    }
}
