import Papa from 'papaparse';

export const getETFDetailCsv = (url) => {
    return new Promise((resolve, reject) => {
        Papa.parse(url, {
            header: true,
            download: true,
            complete: (results) => {
                const data = results.data.map((item) => ({
                    date: item['Date'],
                    price: parseFloat(item['Close']) || 0,
                }));
                resolve(data);
            },
            error: (error) => {
                reject(error);
            },
        });
    });
};
