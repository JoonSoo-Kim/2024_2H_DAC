package dsp.backend.Entity;

import java.io.Serializable;
import java.util.Objects;

public class PortfolioId implements Serializable {

    private String userId;
    private String symbol;

    public PortfolioId() {}

    public PortfolioId(String userId, String symbol) {
        this.userId = userId;
        this.symbol = symbol;
    }
    
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

    // hashCode and equals
    @Override
    public int hashCode() {
        return Objects.hash(userId, symbol);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        PortfolioId that = (PortfolioId) obj;
        return Objects.equals(userId, that.userId) &&
               Objects.equals(symbol, that.symbol);
    }
}
