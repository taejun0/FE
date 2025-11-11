import { ButtonHTMLAttributes, forwardRef } from 'react';
import * as S from './Button.styles';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, ...rest }, ref) => {
    return (
      <S.Button ref={ref} $variant={variant} {...rest}>
        {children}
      </S.Button>
    );
  }
);

Button.displayName = 'Button';

