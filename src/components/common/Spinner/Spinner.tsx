import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const spinnerVariant = tv({
  base: 'inline-block h-10 w-10 animate-spin rounded-full border-4 border-current border-r-transparent  border-t-transparent animation-duration-[600ms]',
  variants: {},
});

type SpinnerVariantProps = VariantProps<typeof spinnerVariant>;

type SpinnerProps = ComponentPropsWithoutRef<'div'> & SpinnerVariantProps;

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>((props, ref) => {
  return <div {...props} className={spinnerVariant(props)} ref={ref} />;
});

Spinner.displayName = 'Spinner';
