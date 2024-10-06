import { getCookie } from './getCookie';

export const generateColorFromUserId = (index) => {
    const userId = getCookie();
    const hash = Array.from(userId).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = (hash + index * 30) % 360; // 해시와 인덱스 기반으로 색상 생성
    return `hsl(${hue}, 100%, 50%)`; // HSL 색상 생성
};
