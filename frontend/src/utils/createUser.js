const CREATE_USER_URL = process.env.REACT_APP_BACKEND_URL + "auth/signup";

export const createUser = async (id, password, email, birthYear, gender) => {
  const requestData = {
    userId: id,
    password: password,
    email: email,
    age: 2024 - birthYear,
    gender: gender,
  };

  try {
    const response = await fetch(CREATE_USER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    return await response; // 회원가입 결과를 반환
  } catch (error) {
    console.error("회원가입 중 에러 발생:", error);
    throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있게 함
  }
};
