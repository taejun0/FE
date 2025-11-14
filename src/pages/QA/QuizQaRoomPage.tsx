// src/pages/QuizQaRoomPage.tsx (최종 수정된 전체 코드)

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ggoom1Image from "../../assets/images/ggoom/ggoom1.png";
import logoQroomText from "../../assets/images/Logo.png";

import {
  QuizQuestion,
  QaRoomResponse,
  QaPost,
  QuizMeta,
  QaBoardMeta,
} from "@utils/qaTypes";

import QuizItem from "@components/QA/QuizItem";
import QaPostList from "@components/QA/QaPostList";

import * as S from "./QuizQaRoomPage.styles";

const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("qroom_access_token") || "FALLBACK_TOKEN";

// QuizQuestion의 question_id에 question.id를 매핑하는 헬퍼 함수
const mapQuestions = (apiQuestions?: QuizQuestion[]): QuizQuestion[] => {
  // apiQuestions가 존재하지 않거나 배열이 아닐 경우 빈 배열 반환하여 오류 방지
  if (!apiQuestions || !Array.isArray(apiQuestions)) {
    return [];
  }

  return apiQuestions.map((q) => ({
    ...q,
    // 기존 코드와의 호환성을 위해 question_id 필드를 id로 설정
    question_id: q.id,
    user_answer: q.user_answer ?? null,
    is_correct: q.is_correct ?? true,
  }));
};

export default function QuizQaRoomPage() {
  const { quizId } = useParams<{ quizId: string }>();

  const [loading, setLoading] = useState(true);
  const [quizMeta, setQuizMeta] = useState<QuizMeta | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [qaBoardMeta, setQaBoardMeta] = useState<QaBoardMeta | null>(null);

  /* ===========================
API 호출 (활성화)
=========================== */
  const fetchQaRoomData = useCallback(async () => {
    setLoading(true);

    try {
      const id = Number(quizId);
      if (isNaN(id)) throw new Error("Invalid Quiz ID");

      const url = `${baseURL}quiz/${id}/qa-room`;
      console.log("API 호출 시작:", url);

      // 실제 API 호출 로직 활성화
      const response = await axios.get<QaRoomResponse>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      console.log(data); // 응답 데이터 확인

      // 💡 수정: data.quiz.questions에서 문제 배열을 가져오도록 경로 변경
      const apiQuestions = data.quiz.questions;

      // 데이터 설정
      setQuizMeta(data.quiz);
      setQuestions(mapQuestions(apiQuestions)); // 수정된 변수 사용
      setQaBoardMeta(data.qa_board);
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      // 오류 발생 시 빈 배열 및 null로 설정
      setQuizMeta(null);
      setQuestions([]);
      setQaBoardMeta(null);
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    fetchQaRoomData();
  }, [fetchQaRoomData]);

  /** ===========================
로딩 / 에러 처리
=========================== */
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", fontSize: "18px" }}>
        시험지 및 QA 게시판을 불러오는 중...
      </div>
    );
  }

  if (questions.length === 0 || !quizMeta || !qaBoardMeta) {
    return (
      <div style={{ textAlign: "center", padding: "50px", fontSize: "18px" }}>
        문제 데이터를 불러올 수 없거나 데이터 구조가 유효하지 않습니다.
      </div>
    );
  }

  // QA 게시판에 고정적으로 표시할 문제 (첫 번째 문제)
  const fixedQaQuestion = questions[0];

  return (
    <>
      {/* 상단 고정 헤더 */}
      <S.Header>
        <S.Logo src={logoQroomText} alt="Qroom" />
        <S.MyPageButton>
          <S.MyPageIcon>
            <S.Img src={ggoom1Image} alt="mypage" />
          </S.MyPageIcon>
          <S.MyPageText>마이페이지</S.MyPageText>
        </S.MyPageButton>
      </S.Header>
      <S.TextBox>
        <h3>{quizMeta.group_name}</h3> {/* 그룹명 연동 */}
        <h2>{quizMeta.title}</h2> {/* 퀴즈 제목 연동 */}
      </S.TextBox>

      {/* 좌우 2컬럼 구성 */}
      <S.PageContainer>
        <S.AppGrid>
          {/* 왼쪽 문제 리스트 (스크롤) */}
          <S.LeftScroll>
            {questions.map((question, index) => (
              <QuizItem
                key={question.id} // API 응답의 id 사용
                question={question}
                index={index}
              />
            ))}
          </S.LeftScroll>

          {/* 오른쪽: 단일 QA 게시판 (첫 번째 문제에 고정) */}
          <S.RightBoard>
            <QaPostList
              questionId={fixedQaQuestion.id}
              questionTitle={fixedQaQuestion.question_text}
              qaPosts={qaBoardMeta.posts} // QA 게시판 글 연동
              boardId={qaBoardMeta.board_id}
              onPostRegistered={fetchQaRoomData}
              onCommentRegistered={fetchQaRoomData}
            />
          </S.RightBoard>
        </S.AppGrid>
      </S.PageContainer>
    </>
  );
}
