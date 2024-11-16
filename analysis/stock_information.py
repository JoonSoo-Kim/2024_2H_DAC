import yfinance as yf
import pandas as pd
import os

# 개별 ETF의 정보를 DataFrame 형태로 반환하는 함수
def get_etf_info(ticker):
    etf = yf.Ticker(ticker)
    info = etf.info

    data = {
        "ticker": ticker,
        "longName": info.get("longName", "-"),
        "currentPrice": info.get("previousClose", "-"),
        "sharesOutstanding": info.get("totalAssets", "-"),
        "52WeekHigh": info.get("fiftyTwoWeekHigh", "-"),
        "52WeekLow": info.get("fiftyTwoWeekLow", "-"),
        "benchmark": info.get("benchmark", "-"),
        "ipoDate": info.get("ipoDate", "-"),
        "expenseRatio": info.get("annualReportExpenseRatio", "-"),
        "fundManager": info.get("fundFamily", "-"),
        "navPrice": info.get("navPrice", "-"),
        "monthChange": info.get("monthlyHoldingsTurnover", "-"),
        "quarterChange": info.get("threeMonthChangePercent", "-"),
        "yearChange": info.get("sixMonthChangePercent", "-")
    }

    # monthChange, quarterChange, yearChange는 yfinance에서 제공하지 않을 수 있음. 
    # 그래서 직접 계산
    try:
        history = etf.history(period="6mo")  # 최근 6개월의 price 데이터
        if not history.empty:
            # 현재 가격
            current_price = history["Close"][-1]
            
            # monthChange
            month_ago_price = history["Close"][-22] if len(history) >= 22 else None
            data["monthChange"] = ((current_price - month_ago_price) / month_ago_price * 100) if month_ago_price else "N/A"
            
            # quarterChange
            quarter_ago_price = history["Close"][-66] if len(history) >= 66 else None
            data["quarterChange"] = ((current_price - quarter_ago_price) / quarter_ago_price * 100) if quarter_ago_price else "N/A"
            
            # yearChange
            half_year_ago_price = history["Close"][0] if len(history) >= 126 else None
            data["yearChange"] = ((current_price - half_year_ago_price) / half_year_ago_price * 100) if half_year_ago_price else "N/A"
        else:
            data["monthChange"] = "-"
            data["quarterChange"] = "-"
            data["yearChange"] = "-"
    except Exception as e:
        print(f"오류가 발생함: {e}")
        data["monthChange"] = "-"
        data["quarterChange"] = "-"
        data["yearChange"] = "-"

    return pd.DataFrame([data])

# 폴더 안에 있는 모든 종목을 처리하여 하나의 CSV 파일에 저장하는 함수
def process_all_etfs(folder_path, output_file):
    all_data = pd.DataFrame()  # 모든 데이터를 저장할 DataFrame
    
    for filename in os.listdir(folder_path):
        # 파일 이름에서 확장자를 제외한 부분을 ticker로 사용함
        if filename.endswith(".csv"):
            ticker = filename.split(".")[0]
            print(f"Processing {ticker}...")
            etf_data = get_etf_info(ticker)
            all_data = pd.concat([all_data, etf_data], ignore_index=True)  # 데이터를 누적

    # 모든 데이터가 누적된 DataFrame을 하나의 CSV 파일로 저장
    all_data.to_csv(output_file, index=False, encoding='utf-8-sig')
    print(f"{output_file} 파일 생성 완료")

# 예시 사용법
folder_path = 'C:\\Users\\wnstj\\OneDrive\\바탕 화면\\데이터분석캡스톤디자인\\ETF_US_v4'  # ETF 종목 파일들이 저장된 폴더 경로
output_file = "all_etfs_info.csv"  # 저장할 통합 파일 이름
process_all_etfs(folder_path, output_file)
