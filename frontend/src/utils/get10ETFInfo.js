const INFO_URL = `${process.env.REACT_APP_BACKEND_URL}/etf/simple`;

const get10ETFInfo = async (etfSymbols) => {
    try {
        const response = await fetch(INFO_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(etfSymbols),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching ETF details:', error);
        throw error;
    }
};

export default get10ETFInfo;
