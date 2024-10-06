const CHART_URL = process.env.REACT_APP_BACKEND_URL + "/etf/chart?etfCode=";

export const getChartData = async (etfCode) => {
  try {
    const response = await fetch(CHART_URL + etfCode);

    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태: ${response.status}`);
    }

    const data = await response.json();

    const etfPrices = await data.map((row) => {
      return row.etfPrice;
    });

    return etfPrices;
  } catch (error) {
    console.error("차트 요청 중 에러 발생:", error);
    throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있게 함
  }
};
