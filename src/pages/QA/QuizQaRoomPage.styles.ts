// src/pages/QuizQaRoomPage.styles.tsx
import styled from "styled-components";

// 공통 색상 및 스타일 정의 (생략 없음)
const c = {
  blue: "#6A96FF", // 메인 블루
  blueBg: "#F4F8FF", // QA 영역 배경 및 퀴즈 답변 박스 배경
  stroke: "#E6EEF6", // 경계선
  text: "#111827", // 진한 텍스트
  card: "#FFFFFF", // 일반 카드 배경
  sub: "#6B7280", // 서브 텍스트

  // QA 이미지 스타일에 맞춘 세부 색상
  qaCardBg: "#FFFFFF",
  commentBg: "#F4F7FC", // 댓글 박스 배경 (옅은 하늘색)
  commentText: "#374151", // QA 텍스트 색상
};

const shadowCard = "0 10px 30px rgba(56, 91, 194, 0.12)";
const shadowLight = "0 6px 18px rgba(17, 24, 39, 0.04)";

// =======================================================
// 1. 레이아웃 컴포넌트 (스크롤 방식)
// =======================================================

// 페이지 전체 컨테이너 (스크롤 가능)
export const PageContainer = styled.div`
  padding: 28px 40px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
`;

// 문제 + QA를 묶는 새로운 컨테이너 (좌우 분할 유지)
export const QuizQaPairContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 50px; /* 문제 쌍 사이에 간격 추가 */
  padding-bottom: 30px;
  border-bottom: 1px solid ${c.stroke}; /* 문제 쌍 구분선 */

  &:last-child {
    border-bottom: none;
  }
`;

// 좌측 퀴즈 문제 1개 영역
export const LeftColumn = styled.div`
  flex: 1;
  min-width: 500px;
`;

// 우측 QA 게시판 영역
export const RightColumn = styled.div`
  flex: 1;
  min-width: 400px;
  border-radius: 12px;
  background-color: ${c.blueBg};
  box-shadow: ${shadowCard};
  /* 스크롤 방식에서는 fixed/sticky 속성 제거 */
  position: relative;
  top: 0;
  height: auto;
  overflow-y: visible;
`;

// =======================================================
// 2. 퀴즈 아이템 컴포넌트 (QuizItem.tsx에서 사용)
// =======================================================

// QuizItemWrapperProps에서 isCurrent 속성은 더 이상 필요 없지만, 스타일 유지를 위해 $isCurrent 대신 isDone으로 가정
interface QuizItemWrapperProps {
  $isDone: boolean; // 모든 문제는 이미 '풀린' 상태로 간주
}

export const QuizItemWrapper = styled.div<QuizItemWrapperProps>`
  border: 1px solid ${c.stroke};
  padding: 80px 40px;
  margin-bottom: 20px;
  border-radius: 12px;
  background-color: ${c.card};
  box-shadow: ${shadowLight};
  transition: all 0.3s;
`;

// 정답/오답 표시가 제거된 단순화된 답변 정보 박스
export const AnswerBox = styled.p`
  margin: 10px 0;
  padding: 10px;
  background-color: ${c.blueBg};
  border-left: 3px solid ${c.blue};
  font-size: 14px;
  color: ${c.text};
`;

// =======================================================
// 3. QA 게시판 컴포넌트 (QaPostList.tsx에서 사용)
// =======================================================

export const QaListWrapper = styled.div`
  padding: 30px;
`;

export const QaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${c.stroke};
  padding-bottom: 15px;
  margin-bottom: 25px;

  h2 {
    font-size: 22px;
    color: ${c.text};
    margin: 0;
  }
`;

export const RegisterButton = styled.button`
  padding: 8px 15px;
  background-color: ${c.card};
  color: ${c.blue};
  border: 1px solid ${c.blue};
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${c.blueBg};
  }
`;

export const QaPostCard = styled.div`
  padding: 18px;
  margin-bottom: 20px;
  background-color: ${c.qaCardBg};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const PostHeader = styled.div`
  margin-bottom: 12px;
  font-size: 16px;
  color: ${c.text};
  font-weight: 600;

  span {
    color: ${c.blue};
    margin-right: 8px;
  }
`;

export const PostContent = styled.p`
  margin: 0;
  font-size: 15px;
  color: ${c.commentText};
`;

export const CommentSection = styled.div`
  margin-top: 20px;
`;

export const CommentBox = styled.div`
  background-color: ${c.commentBg};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 14px;
  color: ${c.commentText};
  line-height: 1.4;

  strong {
    color: ${c.blue};
    margin-right: 4px;
  }
`;

export const CommentInputBox = styled.div`
  padding: 15px;
  border-radius: 8px;
  background-color: ${c.qaCardBg};
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${c.stroke};
  border-radius: 25px;
  padding: 6px 15px;
  background-color: ${c.qaCardBg};

  input {
    flex-grow: 1;
    border: none;
    outline: none;
    padding: 8px 0;
    font-size: 14px;
    color: ${c.commentText};
  }

  button {
    background: none;
    border: none;
    color: ${c.blue};
    cursor: pointer;
    font-size: 18px;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
`;

export const InputNickname = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  color: ${c.commentText};
  margin-bottom: 8px;

  & > * {
    margin-right: 5px;
  }
`;
