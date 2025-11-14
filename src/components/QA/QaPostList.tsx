import React, { useState } from "react";
import axios from "axios";
import { QaPost, QaComment } from "@utils/qaTypes"; // QaPost, QaComment 타입을 가정
import send from "../../assets/images/send.png";
import QuestionRegisterModal from "./QuestionRegisterModal";
import * as S from "@pages/QA/QuizQaRoomPage.styles"; // 스타일은 그대로 사용

// API 설정 (QuestionRegisterModal.tsx와 동일하게 사용)
const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("qroom_access_token") || "FALLBACK_TOKEN";

interface QaPostListProps {
  questionId: number;
  questionTitle: string;
  qaPosts: QaPost[];
  boardId: number;
  onPostRegistered: () => void;
  // 댓글 및 게시글 등록 후 데이터를 리로드하기 위한 콜백 함수
  onCommentRegistered: () => void;
}

// QaPostCard 컴포넌트
const PostCard: React.FC<{ post: QaPost; onCommentRegistered: () => void }> = ({
  post,
  onCommentRegistered,
}) => {
  // 1. 댓글 내용 상태 관리
  const [commentContent, setCommentContent] = useState("");
  // 2. 댓글 익명 여부 상태 관리 (기본값 true로 설정)
  const [isCommentAnonymous, setIsCommentAnonymous] = useState(true);

  // 3. 댓글 등록 API 호출 로직
  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) {
      // 💡 사용자에게 알릴 때 alert 대신 다른 UI를 사용하는 것이 권장됩니다.
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    // API 엔드포인트는 /qa/comment로 가정합니다.
    const url = `${baseURL}qa/comment`;

    // 백엔드로 보낼 데이터 객체 (댓글 등록 시 필요한 postId, content, isAnonymous)
    const commentData = {
      post_id: post.id, // 현재 게시글의 ID
      content: commentContent,
      isAnonymous: isCommentAnonymous,
    };

    console.log("새 댓글 API 요청:", commentData);

    try {
      await axios.post(url, commentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 💡 사용자에게 알릴 때 alert 대신 다른 UI를 사용하는 것이 권장됩니다.
      alert("댓글이 성공적으로 등록되었습니다.");
      setCommentContent(""); // 입력창 초기화
      onCommentRegistered(); // 부모 컴포넌트에 리로드 요청
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
      // 💡 사용자에게 알릴 때 alert 대신 다른 UI를 사용하는 것이 권장됩니다.
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <S.QaPostCard>
      <S.PostHeader>
        <span>{post.user.nickname}</span>
        {post.title}
      </S.PostHeader>

      <S.PostContent>{post.content}</S.PostContent>

      <S.CommentSection>
        {/* 댓글 목록 */}
        {post.comments.map((comment) => (
          <S.CommentBox key={comment.id}>
            <strong>{comment.user.nickname}</strong>
            {/* 실제 댓글 내용을 표시 */}
            <span>{comment.content}</span>
          </S.CommentBox>
        ))}

        {/* 댓글 입력창 */}
        <S.CommentInputBox>
          <S.CheckboxWrapper>
            <input
              type="checkbox"
              id={`comment-anonymous-${post.id}`} // 고유 ID 사용
              checked={isCommentAnonymous}
              onChange={(e) => setIsCommentAnonymous(e.target.checked)}
            />
            <label htmlFor={`comment-anonymous-${post.id}`}>익명</label>
          </S.CheckboxWrapper>

          <S.InputWrapper>
            <input
              type="text"
              placeholder="답글을 입력하세요."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              // 엔터 키로 댓글 등록 가능하도록 추가
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommentSubmit();
                }
              }}
            />
            <S.SendButton onClick={handleCommentSubmit}>
              <img src={send} alt="send" />
            </S.SendButton>
          </S.InputWrapper>
        </S.CommentInputBox>
      </S.CommentSection>
    </S.QaPostCard>
  );
};

// 우측 QA 게시판 목록 메인 컴포넌트
const QaPostList: React.FC<QaPostListProps> = ({
  questionId,
  questionTitle,
  qaPosts,
  boardId,
  onPostRegistered,
  onCommentRegistered, // props로 받음
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  return (
    <S.QaListWrapper>
      <S.QaHeader>
        <h2>Q&A</h2>
        <S.RegisterButton onClick={handleRegisterClick}>
          + 새 질문
        </S.RegisterButton>
      </S.QaHeader>

      {/* 게시글 목록 */}
      {qaPosts.length === 0 ? (
        <p
          style={{
            marginTop: "30px",
            textAlign: "center",
            color: "#6B7280",
            fontSize: "16px",
          }}
        >
          아직 질문이 없습니다. 첫 번째 질문을 등록해 보세요!
        </p>
      ) : (
        qaPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            // 댓글 등록 후 목록을 리로드하기 위한 콜백 함수를 전달
            onCommentRegistered={onCommentRegistered}
          />
        ))
      )}

      {/* 질문 등록 모달 렌더링 */}
      {isModalOpen && (
        <QuestionRegisterModal
          boardId={boardId}
          // 모달에 문제 제목을 전달 (질문 게시글의 제목으로 사용됨)
          questionTitle={`Q${questionId}. ${questionTitle}`}
          onClose={() => setIsModalOpen(false)}
          // 질문 등록 성공 시 게시글 목록을 리로드하기 위한 콜백 함수를 전달
          onPostSuccess={onPostRegistered}
        />
      )}
    </S.QaListWrapper>
  );
};

export default QaPostList;
