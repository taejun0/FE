// 서버 응답을 그대로 흉내낸 구조 (네가 올린 JSON을 축약해서 필수만 넣음)
export const quizDetailMock = {
  isSuccess: true,
  data: {
    quiz: {
      id: 19,
      title: "2. 도메인 분석 설계.pdf",
      total_questions: 5,
      group_name: "네트워크 기초",
    },
    questions: [
      {
        id: 6,
        type: "OX",
        question_text:
          "멋쟁이사자처럼 4호선톤에서 제일 중요한 것은 팀워크이다?",
        correct_answer: "O",
        explanation: "회원과 주문은 일대다 관계다.",
        options: [
          { id: 1, option_text: "O" },
          { id: 2, option_text: "X" },
        ],
      },
      {
        id: 7,
        type: "객관식",
        question_text:
          "멋쟁이사자처럼 4호선톤에서 제일 중요한 것은 팀워크이다?",
        correct_answer: "2",
        explanation:
          "주문과 상품은 다대다 관계이며, 이를 주문상품 엔티티로 풀었다.",
        options: [
          { id: 3, option_text: "A.객관식 문항 표시" },
          { id: 4, option_text: "B.객관식 문항 표시" },
          { id: 5, option_text: "C.객관식 문항 표시" },
          { id: 6, option_text: "D.객관식 문항 표시" },
        ],
      },
      {
        id: 8,
        type: "단답형",
        question_text:
          "멋쟁이사자처럼 4호선톤에서 제일 중요한 것은 팀워크이다?",
        correct_answer: "도서, 음반, 영화",
        explanation: "",
        options: [],
      },
      {
        id: 9,
        type: "객관식",
        question_text: "멋쟁이사자처럼 4호선톤에서 제일 중요한 것은_____이다??",
        correct_answer: "3",
        explanation: "",
        options: [
          { id: 7, option_text: "1. ㅇㅇㅇ" },
          { id: 8, option_text: "2. ㄱㄱㄱ" },
          { id: 9, option_text: "3. ㅎㅎㅎ" },
          { id: 10, option_text: "4. ㅗㅗㅗ" },
        ],
      },
      {
        id: 10,
        type: "OX",
        question_text: "주문과 배송의 관계는 일대일 관계이다. (O/X)",
        correct_answer: "O",
        explanation: "주문과 배송은 일대일 양방향 관계다.",
        options: [
          { id: 11, option_text: "O" },
          { id: 12, option_text: "X" },
        ],
      },
    ],
  },
};
