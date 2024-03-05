import React, { useState, useEffect } from 'react';
import ModalReviewUI from './ModalReview.presenter';

const ModalReview = () => {
    const [data, setData] = useState([]);
    const [isloading, setisLoading] = useState(false);

    useEffect(() => {
        console.log('첫 번째 useEffect 실행됨');
        fetchData();
    }, []);
    
    useEffect(() => {
        const handleScroll = () => {
            console.log('handleScroll 호출됨');
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;
    
            if (scrollTop + clientHeight >= scrollHeight - 20 && !isloading) {
                fetchData();
            }
        };
        const ReviewDataWrapper = document.getElementById('ReviewDataWrapper');
    
        console.log('두 번째 useEffect 실행됨');
    
        ReviewDataWrapper.addEventListener('scroll', handleScroll);
    
        return () => {
            console.log('두 번째 useEffect 정리됨');
            ReviewDataWrapper.removeEventListener('scroll', handleScroll);
        };
    }, [isloading]);

    // -------test--------

    const generateData = (start, end) => {
        const data = [];
        for (let i = start; i <= end; i++) {
            data.push({
                userId: `user${i}`,
                review: `Review ${i}`,
            });
        }
        return data;
    };
    
    // -------test--------

    const fetchData = async () => {
        setisLoading(true);
        // 비동기 데이터 로딩 로직
        console.log('Fetching data...');
        // 예시: 1초 후에 가상의 데이터 추가
        setTimeout(() => {
            //const newData = [...data, ...new Array(10).fill('New Data')];
            const newData = [...data, ...generateData(data.length + 1, data.length + 10)];
            setData(newData);
            setisLoading(false);
        }, 500);
    };
    
    
    return(
        <ModalReviewUI
            isloading = {isloading}
            data = {data}
        />
    );
};

export default ModalReview;