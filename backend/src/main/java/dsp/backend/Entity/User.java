package dsp.backend.Entity;

import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(nullable = false, unique = true)
    private String userId; // Make userId the primary key

    @OneToMany(mappedBy = "user")
    private Set<Portfolio> portfolios;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = true)
    private Long tendencyIndex;

    public String getUserId() {
        return userId;
    }

    public String getEmail(){
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getTendencyIndex() {
        return tendencyIndex;
    }

    public void setTendencyIndex(Long tendencyIndex) {
        this.tendencyIndex = tendencyIndex;
    }
}