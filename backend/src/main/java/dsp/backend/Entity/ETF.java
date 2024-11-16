package dsp.backend.Entity;

import jakarta.persistence.*;

import java.util.Set;

import dsp.backend.utils.CountryEnum;

@Entity
@Table(name = "etfs", indexes = @Index(columnList = "symbol"))
public class ETF {

    @Id
    @Column(nullable = false, unique = true)
    private String symbol;

    @Column(nullable = false, unique = true)
    private String longName;

    @Column(nullable = false)
    private Double currentPrice;

    @Column(nullable = false)
    private Long sharesOutstanding;

    @Column(nullable = false)
    private Double week52High;

    @Column(nullable = false)
    private Double week52Low;

    @Column(nullable = false)
    private String benchmark;

    @Column(nullable = false)
    private String ipoDate;

    @Column(nullable = false)
    private String expenseRatio;

    @Column(nullable = false)
    private String fundManager;

    @Column(nullable = false)
    private Double navPrice;

    @Column(nullable = false)
    private Double monthChange;

    @Column(nullable = false)
    private Double quarterChange;

    @Column(nullable = false)
    private Double yearChange;

    @Column(nullable = false)
    private CountryEnum country;

    @OneToMany(mappedBy = "etf")
    private Set<Portfolio> portfolios;

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getLongName() {
        return longName;
    }

    public void setLongName(String longName) {
        this.longName = longName;
    }

    public Double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(Double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public Long getSharesOutstanding() {
        return sharesOutstanding;
    }

    public void setSharesOutstanding(Long sharesOutstanding) {
        this.sharesOutstanding = sharesOutstanding;
    }

    public Double getWeek52High() {
        return week52High;
    }

    public void setWeek52High(Double week52High) {
        this.week52High = week52High;
    }

    public Double getWeek52Low() {
        return week52Low;
    }

    public void setWeek52Low(Double week52Low) {
        this.week52Low = week52Low;
    }

    public String getBenchmark() {
        return benchmark;
    }

    public void setBenchmark(String benchmark) {
        this.benchmark = benchmark;
    }

    public String getIpoDate() {
        return ipoDate;
    }

    public void setIpoDate(String ipoDate) {
        this.ipoDate = ipoDate;
    }

    public String getExpenseRatio() {
        return expenseRatio;
    }

    public void setExpenseRatio(String expenseRatio) {
        this.expenseRatio = expenseRatio;
    }

    public String getFundManager() {
        return fundManager;
    }

    public void setFundManager(String fundManager) {
        this.fundManager = fundManager;
    }

    public Double getNavPrice() {
        return navPrice;
    }

    public void setNavPrice(Double navPrice) {
        this.navPrice = navPrice;
    }

    public Double getMonthChange() {
        return monthChange;
    }

    public void setMonthChange(Double monthChange) {
        this.monthChange = monthChange;
    }

    public Double getQuarterChange() {
        return quarterChange;
    }

    public void setQuarterChange(Double quarterChange) {
        this.quarterChange = quarterChange;
    }

    public Double getYearChange() {
        return yearChange;
    }

    public void setYearChange(Double yearChange) {
        this.yearChange = yearChange;
    }

    public Set<Portfolio> getPortfolios() {
        return portfolios;
    }

    public void setPortfolios(Set<Portfolio> portfolios) {
        this.portfolios = portfolios;
    }

    public void setCountry(CountryEnum country) {
        this.country = country;
    }

    public CountryEnum getCountry() {
        return country;
    }
}