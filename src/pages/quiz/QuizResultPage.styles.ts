import styled from "styled-components";

export const Page = styled.div`
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  isolation: isolate;

  &::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
  }
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
  width: 700px;
  max-width: calc(100% - 48px);
  background: #fff;
  border: 1px solid #e6eef6;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(56, 91, 194, 0.12);
  padding: 40px 24px 38px;
  text-align: center;
`;

export const Group = styled.p`
  color: #539bff;
  font-weight: 500;
  margin: 0 0 6px;
  font-size: 36px;
  padding: 14px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #539bff;
  margin: 0 0 18px;
  font-size: 50px;
  padding: 18px;
`;

export const Circle = styled.div`
  width: 240px;
  height: 240px;
  margin: 0 auto 12px;
  border-radius: 9999px;
  position: relative;
  display: grid;
  place-items: center;
  box-shadow: inset 0 0 0 10px rgba(79, 123, 255, 0.22);
`;

export const CircleText = styled.p`
  position: absolute;
  top: 32%;
  transform: translateY(-50%);
  font-weight: 800;
  color: #3a3a3a;
  font-size: 30px;
`;

export const Score = styled.p`
  font-size: 44px;
  font-weight: 800;
  color: #539bff;
  margin-top: 8px;
`;

export const Mascot = styled.img`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 54px;
  height: 54px;
  object-fit: contain;
`;

export const Comment = styled.p`
  font-family: 'OnglThinker, Pretendard, -apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif';
  color: #539bff;
  font-weight: 600;
  font-size: 38px;
  margin: 8px 0 4px;
  padding: 20px 0 50px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 8px;
`;

export const Button = styled.button`
  padding: 14px 20px;
  width: 216px;
  border-radius: 12px;
  border: 1px solid #e6eef6;
  background: #fff;
  color: #539bff;
  font-weight: 400;
  font-size: 17px;
  cursor: pointer;
`;

export const PrimaryButton = styled(Button)`
  background: #539bff;
  color: #fff;
  border: none;
  box-shadow: 0 6px 16px rgba(79, 123, 255, 0.25);
`;
