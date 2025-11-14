import styled from "styled-components";

const c = {
  blue: "#6A96FF", // 정답일 때
  blueBg: "#F4F8FF",
  red: "#FF6A6A", // 오답일 때
  redBg: "#FFF5F5",
  stroke: "#E6EEF6",
  text: "#111827",
  card: "#FFFFFF",
  sub: "#6B7280",
  sky1: "#F0F7FF",
  sky2: "#E8F1FF",
};

const shadowCard = "0 10px 30px rgba(56, 91, 194, 0.12)";

//배경
export const Page = styled.div`
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  padding: 28px 0 64px;
  flex-direction: column;
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
  width: 900px;
  max-width: calc(100% - 48px);
  background: ${c.card};
  border: 1px solid ${c.stroke};
  border-radius: 24px;
  box-shadow: ${shadowCard};
  padding: 30px 70px 50px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
`;

export const NameBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Group = styled.p`
  font-weight: 400;
  padding: 10px;
  font-size: 26px;
  color: #565555;
  line-height: 1.4;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 38px;
  font-weight: 700;
  color: #565555;
  padding: 10px;
  line-height: 1.4;
`;

export const ScoreBox = styled.p`
  padding-left: 70px;
  font-weight: 600;
  color: #539bff;
  font-size: 34px;

  p {
    color: #565555;
    padding-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }
`;

export const Block = styled.section`
  background: ${c.card};
  border: 1px solid ${c.stroke};
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(17, 24, 39, 0.04);
  padding: 36px;
  margin: 14px 0 20px;
`;

export const QTitle = styled.h3`
  margin: 0 0 14px;
  font-size: 20px;
  font-weight: 700;
  color: #565555;
  padding-bottom: 10px;
  line-height: 1.4;
`;

export const OXRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

export const OXOption = styled.div<{ correct?: "correct" | "wrong" }>`
  height: 200px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 150px;
  font-weight: 900;
  transition: 0.2s;
  border: 2px solid
    ${({ correct }) =>
      correct === "correct" ? c.blue : correct === "wrong" ? c.red : c.stroke};
  background: ${({ correct }) =>
    correct === "correct"
      ? c.blueBg
      : correct === "wrong"
      ? c.redBg
      : "#F6FAFF"};
  color: ${({ correct }) =>
    correct === "correct" ? c.blue : correct === "wrong" ? c.red : "#BFD0E6"};
`;

export const OptionRow = styled.div<{ correct?: "correct" | "wrong" }>`
  border: 2px solid
    ${({ correct }) =>
      correct === "correct" ? c.blue : correct === "wrong" ? c.red : c.stroke};
  border-radius: 12px;
  padding: 12px 14px;
  margin: 8px 0;
  background: ${({ correct }) =>
    correct === "correct" ? c.blueBg : correct === "wrong" ? c.redBg : "#fff"};
  color: ${({ correct }) =>
    correct === "correct" ? c.blue : correct === "wrong" ? c.red : "#565555"};
  font-size: 14px;
`;

export const AnswerBadge = styled.div<{ ok?: boolean }>`
  display: inline-block;
  margin: 4px 8px 6px 0;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 13px;
  color: ${({ ok }) => (ok ? c.blue : c.red)};
  background: ${({ ok }) => (ok ? c.blueBg : c.redBg)};
  border: 1px solid ${({ ok }) => (ok ? c.blue : c.red)};
`;

export const CorrectBadge = styled(AnswerBadge)`
  color: ${c.blue};
  background: ${c.blueBg};
  border-color: ${c.blue};
`;

export const Explain = styled.div`
  margin-top: 10px;
  border: 1px solid ${c.stroke};
  background: #eaf2ff;
  color: ${c.blue};
  border-radius: 12px;
  padding: 14px;
  font-size: 13px;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding-top: 20px;
`;

export const Button = styled.button`
  width: 480px;
  padding: 18px 70px;
  border-radius: 12px;
  border: 1px solid rgba(0, 122, 255, 0.4);
  background: #fff;
  font-weight: 500;
  color: #539bff;
  font-size: 16px;
  cursor: pointer;
`;

export const PrimaryButton = styled(Button)`
  background: #539bff;
  color: #fff;
  border: none;
  box-shadow: 0 6px 16px rgba(79, 123, 255, 0.25);
`;
