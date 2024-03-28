import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const spinnerVariant = tv({
  base: 'inline-block aspect-square h-[1em] w-[1em] animate-spin rounded-full border-[0.2em] border-current border-r-transparent  border-t-transparent animation-duration-[600ms]',
  variants: {},
});

type SpinnerVariantProps = VariantProps<typeof spinnerVariant>;

type SpinnerProps = ComponentPropsWithoutRef<'div'> & SpinnerVariantProps;

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>((props, ref) => {
  return <div {...props} className={spinnerVariant(props)} ref={ref} />;
});

Spinner.displayName = 'Spinner';
