import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { getChartData } from '../utils/getChartData';
import { EtfContentTypography, EtfTitleTypography } from '../styles/typography';
import { ToEtfDetailButton } from '../styles/button';

const ETFList = ({ searchTerm, priceRange }) => {
    const [etfs, setEtfs] = useState([]); // ETF 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 오류 상태
    const [chartData, setChartData] = useState({}); // 차트 데이터 상태
    priceRange[0] = 0;
    priceRange[1] = 1000000;

    useEffect(() => {
        const fetchEtfs = async () => {
            try {
                setLoading(true);
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/etf');
                if (!response.ok) {
                    console.log(await response.json());
                    throw new Error('네트워크 응답이 정상적이지 않습니다.');
                }
                const data = await response.json();
                setEtfs(data); // 데이터 저장

                // 각 ETF에 대한 차트 데이터 요청
                const chartDataPromises = data.map(async (etf) => {
                    const prices = await getChartData(etf.etfCode);
                    return { code: etf.etfCode, data: prices };
                });

                // 모든 차트 데이터 가져오기
                const chartDataArray = await Promise.all(chartDataPromises);
                const chartDataObject = chartDataArray.reduce((acc, item) => {
                    acc[item.code] = item.data;
                    return acc;
                }, {});
                setChartData(chartDataObject); // 차트 데이터 저장
            } catch (error) {
                setError(error.message); // 오류 메시지 저장
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchEtfs();
    }, []);

    const filteredEtfs = etfs.filter((etf) => {
        const matchesSearchTerm = etf.etfName.toLowerCase().includes(searchTerm.toLowerCase());
        const withinPriceRange = etf.etfPrice >= priceRange[0] && etf.etfPrice <= priceRange[1];
        return matchesSearchTerm && withinPriceRange;
    });

    if (loading) return <div>로딩 중...</div>; // 로딩 중일 때 표시
    if (error) return <div>오류: {error}</div>; // 오류 발생 시 표시

    return (
        <div style={{ padding: '16px' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {filteredEtfs.map((etf) => (
                    <li
                        key={etf.etfCode}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f0f0f0',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            padding: '16px',
                            marginBottom: '10px',
                            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                            width: '80%',
                            margin: '20px auto',
                        }}
                    >
                        <LineChart
                            series={[
                                {
                                    data: chartData[etf.etfCode],
                                    color: 'black',
                                },
                            ]}
                            width={500}
                            height={300}
                            leftAxis={null}
                            bottomAxis={null}
                            axisHighlight={{
                                x: 'none',
                                y: 'none',
                            }}
                        />
                        <div style={{ margin: '0 200px 0 0' }}>
                            <EtfTitleTypography>{etf.etfName}</EtfTitleTypography>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <EtfContentTypography>종가 {etf.etfPrice} </EtfContentTypography>
                                    <EtfContentTypography>운용사 {etf.fundManager}</EtfContentTypography>
                                </div>
                                <div>
                                    <ToEtfDetailButton variant="contained">추가하기</ToEtfDetailButton>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ETFList;
