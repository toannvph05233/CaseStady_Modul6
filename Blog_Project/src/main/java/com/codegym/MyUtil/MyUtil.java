package com.codegym.MyUtil;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class MyUtil {
    private MyUtil() {
    }

    public static BCryptPasswordEncoder passwordEncoder() {
        return getPasswordEncoder.passwordEncoder;
    }
    private static class getPasswordEncoder {
        private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    }
}
