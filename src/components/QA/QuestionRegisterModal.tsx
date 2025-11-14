// src/components/QA/QuestionRegisterModal.tsx

import React, { useState } from "react";
import axios from "axios";
import * as S from "@pages/QA/QuizQaRoomPage.styles";
import send from "../../assets/images/send.png";

interface QuestionRegisterModalProps {
  boardId: number;
  questionTitle: string;
  onClose: () => void;
  onPostSuccess: () => void;
}

const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("qroom_access_token") || "FALLBACK_TOKEN";

export default function QuestionRegisterModal({
  boardId,
  questionTitle,
  onClose,
  onPostSuccess,
}: QuestionRegisterModalProps) {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true); // 💡 이미지에서 익명이 기본 체크되어 있음

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("질문 내용을 입력해주세요.");
      return;
    }

    try {
      const url = `${baseURL}qa/post`;

      // 💡 백엔드로 보낼 데이터 객체
      const postData = {
        boardId: boardId,
        content: content,
        isAnonymous: isAnonymous,
      };

      console.log("새 질문 API 요청:", postData);

      await axios.post(url, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("질문이 성공적으로 등록되었습니다.");
      onPostSuccess(); // 성공 시 부모 컴포넌트의 리로드 함수 호출
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("질문 등록 중 오류 발생:", error);
      alert("질문 등록에 실패했습니다.");
    }
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.TextArea
          placeholder="질문 작성 시, 해당 문제 번호를 입력 후 적어주세요! 
          (e.g. Q2. 왜 이게 답인가요?)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <S.Footer>
          <S.CheckboxWrapper>
            <input
              type="checkbox"
              id="anonymous-check"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <label htmlFor="anonymous-check">익명</label>
          </S.CheckboxWrapper>

          <S.SendButton onClick={handleSubmit}>
            <img src={send} alt="send" />
          </S.SendButton>
        </S.Footer>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
