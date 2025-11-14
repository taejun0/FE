import { apiFetch } from './apiClient';

export interface HomeGroup {
  id: number;
  name: string;
  exam_date: string;
  member_count: number;
  role?: string; // 'LEADER' | 'MEMBER' 등
}

export interface HomeQaBoard {
  id: number;
  title: string;
  progress: string;
}

export interface HomeExamSchedule {
  course_name: string;
  exam_date: string;
}

export interface HomeData {
  groups: HomeGroup[];
  qa_board: HomeQaBoard[];
  exam_schedule: HomeExamSchedule[];
}

export interface HomeApiResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: HomeData;
  timestamp: string;
}

export const getHomeData = async (): Promise<HomeData> => {
  try {
    const response = await apiFetch<HomeApiResponse>('/home', {
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.error('홈 데이터 조회 실패:', error);
    throw error;
  }
};

export interface CreateGroupPayload {
  name: string;
  examDate: string;
  imageNum: number;
}

export interface CreateGroupData {
  id: number;
  groupName: string;
  examDate: string;
  groupCode: string;
  imageNum: number;
}

export interface CreateGroupApiResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: CreateGroupData;
  timestamp: string;
}

export const createGroup = async (
  payload: CreateGroupPayload
): Promise<CreateGroupData> => {
  try {
    const response = await apiFetch<CreateGroupApiResponse>('/group/new', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return response.data;
  } catch (error) {
    console.error('그룹 생성 실패:', error);
    throw error;
  }
};

export interface JoinGroupPayload {
  groupCode: string;
}

export interface JoinGroupData {
  groupId: number;
}

export interface JoinGroupApiResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: JoinGroupData;
  timestamp: string;
}

export const joinGroup = async (
  payload: JoinGroupPayload
): Promise<JoinGroupData> => {
  try {
    const response = await apiFetch<JoinGroupApiResponse>('/group/join', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return response.data;
  } catch (error) {
    console.error('그룹 입장 실패:', error);
    throw error;
  }
};

export interface LeaveGroupApiResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: null;
  timestamp: string;
}

export const leaveGroup = async (groupId: number): Promise<void> => {
  try {
    await apiFetch<LeaveGroupApiResponse>(`/group/${groupId}/leave`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('그룹 퇴장 실패:', error);
    throw error;
  }
};

export interface GroupMember {
  id: number;
  nickname: string;
}

export interface GroupDetail {
  id: number;
  name: string;
  role: string;
  examDate: string;
  groupCode: string;
  memberCount: number;
  members: GroupMember[];
}

export interface GroupPdf {
  id: number;
  title: string;
}

export interface GroupQuiz {
  id: number;
  title: string;
  difficulty: string | null;
  participants_count: number;
}

export interface GroupQaBoard {
  board_id: number;
  quiz_id: number;
  title: string;
  progress: string;
}

export interface GroupRankingItem {
  position: number;
  nickname: string;
  total_correct: number;
}

export interface GroupRanking {
  my_rank: number;
  all_ranks: GroupRankingItem[];
}

export interface GroupDetailData {
  group: GroupDetail;
  pdfs: GroupPdf[];
  quizzes: GroupQuiz[];
  qa_boards: GroupQaBoard[];
  ranking: GroupRanking;
}

export interface GroupDetailApiResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: GroupDetailData;
  timestamp: string;
}

export const getGroupDetail = async (
  groupId: number
): Promise<GroupDetailData> => {
  try {
    const response = await apiFetch<GroupDetailApiResponse>(
      `/group/${groupId}/main`,
      {
        method: 'GET',
      }
    );
    return response.data;
  } catch (error) {
    console.error('그룹 디테일 조회 실패:', error);
    throw error;
  }
};

export interface DeleteGroupApiResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: null;
  timestamp: string;
}

export const deleteGroup = async (groupId: number): Promise<void> => {
  try {
    await apiFetch<DeleteGroupApiResponse>(`/group/${groupId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('그룹 삭제 실패:', error);
    throw error;
  }
};

export interface UploadPdfUploader {
  id: number;
  name: string;
}

export interface UploadPdfData {
  id: number;
  groupId: number;
  fileName: string;
  s3Url: string;
  uploader: UploadPdfUploader;
  createdAt: string;
}

export interface UploadPdfApiResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: UploadPdfData;
  timestamp: string;
}

export const uploadPdf = async (
  groupId: number,
  file: File
): Promise<UploadPdfData> => {
  try {
    const formData = new FormData();
    formData.append('group_id', groupId.toString());
    formData.append('file', file);

    const response = await apiFetch<UploadPdfApiResponse>('/pdf', {
      method: 'POST',
      body: formData,
      skipContentType: true,
    });
    return response.data;
  } catch (error) {
    console.error('PDF 업로드 실패:', error);
    throw error;
  }
};

export interface PdfListItemUploader {
  id: number;
  nickname: string;
}

export interface PdfListItem {
  id: number;
  title: string;
  fileUrl: string;
  uploader: PdfListItemUploader;
  createdAt: string;
  updatedAt: string;
}

export interface PdfListData {
  groupId: number;
  groupName: string;
  pdfList: PdfListItem[];
}

export interface PdfListApiResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: PdfListData;
  timestamp: string;
}

export const getPdfList = async (groupId: number): Promise<PdfListData> => {
  try {
    const response = await apiFetch<PdfListApiResponse>(
      `/pdf?group_id=${groupId}`,
      {
        method: 'GET',
      }
    );
    return response.data;
  } catch (error) {
    console.error('PDF 목록 조회 실패:', error);
    throw error;
  }
};

export interface CreateQuizQaBoard {
  board_id: number;
  title: string;
}

export interface CreateQuizData {
  id: number;
  pdf_id: number;
  round: number;
  difficulty: string;
  question_types: string[];
  total_questions: number;
  status: string | null;
  qa_board: CreateQuizQaBoard;
}

export interface CreateQuizPayload {
  pdf_id: number;
  difficulty: string;
  question_types: string[];
  total_questions: number;
}

export interface CreateQuizApiResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: CreateQuizData;
  timestamp: string;
}

export const createQuiz = async (
  payload: CreateQuizPayload
): Promise<CreateQuizData> => {
  try {
    const response = await apiFetch<CreateQuizApiResponse>('/quiz/create', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return response.data;
  } catch (error) {
    console.error('퀴즈 생성 실패:', error);
    throw error;
  }
};

// 사용자 지정 퀴즈 생성 관련 타입
export interface UserQuizQuestionOption {
  option_text: string;
}

export interface UserQuizQuestion {
  type: 'OX' | '객관식' | '단답형';
  question_number: number;
  question_text: string;
  correct_answer: string;
  explanation: string;
  options?: UserQuizQuestionOption[];
}

export interface CreateUserQuizPayload {
  group_id: number;
  title: string;
  questions: UserQuizQuestion[];
}

export interface CreateUserQuizData {
  id: number;
  pdf_id: number | null;
  round: number;
  difficulty: string | null;
  question_types: string[];
  total_questions: number;
  qa_board: CreateQuizQaBoard;
}

export interface CreateUserQuizApiResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: CreateUserQuizData;
  timestamp: string;
}

export const createUserQuiz = async (
  payload: CreateUserQuizPayload
): Promise<CreateUserQuizData> => {
  try {
    const response = await apiFetch<CreateUserQuizApiResponse>(
      '/quiz/user/create',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
    return response.data;
  } catch (error) {
    console.error('사용자 지정 퀴즈 생성 실패:', error);
    throw error;
  }
};

// 퀴즈 응시 시작 관련 타입
export interface StartQuizPayload {
  quiz_id: number;
}

export interface StartQuizData {
  quiz_result_id: number;
  message: string;
}

export interface StartQuizApiResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: StartQuizData;
  timestamp: string;
}

export const startQuiz = async (
  payload: StartQuizPayload
): Promise<StartQuizData> => {
  try {
    const response = await apiFetch<StartQuizApiResponse>('/quiz/start', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return response.data;
  } catch (error) {
    console.error('퀴즈 응시 시작 실패:', error);
    throw error;
  }
};
