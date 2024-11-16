const PRICE_URL = `${process.env.REACT_APP_BACKEND_URL}/etf/price/`;

const getETFPrice = async (etfCode) => {
    try {
        console.log(PRICE_URL + etfCode);
        const response = await fetch(PRICE_URL + etfCode);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('getETFPrice error:', error); // 에러 로그 출력
        throw error;
    }
};

export default getETFPrice;
