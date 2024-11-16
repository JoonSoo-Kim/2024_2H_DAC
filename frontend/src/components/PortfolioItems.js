import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PortfolioItems = ({ products, backgroundColors }) => {
    const navigate = useNavigate();
    const [hoveredRow, setHoveredRow] = useState(null); // 상태 추가

    const handleRowClick = (productCode) => {
        navigate(`/etf/detail?etfCode=${productCode}`);
    };

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ textAlign: 'center' }}>색상</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>상품 이름</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>수량</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>금액</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>비율</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product, index) => (
                        <TableRow
                            key={product.code}
                            onClick={() => handleRowClick(product.code)}
                            onMouseEnter={() => setHoveredRow(product.code)} // 마우스 오버 시 상태 설정
                            onMouseLeave={() => setHoveredRow(null)} // 마우스 리브 시 상태 초기화
                            style={{
                                backgroundColor: hoveredRow === product.code ? '#f0f0f0' : 'transparent',
                            }} // 배경색 변경
                        >
                            <TableCell style={{ textAlign: 'center' }}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: backgroundColors[index] || '#ccc',
                                        border: '1px solid #000',
                                    }}
                                />
                            </TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{product.name}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{product.quantity}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{product.amount} 원</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{product.percentage} %</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PortfolioItems;
