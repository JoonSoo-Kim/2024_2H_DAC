import { getCookie } from "./getCookie";

const PORTFOLIO_URL = process.env.REACT_APP_BACKEND_URL + "/portfolio?userId=";

export const getPortfolioItem = async () => {
  const userId = getCookie();

  try {
    const response = await fetch(PORTFOLIO_URL + userId);
    const data = await response.json();

    return data.map((item) => ({
      name: item.etfName,
      code: item.etfCode,
      quantity: Number(item.count),
      amount: Number(item.money),
      percentage: Number(item.percent),
    }));
  } catch (error) {
    console.error("포트폴리오 데이터 요청 중 에러 발생:", error);
    throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있게 함
  }
};
