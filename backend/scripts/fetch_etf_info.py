
import yfinance as yf
import sys
import json

def get_etf_info(symbol):
    etf = yf.Ticker(symbol)
    info = etf.info
    etf_info = {
        "symbol": info.get("symbol", ""),
        "longName": info.get("longName", ""),
        "currentPrice": info.get("regularMarketPrice", 0.0),
        "sharesOutstanding": info.get("sharesOutstanding", 0),
        "week52High": info.get("fiftyTwoWeekHigh", 0.0),
        "week52Low": info.get("fiftyTwoWeekLow", 0.0),
        "benchmark": info.get("benchmark", "N/A"),
        "ipoDate": info.get("ipoDate", "N/A"),
        "expenseRatio": info.get("annualReportExpenseRatio", 0.0),
        "fundManager": info.get("fundManager", "N/A"),
        "navPrice": info.get("navPrice", 0.0),
        "monthChange": info.get("monthChange", 0.0),
        "quarterChange": info.get("quarterChange", 0.0),
        "yearChange": info.get("yearChange", 0.0)
    }
    return etf_info

if __name__ == "__main__":
    symbol = sys.argv[1]
    etf_info = get_etf_info(symbol)
    print(json.dumps(etf_info))