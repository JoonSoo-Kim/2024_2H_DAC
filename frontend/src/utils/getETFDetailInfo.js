const DETAIL_INFO_URL = `${process.env.REACT_APP_BACKEND_URL}/etf/`;

const getETFDetailInfo = async (etfCode) => {
    try {
        const response = await fetch(DETAIL_INFO_URL + etfCode);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export default getETFDetailInfo;
