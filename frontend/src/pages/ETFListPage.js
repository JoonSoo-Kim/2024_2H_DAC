import React, { useState } from 'react';
import { AppBar, Toolbar, Grid } from '@mui/material';
import Logo from '../components/Logo';
import ETFSearch from '../components/ETFSearch';
import ETFList from '../components/ETFList';

const ETFListPage = () => {
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [priceRange, setPriceRange] = useState([0, 1000000]); // 가격 범위 상태

    const handleSearchTermChange = (term) => {
        setSearchTerm(term);
    };

    const handlePriceRangeChange = (range) => {
        setPriceRange(range);
    };

    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Logo />
                </Toolbar>
            </AppBar>
            <Grid container style={{ height: '100vh' }}>
                <Grid item xs={12}>
                    <ETFSearch
                        onSearchTermChange={handleSearchTermChange}
                        onPriceRangeChange={handlePriceRangeChange}
                    />
                </Grid>
                <Grid item xs={12} style={{ height: 'auto' }}>
                    <ETFList searchTerm={searchTerm} priceRange={priceRange} />
                </Grid>
            </Grid>
        </div>
    );
};

export default ETFListPage;
