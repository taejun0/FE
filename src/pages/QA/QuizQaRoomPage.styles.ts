import styled from "styled-components";
import q from "../../assets/images/qe.png";

const c = {
  blue: "#6A96FF",
  blueBg: "#F4F8FF",
  stroke: "#E6EEF6",
  text: "#111827",
  card: "#FFFFFF",
  sub: "#6B7280",
  qaCardBg: "#FFFFFF",
  commentBg: "#F4F7FC",
  commentText: "#374151",
};

const shadowLight = "0 6px 18px rgba(17, 24, 39, 0.04)";

/* ============================================
 * 0) 페이지 상단 헤더
 * ============================================ */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 76px 24px;
`;

export const MyPageButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 100px;
  left: 56px;
  cursor: pointer;
`;

export const Img = styled.img`
  width: 50px;
`;

export const MyPageIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 126.5px;
  border: 5px solid var(--gradient3, #6a96ff);
  background: var(
    --gradient,
    linear-gradient(
      180deg,
      rgba(234, 234, 234, 0.1) 0%,
      rgba(155, 179, 255, 0.3) 43.27%,
      rgba(91, 157, 255, 0.2) 100%
    )
  );
  box-shadow: 0 1px 10px 10px #d9e8ff;
`;

export const MyPageText = styled.h2`
  color: #565555;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: 0.38px;
`;

export const Logo = styled.img`
  height: 100px;
  width: 229px;
  display: flex;
  position: sticky;
  top: 28px;
  left: 56px;
  cursor: pointer;
`;

export const TextBox = styled.div`
  padding: 10px 0 10px 100px;
  h3 {
    color: #539bff;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    padding-bottom: 20px;
  }

  h2 {
    color: #539bff;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    padding-bottom: 10px;
  }
`;

/* ============================================
 * 1) 메인 레이아웃: 좌(문제 스크롤) / 우(단일 QA)
 * ============================================ */

/** 페이지 전체 래퍼 */
export const PageContainer = styled.div`
  padding: 0 80px 0px;
`;

/** 좌우 2컬럼 그리드 */
export const AppGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

/** 왼쪽 문제 리스트 스크롤 영역 */
export const LeftScroll = styled.div`
  overflow-y: auto;
  height: 660px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 40px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/** 오른쪽 단일 QA 게시판 영역 */
export const RightBoard = styled.div`
  position: sticky;
  top: 120px;
  padding: 8px 0;
  width: 600px;
  height: 600px;
  margin: 0 auto;
  border-radius: 30px;
  border: 1px solid var(--gradient3, #6a96ff);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25) inset;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/* ============================================
 * 2) 퀴즈 아이템 카드 (왼쪽에서 QuizItem이 사용)
 * ============================================ */
export const QuizItemWrapper = styled.div`
  width: 700px;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  padding: 50px 20px 260px 20px;
  margin-bottom: 40px;
  transition: all 0.3s;
`;

/* ============================================
 * 3) QA 게시판 공통 스타일 (QaPostList.tsx에서 사용)
 * ============================================ */
export const QaListWrapper = styled.div`
  padding: 30px 0px 130px;
`;

export const QaHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
  margin-bottom: 25px;

  h2 {
    font-size: 30px;
    color: #539bff;
    margin: 0;
  }
`;

export const RegisterButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
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
  width: 80%;
  margin: 0 auto;
  padding: 18px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.5);
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

/* ============================================
 * 4) QuizItem 전용 타이틀/텍스트 스타일 (추가)
 * ============================================ */

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const QuestionTitle = styled.h3`
  margin: 0;
  font-size: 28px;
  line-height: 1.4;
  color: #565555;
`;

export const AnswerLabel = styled.strong`
  font-weight: 700;
`;

export const AnswerMeta = styled.span`
  color: #6b7280;
`;

export const Explanation = styled.div`
  margin-top: 15px;
  color: #666;
  font-size: 18px;
  padding-left: 10px;
  padding-top: 20px;
  line-height: 1.4;
`;

export const ExplanationLabel = styled.strong`
  font-weight: 700;
`;

/* ============================================
 * 5) OX 전용 스타일 (추가됨)
 * ============================================ */

/** OX 문제를 담는 Flex 컨테이너 */
export const OXAnswerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  padding: 20px 0;
`;

/** OX 정답/오답 표시 카드 (O/X) */
export const OXCard = styled.div<{ $isCorrectAnswer?: boolean }>`
  width: 45%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150px;
  font-weight: 700;
  border-radius: 12px;
  box-shadow: ${shadowLight};
  transition: all 0.2s ease-in-out;
  cursor: default;

  /* 정답 O: 파란색 테두리, 배경 */
  ${(props) =>
    props.$isCorrectAnswer &&
    `
    border: 3px solid ${c.blue}; 
    background-color: ${c.blueBg}; 
    color: ${c.blue};
  `}

  /* 정답 X: 옅은 회색 테두리, 배경 */
  ${(props) =>
    !props.$isCorrectAnswer &&
    `
    border: 3px solid ${c.stroke}; 
    background-color: ${c.card}; 
    color: ${c.sub};
  `}
`;

/* ============================================
 * 6) 객관식/단답형 정답 표시 스타일 (추가됨)
 * ============================================ */

/** 객관식 옵션 카드 스타일 */
export const OptionItem = styled.div<{ $isCorrect: boolean }>`
  padding: 15px 20px;
  margin-bottom: 10px;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.4;
  border: 1px solid rgba(0, 122, 255, 0.4);
  background-color: ${(props) => (props.$isCorrect ? "#D9E8FF" : "#fff")};
  color: ${(props) => (props.$isCorrect ? "#539BFF" : "#565555")};
  font-weight: 400;
  transition: all 0.2s;
`;

/** 단답형 정답 표시 박스 스타일 */
export const CorrectAnswerBox = styled.p`
  margin: 40px 0;
  padding: 26px;

  font-size: 16px;
  font-weight: 500;
  color: #539bff;

  border-radius: 12px;
  border: 1px solid rgba(0, 122, 255, 0.4);
  background: #d9e8ff;
`;

/* ============================================
 * 7) 질문 작성 모달 스타일 (추가)
 * ============================================ */

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #c9e1fc;
  padding: 30px;
  border-radius: 12px;
  width: 500px;
  height: 500px;
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
`;

export const ModalTitle = styled.h3`
  font-size: 24px;
  color: #539bff;
  margin-bottom: 20px;
`;

export const QuestionTitleDisplay = styled.p`
  color: ${c.sub};
  margin-bottom: 15px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  height: 400px;
  padding: 15px;
  border: 1px solid ${c.stroke};
  border-radius: 8px;
  font-size: 18px;
  line-height: 1.4;
  resize: vertical;
  margin-bottom: 20px;
  outline: none;
  background-color: #fff;
  background-image: url(${q});
  background-size: 100px auto;
  background-repeat: no-repeat;
  background-position: right 5px bottom 5px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  label {
    color: #6a96ff;
    font-size: 12px;
    font-weight: 500;
  }
`;

export const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
`;
