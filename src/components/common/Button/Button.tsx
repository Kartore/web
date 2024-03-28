import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import { Spinner } from '~/components/common/Spinner';

const buttonVariants = tv({
  slots: {
    base: 'bg-gray-100 px-4 py-2 text-sm text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900',
    text: '',
    spinner: '',
  },
  variants: {
    isLoading: {
      true: {
        base: 'pointer-events-none opacity-90',
        text: 'hidden',
        spinner: '',
      },
      false: {
        spinner: 'hidden',
      },
    },
    isDisabled: {
      true: {
        base: 'pointer-events-none opacity-70',
        text: '',
        spinner: '',
      },
      false: '',
    },
  },
});

type ButtonVaritantProps = VariantProps<typeof buttonVariants>;

type ButtonProps = ComponentPropsWithoutRef<'button'> & ButtonVaritantProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, isDisabled, ...props }, ref) => {
    const { base, text, spinner } = buttonVariants({ isLoading, isDisabled });
    return (
      <button type={'button'} {...props} className={base(props)} ref={ref}>
        <p className={text()}>{children}</p>
        <Spinner className={spinner()} />
      </button>
    );
  }
);

Button.displayName = 'Button';
