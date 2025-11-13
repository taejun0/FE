// src/pages/QuizQaRoomPage.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  QuizQuestion,
  QaRoomResponse,
  MOCK_QUESTIONS,
  QaPost,
} from "@utils/qaTypes";
import QuizItem from "@components/QA/QuizItem";
import { PageContainer } from "./QuizQaRoomPage.styles";

// .env 파일의 VITE_BASE_URL 환경 변수를 사용하여 API 기본 주소 설정
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export default function QuizQaRoomPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  // --- API 호출 및 데이터 매핑 로직 ---
  const fetchQaRoomData = useCallback(async () => {
    setLoading(true);
    let quizQuestions: QuizQuestion[] = MOCK_QUESTIONS;

    try {
      const id = Number(quizId);
      if (isNaN(id)) throw new Error("Invalid Quiz ID");

      // 💡 수정됨: API_BASE_URL 뒤에 슬래시(/) 없이 바로 엔드포인트 연결
      const url = `${API_BASE_URL}quiz/${id}/qa-room`;
      console.log("실제 API 호출 주소:", url);

      const apiResponse = await axios.get<QaRoomResponse>(url);

      const allQaPosts: QaPost[] = apiResponse.data.data.qa_board.posts;

      // 임시 방편: 모든 QA 게시글을 첫 번째 문제(index 0)에만 연결합니다.
      const questionsWithQa = quizQuestions.map((q, index) => {
        if (index === 0) {
          return { ...q, qa_board: allQaPosts };
        }
        return { ...q, qa_board: [] };
      });

      setQuestions(questionsWithQa);
    } catch (error) {
      console.warn(
        "API 호출 또는 데이터 매핑 실패. Mock 데이터만 사용합니다:",
        error
      );
      // API 호출 실패 시 QA 게시판은 비우고 Mock 데이터만 사용
      setQuestions(MOCK_QUESTIONS.map((q) => ({ ...q, qa_board: [] })));
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchQaRoomData();
  }, [fetchQaRoomData]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", fontSize: "18px" }}>
        시험지 및 QA 게시판을 불러오는 중...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px", fontSize: "18px" }}>
        문제 데이터를 불러올 수 없습니다.
      </div>
    );
  }

  // --- 렌더링: 전체 문제 목록 스크롤 ---
  return (
    <PageContainer>
      {/* 모든 퀴즈 문제와 해당 QA 게시판을 세로로 나열 */}
      {questions.map((question, index) => (
        <QuizItem
          key={question.question_id}
          question={question}
          index={index}
        />
      ))}
    </PageContainer>
  );
}
