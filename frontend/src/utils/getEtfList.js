const ETF_LIST_URL = process.env.REACT_APP_BACKEND_URL + '/etf';

export const getEtfList = async () => {
    try {
        const response = await fetch(ETF_LIST_URL);
        if (!response.ok) {
            console.log(await response.json());
            throw new Error('네트워크 응답이 정상적이지 않습니다.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('ETF 데이터 요청 중 에러 발생:', error);
        throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있게 함
    }
};
