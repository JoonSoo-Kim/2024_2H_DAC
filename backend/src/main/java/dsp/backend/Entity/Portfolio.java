package dsp.backend.Entity;

import jakarta.persistence.*;

@Entity
@IdClass(PortfolioId.class)
@Table(name = "portfolios")
public class Portfolio {

    @Id
    @Column(name = "user_id")
    private String userId;

    @Id
    @Column(name = "symbol")
    private String symbol;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "symbol", insertable = false, updatable = false)
    private ETF etf;

    @Column(nullable = false)
    private Integer count;

    // Getters and setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ETF getEtf() {
        return etf;
    }

    public void setEtf(ETF etf) {
        this.etf = etf;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}