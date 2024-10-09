import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { getChartData } from '../utils/getChartData';
import { EtfContentTypography, EtfTitleTypography } from '../styles/typography';
import { ToEtfDetailButton } from '../styles/button';
import { Button, Box } from '@mui/material';
import { getEtfList } from '../utils/getEtfList';

const ITEMS_PER_PAGE = 10; // 한 페이지에 보여줄 아이템 수

const ETFList = ({ searchTerm, priceRange }) => {
    const [etfs, setEtfs] = useState([]); // ETF 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 오류 상태
    const [chartData, setChartData] = useState({}); // 차트 데이터 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

    useEffect(() => {
        const fetchEtfs = async () => {
            try {
                setLoading(true);
                setEtfs(await getEtfList()); // 데이터 저장

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

    // 조건에 맞는 ETF만 필터링
    const filteredEtfs = etfs.filter((etf) => {
        const matchesSearchTerm = etf.etfName.toLowerCase().includes(searchTerm.toLowerCase());
        console.log(searchTerm, matchesSearchTerm);
        const withinPriceRange = etf.etfPrice >= priceRange[0] && etf.etfPrice <= priceRange[1];
        return matchesSearchTerm && withinPriceRange;
    });

    // 페이지네이션
    const totalPages = Math.ceil(filteredEtfs.length / ITEMS_PER_PAGE); // 총 페이지 수 계산
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; // 현재 페이지의 시작 인덱스
    const currentEtfs = filteredEtfs.slice(startIndex, startIndex + ITEMS_PER_PAGE); // 현재 페이지에 해당하는 ETF 목록

    if (loading) return <div>로딩 중...</div>; // 로딩 중일 때 표시
    if (error) return <div>오류: {error}</div>; // 오류 발생 시 표시

    return (
        <div style={{ padding: '16px' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {currentEtfs.map((etf) => (
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
            <Box display="flex" justifyContent="center" mt={2}>
                <Button
                    variant="contained"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    이전
                </Button>
                <Box mx={1}>
                    {currentPage} / {totalPages}
                </Box>
                <Button
                    variant="contained"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    다음
                </Button>
            </Box>
        </div>
    );
};

export default ETFList;
