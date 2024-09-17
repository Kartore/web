import type { FC, ComponentProps } from 'react';

import type { InterpolationSpecification } from '@maplibre/maplibre-gl-style-spec';

import {
  CubicBezierInputField,
  isCubicBezierInterpolationSpecification,
} from '~/components/common/FilterInputField/expressions/curves/interpolations/CubicBezierInputField';
import {
  ExponentialInputField,
  isExponentialInterpolationSpecification,
} from '~/components/common/FilterInputField/expressions/curves/interpolations/ExponentialInputField';
import {
  isLinearInterpolationSpecification,
  LinearInputField,
} from '~/components/common/FilterInputField/expressions/curves/interpolations/LinearInputField';

export type InterpolationsInputFieldProps = {
  value: InterpolationSpecification;
  onChange?: (value: InterpolationSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const InterpolationsInputField: FC<InterpolationsInputFieldProps> = ({
  value,
  onChange,
  children,
  ...props
}) => {
  if (isCubicBezierInterpolationSpecification(value)) {
    return (
      <CubicBezierInputField value={value} onChange={onChange} {...props}>
        {children}
      </CubicBezierInputField>
    );
  }
  if (isExponentialInterpolationSpecification(value)) {
    return (
      <ExponentialInputField value={value} onChange={onChange} {...props}>
        {children}
      </ExponentialInputField>
    );
  }
  if (isLinearInterpolationSpecification(value)) {
    return (
      <LinearInputField value={value} onChange={onChange} {...props}>
        {children}
      </LinearInputField>
    );
  }
  return null;
};
