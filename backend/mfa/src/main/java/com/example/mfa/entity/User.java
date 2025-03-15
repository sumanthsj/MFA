package com.example.mfa.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Document(collection = "users")
@Data
public class User implements UserDetails {

    @Id
    private String id;
    private String username;
    private String password;
    private boolean enabled = true; // Add enabled field

    // ... (Getters and setters using Lombok)

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null; // Implement if you have roles
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}