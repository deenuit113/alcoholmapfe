import { useState, useEffect } from 'react'
import MypageUI from './Mypage.presenter'
import axios from 'axios';
import { useRouter } from 'next/router'

/*  수정 버튼 누를 시에 수정페이지로 이동
    수정 내용 비밀번호?
    찜 - 최근 5개 ~ 누르면 찜목록 페이지로 이동
    내가 평가한 가게 - 최근 5개 ~ 누르면 평가한 가게 리스트로 이동
    이메일 받아오기
*/

const baseUrl = "http://localhost:8080";


export default function MyPagePage(){
    const router = useRouter()

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        capaSoju: 0,
    });

    useEffect(() => {
        checkIsLoggedIn();
    }, []);


    const checkIsLoggedIn = async () => { //로그인 확인 함수
        // 로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem("your_token_key_here");

        // 토큰이 없으면 처리
        if (!token) {
            console.error("Token not found in local storage");
            setLoggedIn(false);
            alert("로그인 후 이용해주세요")
            router.push('../login');
            return;
        }

        // API 요청 헤더에 토큰 추가
        /*const headers = {
            Authorization: `Bearer ${token}`,
            Content-Type: 'application/json',
            // 다른 헤더도 필요한 경우 추가
        };*/
        setLoggedIn(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(baseUrl + '/users/profile/' + formData.email, formData);
            console.log('Response from server:', response.data);
        } catch (error){
            console.error('error submitting data:', error);
        }
    };


    return (
        <MypageUI
            handleInputChange = {handleInputChange}
            handleFormSubmit = {handleFormSubmit}
            formData = {formData}
        />
        
    )
}