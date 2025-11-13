import styled from "styled-components";

/* ====== 색/그림자 토큰 ====== */
const c = {
  sky1: "#F0F7FF",
  sky2: "#E8F1FF",
  blue: "#539BFF",
  blueDark: "#2E5AF0",
  stroke: "#E6EEF6",
  text: "#565555",
  textSub: "#6B7280",
  cardBg: "#FFFFFF",
  oxBg: "#F6FAFF",
  oxText: "#CFE0F4",
  oxSelectedBg: "#EAF2FF",
  oxSelectedText: "#6A96FF",
};

const shadowCard = "0 10px 30px rgba(56, 91, 194, 0.12)";

export const Page = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const Logo = styled.img`
  height: 100px;
  width: auto;
  display: flex;
  position: fixed;
  top: 28px;
  left: 56px;
`;

export const Wrapper = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 32px 28px 28px;
  background: ${c.cardBg};
  border-radius: 24px;
  box-shadow: ${shadowCard};
  border: 4px solid var(--gradient, rgba(234, 234, 234, 0.1));
`;

export const Header = styled.div`
  padding: 10px 0px;
  h1 {
    font-size: 38px;
    font-weight: 800;
    color: ${c.blue};
  }
  h3 {
    font-size: 34px;
    font-weight: 400;
    color: ${c.blue};
    padding-bottom: 30px;
  }
  p {
    color: ${c.blue};
    text-align: center;
    font-size: 30px;
    padding-top: 30px;
    font-weight: 700;
  }
  span {
    color: rgba(86, 85, 85, 0.5);
  }
`;

export const Progress = styled.div`
  height: 8px;
  background: #eef3fa;
  border-radius: 9999px;
  overflow: hidden;
  margin: 14px 40px 24px;
`;
export const Bar = styled.div<{ w: number }>`
  width: ${({ w }) => w}%;
  height: 100%;
  background: linear-gradient(90deg, ${c.blue} 0%, ${c.blue} 100%);
  transition: width 0.25s ease;
`;

export const QuestionBox = styled.section`
  background: ${c.cardBg};
  border-radius: 20px;
  padding: 30px 40px;
  box-shadow: 0 6px 18px rgba(17, 24, 39, 0.04);
  margin-bottom: 18px;

  h2 {
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 40px;
    color: ${c.text};
    line-height: 1.4;
  }
  h1 {
    font-size: 30px;
    font-weight: 800;
    color: ${c.text};
    line-height: 1;
  }
`;

/* 객관식 옵션 */
export const Option = styled.label<{ selected?: boolean }>`
  display: flex;
  padding: 18px;
  gap: 4px;
  border-radius: 14px;
  margin-top: 10px;
  cursor: pointer;
  border: ${({ selected }) => (selected ? "3px" : "1px")} solid
    rgba(0, 122, 255, 0.4);
  background: ${({ selected }) => (selected ? "#F4F7FF" : "#fff")};
  box-shadow: ${({ selected }) =>
    selected ? "0 4px 10px rgba(79,123,255,.18)" : "none"};
  transition: 0.18s ease;
  &:hover {
    transform: translateY(-1px);
  }
  color: ${({ selected }) => (selected ? c.blue : "#565555")};
`;

/* 단답 입력 */
export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(0, 122, 255, 0.4);
  border-radius: 12px;
  font-size: 15px;
  &:focus {
    outline: none;
    border-color: ${c.blue};
    box-shadow: 0 0 0 3px rgba(79, 123, 255, 0.15);
  }
`;

/* ===== OX 전용 ===== */
export const OXGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 28px;
  margin-top: 12px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
`;

export const OXBox = styled.button<{ selected?: boolean }>`
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: 20px;
  border: 1px solid ${({ selected }) => (selected ? c.blue : c.stroke)};
  background: ${({ selected }) => (selected ? c.oxSelectedBg : c.oxBg)};
  display: grid;
  place-items: center;
  box-shadow: ${({ selected }) =>
    selected ? "0 8px 22px rgba(79,123,255,.25)" : "inset 0 1px 0 #fff"};
  transition: 0.18s ease;
  cursor: pointer;

  span {
    font-weight: 800;
    font-size: clamp(72px, 10vw, 120px);
    line-height: 1;
    color: ${({ selected }) => (selected ? c.oxSelectedText : c.oxText)};
    letter-spacing: -0.02em;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
`;
export const Button = styled.button<{ primary?: boolean }>`
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  border: ${({ primary }) => (primary ? "none" : `1px solid ${c.stroke}`)};
  color: ${({ primary }) => (primary ? "#fff" : c.textSub)};
  background: ${({ primary }) => (primary ? c.blue : "#fff")};
  box-shadow: ${({ primary }) =>
    primary ? "0 6px 16px rgba(79,123,255,.25)" : "none"};
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
