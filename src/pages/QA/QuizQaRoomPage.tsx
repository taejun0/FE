// src/pages/QuizQaRoomPage.tsx (최종 수정된 전체 코드)

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const mapQuestions = (apiQuestions?: QuizQuestion[]): QuizQuestion[] => {
  if (!apiQuestions || !Array.isArray(apiQuestions)) {
    return [];
  }

  return apiQuestions.map((q) => ({
    ...q,
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
  const navigate = useNavigate();

  //API 호출 (활성화)
  const fetchQaRoomData = useCallback(async () => {
    setLoading(true);

    try {
      const id = Number(quizId);
      if (isNaN(id)) throw new Error("Invalid Quiz ID");

      const url = `${baseURL}quiz/${id}/qa-room`;
      console.log("API 호출 시작:", url);

      const response = await axios.get<QaRoomResponse>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      const apiQuestions = data.quiz.questions;

      // 데이터 설정
      setQuizMeta(data.quiz);
      setQuestions(mapQuestions(apiQuestions));
      setQaBoardMeta(data.qa_board);
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
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

  //로딩 / 에러 처리
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
      <S.Header>
        <S.Logo
          src={logoQroomText}
          alt="Qroom"
          onClick={() => navigate(`/home`)}
        />
        <S.MyPageButton>
          <S.MyPageIcon>
            <S.Img src={ggoom1Image} alt="mypage" />
          </S.MyPageIcon>
          <S.MyPageText>마이페이지</S.MyPageText>
        </S.MyPageButton>
      </S.Header>
      <S.TextBox>
        <h3>{quizMeta.group_name}</h3>
        <h2>{quizMeta.title}</h2>
      </S.TextBox>

      <S.PageContainer>
        <S.AppGrid>
          <S.LeftScroll>
            {questions.map((question, index) => (
              <QuizItem key={question.id} question={question} index={index} />
            ))}
          </S.LeftScroll>

          <S.RightBoard>
            <QaPostList
              questionId={fixedQaQuestion.id}
              questionTitle={fixedQaQuestion.question_text}
              qaPosts={qaBoardMeta.posts}
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
