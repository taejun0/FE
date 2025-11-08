import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../../../components/TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    label: '닉네임',
    placeholder: '닉네임을 입력해 주세요',
    helperText: '영문과 숫자를 포함하여 2자 이상 입력해 주세요.',
  },
  argTypes: {
    status: {
      control: 'radio',
      options: ['default', 'success', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const WithCheckButton: Story = {
  args: {
    showCheckButton: true,
    enablePasswordToggle: false,
    onCheckButtonClick: () => {
      console.log('중복 확인 버튼 클릭');
    },
    helperText: '중복 여부를 확인해 주세요!',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    feedbackText: '사용 가능한 닉네임입니다.',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    feedbackText: '닉네임이 중복돼요! 다른 닉네임을 사용해 주세요.',
  },
};

export const PasswordField: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    helperText:
      '영문 대/소문자, 숫자, 특수문자를 포함해 최소 4자 이상 입력해 주세요.',
  },
};

export const PasswordConfirmField: Story = {
  args: {
    label: '비밀번호 확인',
    type: 'password',
    helperText: '위 비밀번호와 동일하지 않습니다.',
  },
};

export const PasswordConfirmError: Story = {
  args: {
    label: '비밀번호 확인',
    type: 'password',
    status: 'error',
    feedbackText: '위 비밀번호와 동일하지 않습니다.',
  },
};

export const NicknameWithCheck: Story = {
  args: {
    label: '닉네임',
    placeholder: '닉네임을 입력해 주세요',
    showCheckButton: true,
    enablePasswordToggle: false,
    onCheckButtonClick: () => {
      console.log('중복 확인 버튼 클릭');
    },
    helperText: '중복 여부를 확인해 주세요!',
  },
};
