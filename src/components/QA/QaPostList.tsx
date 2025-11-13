// src/components/QaPostList.tsx
import React from "react";
import { QaPost } from "@utils/qaTypes";
import {
  QaListWrapper,
  QaHeader,
  RegisterButton,
  QaPostCard,
  PostHeader,
  PostContent,
  CommentSection,
  CommentBox,
  CommentInputBox,
  InputWrapper,
  InputNickname,
} from "@pages/QA/QuizQaRoomPage.styles";

interface QaPostListProps {
  questionId: number;
  questionTitle: string;
  qaPosts: QaPost[];
}

// QaPostCard 컴포넌트
const PostCard: React.FC<{ post: QaPost; postIndex: number }> = ({
  post,
  postIndex,
}) => {
  return (
    <QaPostCard>
      <PostHeader>
        <span>{post.user.nickname}</span>
        {post.title}
      </PostHeader>

      <PostContent>{post.content}</PostContent>

      <CommentSection>
        {/* 댓글 목록 */}
        {post.comments.map((comment) => (
          <CommentBox key={comment.id}>
            <strong>{comment.user.nickname}</strong>
            <span>
              @{post.user.nickname} 질문 해설에도 나와 있듯이 이 번 평가
              요소는...
            </span>
          </CommentBox>
        ))}

        {/* 댓글 입력창 */}
        <CommentInputBox>
          <InputNickname>
            {/* 💡 여기에 사각형 체크 아이콘 이미지를 <img /> 태그로 넣어주세요. */}
            익명
          </InputNickname>
          <InputWrapper>
            <input type="text" placeholder="답글을 입력하세요." />
            <button onClick={() => alert("댓글 등록 API 호출: /qa/comment")}>
              {/* 💡 여기에 보내기 버튼 이미지를 <img /> 태그로 넣어주세요. */}
            </button>
          </InputWrapper>
        </CommentInputBox>
      </CommentSection>
    </QaPostCard>
  );
};

// 우측 QA 게시판 목록 메인 컴포넌트
const QaPostList: React.FC<QaPostListProps> = ({
  questionId,
  questionTitle,
  qaPosts,
}) => {
  const handleRegister = () => {
    alert(
      `Q${questionId}. "${questionTitle}"에 대한 새 게시글 작성 팝업을 띄웁니다.`
    );
  };

  return (
    <QaListWrapper>
      <QaHeader>
        <h2>Q&A</h2>
        <RegisterButton onClick={handleRegister}>+ 새 질문</RegisterButton>
      </QaHeader>

      {/* 게시글 목록 */}
      {qaPosts.length === 0 ? (
        <p style={{ marginTop: "30px", textAlign: "center", color: "#6B7280" }}>
          아직 이 문제에 대한 질문이 없습니다. 첫 번째 질문을 등록해 보세요!
        </p>
      ) : (
        qaPosts.map((post) => (
          <PostCard key={post.id} post={post} postIndex={post.id} />
        ))
      )}
    </QaListWrapper>
  );
};

export default QaPostList;
