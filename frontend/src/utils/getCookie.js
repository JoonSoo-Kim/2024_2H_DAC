export const getCookie = () => {
    const value = `; ${document.cookie}`; // 쿠키 문자열 앞에 `; `를 추가하여 파싱
    const parts = value.split(`; ${'userId'}=`); // 'userId'로 쿠키를 분리
    if (parts.length === 2) return parts.pop().split(';').shift(); // 쿠키가 존재하면 값 반환
    return ''; // 쿠키가 없으면 빈 문자열 반환
};
