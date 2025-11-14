import React, { useState } from "react";
import axios from "axios";
import { QaPost, QaComment } from "@utils/qaTypes";
import send from "../../assets/images/send.png";
import QuestionRegisterModal from "./QuestionRegisterModal";
import * as S from "@pages/QA/QuizQaRoomPage.styles";

const baseURL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("qroom_access_token") || "FALLBACK_TOKEN";

interface QaPostListProps {
  questionId: number;
  questionTitle: string;
  qaPosts: QaPost[];
  boardId: number;
  onPostRegistered: () => void;
  onCommentRegistered: () => void;
}

const PostCard: React.FC<{ post: QaPost; onCommentRegistered: () => void }> = ({
  post,
  onCommentRegistered,
}) => {
  const [commentContent, setCommentContent] = useState("");
  const [isCommentAnonymous, setIsCommentAnonymous] = useState(true);

  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    const url = `${baseURL}qa/comment`;

    const commentData = {
      post_id: post.id,
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

      alert("댓글이 성공적으로 등록되었습니다.");
      setCommentContent(""); // 입력창 초기화
      onCommentRegistered(); // 부모 컴포넌트에 리로드 요청
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
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
        {post.comments.map((comment) => (
          <S.CommentBox key={comment.id}>
            <strong>{comment.user.nickname}</strong>
            <span>{comment.content}</span>
          </S.CommentBox>
        ))}

        <S.CommentInputBox>
          <S.CheckboxWrapper>
            <input
              type="checkbox"
              id={`comment-anonymous-${post.id}`}
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

const QaPostList: React.FC<QaPostListProps> = ({
  questionId,
  questionTitle,
  qaPosts,
  boardId,
  onPostRegistered,
  onCommentRegistered,
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
            onCommentRegistered={onCommentRegistered}
          />
        ))
      )}

      {isModalOpen && (
        <QuestionRegisterModal
          boardId={boardId}
          questionTitle={`Q${questionId}. ${questionTitle}`}
          onClose={() => setIsModalOpen(false)}
          onPostSuccess={onPostRegistered}
        />
      )}
    </S.QaListWrapper>
  );
};

export default QaPostList;
