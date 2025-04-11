import type { ComponentProps, FC } from 'react';

import type { ExpressionFilterSpecification } from '@maplibre/maplibre-gl-style-spec';

import { ExpressionInputField } from '~/components/common/FilterInputField/expressions';

export type FilterInputFieldProps = {
	value?: ExpressionFilterSpecification;
	onChange?: (value: ExpressionFilterSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const FilterInputField: FC<FilterInputFieldProps> = ({
	className,
	children,
	value,
	onChange,
	...props
}) => {
	if (!value) {
		return null;
	}
	if (value === true) {
		return null;
	}
	return (
		<ExpressionInputField
			className={'text-sm'}
			value={value}
			onChange={onChange}
			{...props}
		>
			{children}
		</ExpressionInputField>
	);
};

FilterInputField.displayName = 'FilterInputField';
