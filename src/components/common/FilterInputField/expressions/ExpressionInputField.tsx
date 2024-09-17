import type { ComponentProps, FC } from 'react';

import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';

import {
  isRgbaExpressionSpecification,
  RgbaInputField,
} from '~/components/common/FilterInputField/expressions/color/RgbaInputField';
import {
  isRgbExpressionSpecification,
  RgbInputField,
} from '~/components/common/FilterInputField/expressions/color/RgbInputField';
import {
  isToRgbaExpressionSpecification,
  ToRgbaInputField,
} from '~/components/common/FilterInputField/expressions/color/ToRgbaInputField';
import {
  InterpolateHclInputField,
  isInterpolateHclExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/curves/InterpolateHclInputField';
import {
  InterpolateInputField,
  isInterpolateExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/curves/InterpolateInputField';
import {
  InterpolateLabInputField,
  isInterpolateLabExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/curves/InterpolateLabInputField';
import {
  isStepExpressionSpecification,
  StepInputField,
} from '~/components/common/FilterInputField/expressions/curves/StepInputField';
import {
  AllInputField,
  isAllExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/decision/AllInputField';
import {
  AnyInputField,
  isAnyExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/decision/AnyInputField';
import {
  CaseInputField,
  isCaseExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/decision/CaseInputField';
import {
  CoalesceInputField,
  isCoalesceExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/decision/CoalesceInputField';
import {
  EqualInputField,
  isEqualExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/decision/EqualInputField';
import {
  GreaterThanInputField,
  isGreaterThanExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/decision/GreaterThanInputField';
import {
  GreaterThanOrEqualInputField,
  isGreaterThanOrEqualExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/decision/GreaterThanOrEqualInputField';
import {
  isLessThanExpressionSpecification,
  LessThanInputField,
} from '~/components/common/FilterInputField/expressions/decision/LessThanInputField';
import {
  isLessThanOrEqualExpressionSpecification,
  LessThanOrEqualInputField,
} from '~/components/common/FilterInputField/expressions/decision/LessThanOrEqualInputField';
import {
  isMatchExpressionSpecification,
  MatchInputField,
} from '~/components/common/FilterInputField/expressions/decision/MatchInputField';
import {
  isNotEqualExpressionSpecification,
  NotEqualInputField,
} from '~/components/common/FilterInputField/expressions/decision/NotEqualInputField';
import {
  isNotExpressionSpecification,
  NotInputField,
} from '~/components/common/FilterInputField/expressions/decision/NotInputField';
import {
  isWithinExpressionSpecification,
  WithinInputField,
} from '~/components/common/FilterInputField/expressions/decision/WithinInputField';
import {
  AccumulatedInputField,
  isAccumulatedExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/feature-data/AccumulatedInputField';
import {
  FeatureStateInputField,
  isFeatureStateExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/feature-data/FeatureStateInputField';
import {
  GeometryTypeInputField,
  isGeometryTypeExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/feature-data/GeometryTypeInputField';
import {
  IdInputField,
  isIdExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/feature-data/IdInputField';
import {
  isLineProgressExpressionSpecification,
  LineProgressInputField,
} from '~/components/common/FilterInputField/expressions/feature-data/LineProgressInputField';
import {
  isPropertiesExpressionSpecification,
  PropertiesInputField,
} from '~/components/common/FilterInputField/expressions/feature-data/PropertiesInputField';
import {
  HeatmapDensityInputField,
  isHeatmapDensityExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/heatmap/HeatmapDensity';
import {
  AtInputField,
  isAtExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/lookup/AtInputField';
import {
  GetInputField,
  isGetExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/lookup/GetInputField';
import {
  HasInputField,
  isHasExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/lookup/HasInputField';
import {
  IndexOfInputField,
  isIndexOfExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/lookup/IndexOfInputField';
import {
  InInputField,
  isInExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/lookup/InInputField';
import {
  isLengthExpressionSpecification,
  LengthInputField,
} from '~/components/common/FilterInputField/expressions/lookup/LengthInputField';
import {
  isSliceExpressionSpecification,
  SliceInputField,
} from '~/components/common/FilterInputField/expressions/lookup/SliceInputField';
import {
  AbsInputField,
  isAbsExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/math/AbsInputField';
import {
  AcosInputField,
  isAcosExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/math/AcosInputField';
import {
  AdditionInputField,
  isAdditionExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/math/AdditionInputField';
import {
  AsinInputField,
  isAsinExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/math/AsinInputField';
import {
  AtanInputField,
  isAtanExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/math/AtanInputField';
import {
  CeilInputField,
  isCeilExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/math/CeilInputField';
import {
  CosInputField,
  isCosExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/math/CosInputField';
import {
  DistanceInputField,
  isDistanceExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/math/DistanceInputField';
import {
  DivisionInputField,
  isDivisionExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/math/DivisionInputField';
import {
  EInputField,
  isEExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/math/EInputField';
import {
  FloorInputField,
  isFloorExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/math/FloorInputField';
import {
  isLn2ExpressionSpecification,
  Ln2InputField,
} from '~/components/common/FilterInputField/expressions/math/Ln2InputField';
import {
  isLnExpressionSpecification,
  LnInputField,
} from '~/components/common/FilterInputField/expressions/math/LnInputField';
import {
  isLog10ExpressionSpecification,
  Log10InputField,
} from '~/components/common/FilterInputField/expressions/math/Log10InputField';
import {
  isLog2ExpressionSpecification,
  Log2InputField,
} from '~/components/common/FilterInputField/expressions/math/Log2InputField';
import {
  isMaxExpressionSpecification,
  MaxInputField,
} from '~/components/common/FilterInputField/expressions/math/MaxInputField';
import {
  isMinExpressionSpecification,
  MinInputField,
} from '~/components/common/FilterInputField/expressions/math/MinInputField';
import {
  isMultiplicationExpressionSpecification,
  MultiplicationInputField,
} from '~/components/common/FilterInputField/expressions/math/MultiplicationInputField';
import {
  isPiExpressionSpecification,
  PiInputField,
} from '~/components/common/FilterInputField/expressions/math/PiInputField';
import {
  isPowerExpressionSpecification,
  PowerInputField,
} from '~/components/common/FilterInputField/expressions/math/PowerInputField';
import {
  isRoundExpressionSpecification,
  RoundInputField,
} from '~/components/common/FilterInputField/expressions/math/RoundInputField';
import {
  isSinExpressionSpecification,
  SinInputField,
} from '~/components/common/FilterInputField/expressions/math/SinInputField';
import {
  isSqrtExpressionSpecification,
  SqrtInputField,
} from '~/components/common/FilterInputField/expressions/math/SqrtInputField';
import {
  isSubtractionExpressionSpecification,
  SubtractionInputField,
} from '~/components/common/FilterInputField/expressions/math/SubtractionInputField';
import {
  isTanExpressionSpecification,
  TanInputField,
} from '~/components/common/FilterInputField/expressions/math/TanInputField';
import {
  ConcatInputField,
  isConcatExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/string/ConcatInputField';
import {
  DowncaseInputField,
  isDowncaseExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/string/DowncaseInputField';
import {
  isIsSupportedScriptExpressionSpecification,
  IsSupportedScriptInputField,
} from '~/components/common/FilterInputField/expressions/string/IsSupportedScriptInputField';
import {
  isResolvedLocaleExpressionSpecification,
  ResolvedLocaleInputField,
} from '~/components/common/FilterInputField/expressions/string/ResolvedLocaleInputField';
import {
  isUpcaseExpressionSpecification,
  UpcaseInputField,
} from '~/components/common/FilterInputField/expressions/string/UpcaseInputField';
import {
  ArrayInputField,
  isArrayExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/types/ArrayInputField';
import {
  BooleanInputField,
  isBooleanExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/types/BooleanInputField';
import {
  CollatorInputField,
  isCollatorExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/types/CollatorInputField';
import {
  FormatInputField,
  isFormatExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/types/FormatInputField';
import {
  ImageInputField,
  isImageExpressionSpecification,
} from '~/components/common/FilterInputField/expressions/types/ImageInputField';
import {
  isLiteralExpressionSpecification,
  LiteralInputField,
} from '~/components/common/FilterInputField/expressions/types/LiteralInputField';
import {
  isNumberFormatExpressionSpecification,
  NumberFormatInputField,
} from '~/components/common/FilterInputField/expressions/types/NumberFormatInputField';
import {
  isNumberExpressionSpecification,
  NumberInputField,
} from '~/components/common/FilterInputField/expressions/types/NumberInputField';
import {
  isObjectExpressionSpecification,
  ObjectInputField,
} from '~/components/common/FilterInputField/expressions/types/ObjectInputField';
import {
  isStringExpressionSpecification,
  StringInputField,
} from '~/components/common/FilterInputField/expressions/types/StringInputField';
import {
  isToBooleanExpressionSpecification,
  ToBooleanInputField,
} from '~/components/common/FilterInputField/expressions/types/ToBooleanInputField';
import {
  isToColorExpressionSpecification,
  ToColorInputField,
} from '~/components/common/FilterInputField/expressions/types/ToColorInputField';
import {
  isToNumberExpressionSpecification,
  ToNumberInputField,
} from '~/components/common/FilterInputField/expressions/types/ToNumberInputField';
import {
  isToStringExpressionSpecification,
  ToStringInputField,
} from '~/components/common/FilterInputField/expressions/types/ToStringInputField';
import {
  isTypeofExpressionSpecification,
  TypeofInputField,
} from '~/components/common/FilterInputField/expressions/types/TypeofInputField';
import {
  isLetExpressionSpecification,
  LetInputField,
} from '~/components/common/FilterInputField/expressions/variables/LetInputField';
import {
  isVarExpressionSpecification,
  VarInputField,
} from '~/components/common/FilterInputField/expressions/variables/VarInputField';
import {
  isZoomExpressionSpecification,
  ZoomInputField,
} from '~/components/common/FilterInputField/expressions/zoom/ZoomInputField';

export type ExpressionInputFieldProps = {
  value: ExpressionSpecification;
  onChange?: (value: ExpressionSpecification) => void;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const ExpressionInputField: FC<ExpressionInputFieldProps> = ({
  children,
  value,
  onChange,
  ...props
}) => {
  if (!value) {
    return null;
  }
  if (isRgbaExpressionSpecification(value)) {
    return (
      <RgbaInputField value={value} onChange={onChange} {...props}>
        {children}
      </RgbaInputField>
    );
  }
  if (isRgbExpressionSpecification(value)) {
    return (
      <RgbInputField value={value} onChange={onChange} {...props}>
        {children}
      </RgbInputField>
    );
  }
  if (isToRgbaExpressionSpecification(value)) {
    return (
      <ToRgbaInputField value={value} onChange={onChange} {...props}>
        {children}
      </ToRgbaInputField>
    );
  }
  if (isInterpolateHclExpressionSpecification(value)) {
    return (
      <InterpolateHclInputField value={value} onChange={onChange} {...props}>
        {children}
      </InterpolateHclInputField>
    );
  }
  if (isInterpolateExpressionSpecification(value)) {
    return (
      <InterpolateInputField value={value} onChange={onChange} {...props}>
        {children}
      </InterpolateInputField>
    );
  }
  if (isInterpolateLabExpressionSpecification(value)) {
    return (
      <InterpolateLabInputField value={value} onChange={onChange} {...props}>
        {children}
      </InterpolateLabInputField>
    );
  }
  if (isStepExpressionSpecification(value)) {
    return (
      <StepInputField value={value} onChange={onChange} {...props}>
        {children}
      </StepInputField>
    );
  }
  if (isAllExpressionSpecification(value)) {
    return (
      <AllInputField value={value} onChange={onChange} {...props}>
        {children}
      </AllInputField>
    );
  }
  if (isAnyExpressionSpecification(value)) {
    return (
      <AnyInputField value={value} onChange={onChange} {...props}>
        {children}
      </AnyInputField>
    );
  }
  if (isCaseExpressionSpecification(value)) {
    return (
      <CaseInputField value={value} onChange={onChange} {...props}>
        {children}
      </CaseInputField>
    );
  }
  if (isCoalesceExpressionSpecification(value)) {
    return (
      <CoalesceInputField value={value} onChange={onChange} {...props}>
        {children}
      </CoalesceInputField>
    );
  }
  if (isEqualExpressionSpecification(value)) {
    return (
      <EqualInputField value={value} onChange={onChange} {...props}>
        {children}
      </EqualInputField>
    );
  }
  if (isGreaterThanExpressionSpecification(value)) {
    return (
      <GreaterThanInputField value={value} onChange={onChange} {...props}>
        {children}
      </GreaterThanInputField>
    );
  }
  if (isGreaterThanOrEqualExpressionSpecification(value)) {
    return (
      <GreaterThanOrEqualInputField value={value} onChange={onChange} {...props}>
        {children}
      </GreaterThanOrEqualInputField>
    );
  }
  if (isLessThanExpressionSpecification(value)) {
    return (
      <LessThanInputField value={value} onChange={onChange} {...props}>
        {children}
      </LessThanInputField>
    );
  }
  if (isLessThanOrEqualExpressionSpecification(value)) {
    return (
      <LessThanOrEqualInputField value={value} onChange={onChange} {...props}>
        {children}
      </LessThanOrEqualInputField>
    );
  }
  if (isMatchExpressionSpecification(value)) {
    return (
      <MatchInputField value={value} onChange={onChange} {...props}>
        {children}
      </MatchInputField>
    );
  }
  if (isNotEqualExpressionSpecification(value)) {
    return (
      <NotEqualInputField value={value} onChange={onChange} {...props}>
        {children}
      </NotEqualInputField>
    );
  }
  if (isNotExpressionSpecification(value)) {
    return (
      <NotInputField value={value} onChange={onChange} {...props}>
        {children}
      </NotInputField>
    );
  }
  if (isWithinExpressionSpecification(value)) {
    return (
      <WithinInputField value={value} onChange={onChange} {...props}>
        {children}
      </WithinInputField>
    );
  }
  if (isAccumulatedExpressionSpecification(value)) {
    return (
      <AccumulatedInputField value={value} onChange={onChange} {...props}>
        {children}
      </AccumulatedInputField>
    );
  }
  if (isFeatureStateExpressionSpecification(value)) {
    return (
      <FeatureStateInputField value={value} onChange={onChange} {...props}>
        {children}
      </FeatureStateInputField>
    );
  }
  if (isGeometryTypeExpressionSpecification(value)) {
    return (
      <GeometryTypeInputField value={value} onChange={onChange} {...props}>
        {children}
      </GeometryTypeInputField>
    );
  }
  if (isIdExpressionSpecification(value)) {
    return (
      <IdInputField value={value} onChange={onChange} {...props}>
        {children}
      </IdInputField>
    );
  }
  if (isLineProgressExpressionSpecification(value)) {
    return (
      <LineProgressInputField value={value} onChange={onChange} {...props}>
        {children}
      </LineProgressInputField>
    );
  }
  if (isPropertiesExpressionSpecification(value)) {
    return (
      <PropertiesInputField value={value} onChange={onChange} {...props}>
        {children}
      </PropertiesInputField>
    );
  }

  if (isHeatmapDensityExpressionSpecification(value)) {
    return (
      <HeatmapDensityInputField value={value} onChange={onChange} {...props}>
        {children}
      </HeatmapDensityInputField>
    );
  }

  if (isAtExpressionSpecification(value)) {
    return (
      <AtInputField value={value} onChange={onChange} {...props}>
        {children}
      </AtInputField>
    );
  }
  if (isGetExpressionSpecification(value)) {
    return (
      <GetInputField value={value} onChange={onChange} {...props}>
        {children}
      </GetInputField>
    );
  }
  if (isHasExpressionSpecification(value)) {
    return (
      <HasInputField value={value} onChange={onChange} {...props}>
        {children}
      </HasInputField>
    );
  }
  if (isIndexOfExpressionSpecification(value)) {
    return (
      <IndexOfInputField value={value} onChange={onChange} {...props}>
        {children}
      </IndexOfInputField>
    );
  }
  if (isInExpressionSpecification(value)) {
    return (
      <InInputField value={value} onChange={onChange} {...props}>
        {children}
      </InInputField>
    );
  }
  if (isLengthExpressionSpecification(value)) {
    return (
      <LengthInputField value={value} onChange={onChange} {...props}>
        {children}
      </LengthInputField>
    );
  }
  if (isSliceExpressionSpecification(value)) {
    return (
      <SliceInputField value={value} onChange={onChange} {...props}>
        {children}
      </SliceInputField>
    );
  }

  if (isAbsExpressionSpecification(value)) {
    return (
      <AbsInputField value={value} onChange={onChange} {...props}>
        {children}
      </AbsInputField>
    );
  }
  if (isAcosExpressionSpecification(value)) {
    return (
      <AcosInputField value={value} onChange={onChange} {...props}>
        {children}
      </AcosInputField>
    );
  }

  if (isAdditionExpressionSpecification(value)) {
    return (
      <AdditionInputField value={value} onChange={onChange} {...props}>
        {children}
      </AdditionInputField>
    );
  }

  if (isAsinExpressionSpecification(value)) {
    return (
      <AsinInputField value={value} onChange={onChange} {...props}>
        {children}
      </AsinInputField>
    );
  }
  if (isAtanExpressionSpecification(value)) {
    return (
      <AtanInputField value={value} onChange={onChange} {...props}>
        {children}
      </AtanInputField>
    );
  }
  if (isCeilExpressionSpecification(value)) {
    return (
      <CeilInputField value={value} onChange={onChange} {...props}>
        {children}
      </CeilInputField>
    );
  }
  if (isCosExpressionSpecification(value)) {
    return (
      <CosInputField value={value} onChange={onChange} {...props}>
        {children}
      </CosInputField>
    );
  }

  if (isDistanceExpressionSpecification(value)) {
    return (
      <DistanceInputField value={value} onChange={onChange} {...props}>
        {children}
      </DistanceInputField>
    );
  }

  if (isDivisionExpressionSpecification(value)) {
    return (
      <DivisionInputField value={value} onChange={onChange} {...props}>
        {children}
      </DivisionInputField>
    );
  }

  if (isEExpressionSpecification(value)) {
    return (
      <EInputField value={value} onChange={onChange} {...props}>
        {children}
      </EInputField>
    );
  }
  if (isFloorExpressionSpecification(value)) {
    return (
      <FloorInputField value={value} onChange={onChange} {...props}>
        {children}
      </FloorInputField>
    );
  }
  if (isLn2ExpressionSpecification(value)) {
    return (
      <Ln2InputField value={value} onChange={onChange} {...props}>
        {children}
      </Ln2InputField>
    );
  }
  if (isLnExpressionSpecification(value)) {
    return (
      <LnInputField value={value} onChange={onChange} {...props}>
        {children}
      </LnInputField>
    );
  }
  if (isLog2ExpressionSpecification(value)) {
    return (
      <Log2InputField value={value} onChange={onChange} {...props}>
        {children}
      </Log2InputField>
    );
  }
  if (isLog10ExpressionSpecification(value)) {
    return (
      <Log10InputField value={value} onChange={onChange} {...props}>
        {children}
      </Log10InputField>
    );
  }

  if (isMaxExpressionSpecification(value)) {
    return (
      <MaxInputField value={value} onChange={onChange} {...props}>
        {children}
      </MaxInputField>
    );
  }
  if (isMinExpressionSpecification(value)) {
    return (
      <MinInputField value={value} onChange={onChange} {...props}>
        {children}
      </MinInputField>
    );
  }
  if (isMultiplicationExpressionSpecification(value)) {
    return (
      <MultiplicationInputField value={value} onChange={onChange} {...props}>
        {children}
      </MultiplicationInputField>
    );
  }
  if (isPiExpressionSpecification(value)) {
    return (
      <PiInputField value={value} onChange={onChange} {...props}>
        {children}
      </PiInputField>
    );
  }
  if (isPowerExpressionSpecification(value)) {
    return (
      <PowerInputField value={value} onChange={onChange} {...props}>
        {children}
      </PowerInputField>
    );
  }
  if (isRoundExpressionSpecification(value)) {
    return (
      <RoundInputField value={value} onChange={onChange} {...props}>
        {children}
      </RoundInputField>
    );
  }
  if (isSinExpressionSpecification(value)) {
    return (
      <SinInputField value={value} onChange={onChange} {...props}>
        {children}
      </SinInputField>
    );
  }
  if (isSqrtExpressionSpecification(value)) {
    return (
      <SqrtInputField value={value} onChange={onChange} {...props}>
        {children}
      </SqrtInputField>
    );
  }
  if (isSubtractionExpressionSpecification(value)) {
    return (
      <SubtractionInputField value={value} onChange={onChange} {...props}>
        {children}
      </SubtractionInputField>
    );
  }
  if (isTanExpressionSpecification(value)) {
    return (
      <TanInputField value={value} onChange={onChange} {...props}>
        {children}
      </TanInputField>
    );
  }

  if (isConcatExpressionSpecification(value)) {
    return (
      <ConcatInputField value={value} onChange={onChange} {...props}>
        {children}
      </ConcatInputField>
    );
  }

  if (isDowncaseExpressionSpecification(value)) {
    return (
      <DowncaseInputField value={value} onChange={onChange} {...props}>
        {children}
      </DowncaseInputField>
    );
  }
  if (isIsSupportedScriptExpressionSpecification(value)) {
    return (
      <IsSupportedScriptInputField value={value} onChange={onChange} {...props}>
        {children}
      </IsSupportedScriptInputField>
    );
  }
  if (isResolvedLocaleExpressionSpecification(value)) {
    return (
      <ResolvedLocaleInputField value={value} onChange={onChange} {...props}>
        {children}
      </ResolvedLocaleInputField>
    );
  }
  if (isUpcaseExpressionSpecification(value)) {
    return (
      <UpcaseInputField value={value} onChange={onChange} {...props}>
        {children}
      </UpcaseInputField>
    );
  }
  if (isArrayExpressionSpecification(value)) {
    return (
      <ArrayInputField value={value} onChange={onChange} {...props}>
        {children}
      </ArrayInputField>
    );
  }
  if (isBooleanExpressionSpecification(value)) {
    return (
      <BooleanInputField value={value} onChange={onChange} {...props}>
        {children}
      </BooleanInputField>
    );
  }
  if (isCollatorExpressionSpecification(value)) {
    return (
      <CollatorInputField value={value} onChange={onChange} {...props}>
        {children}
      </CollatorInputField>
    );
  }
  if (isFormatExpressionSpecification(value)) {
    return (
      <FormatInputField value={value} onChange={onChange} {...props}>
        {children}
      </FormatInputField>
    );
  }
  if (isImageExpressionSpecification(value)) {
    return (
      <ImageInputField value={value} onChange={onChange} {...props}>
        {children}
      </ImageInputField>
    );
  }
  if (isLiteralExpressionSpecification(value)) {
    return (
      <LiteralInputField value={value} onChange={onChange} {...props}>
        {children}
      </LiteralInputField>
    );
  }
  if (isNumberFormatExpressionSpecification(value)) {
    return (
      <NumberFormatInputField value={value} onChange={onChange} {...props}>
        {children}
      </NumberFormatInputField>
    );
  }
  if (isNumberExpressionSpecification(value)) {
    return (
      <NumberInputField value={value} onChange={onChange} {...props}>
        {children}
      </NumberInputField>
    );
  }
  if (isObjectExpressionSpecification(value)) {
    return (
      <ObjectInputField value={value} onChange={onChange} {...props}>
        {children}
      </ObjectInputField>
    );
  }
  if (isStringExpressionSpecification(value)) {
    return (
      <StringInputField value={value} onChange={onChange} {...props}>
        {children}
      </StringInputField>
    );
  }
  if (isToBooleanExpressionSpecification(value)) {
    return (
      <ToBooleanInputField value={value} onChange={onChange} {...props}>
        {children}
      </ToBooleanInputField>
    );
  }
  if (isToColorExpressionSpecification(value)) {
    return (
      <ToColorInputField value={value} onChange={onChange} {...props}>
        {children}
      </ToColorInputField>
    );
  }
  if (isToNumberExpressionSpecification(value)) {
    return (
      <ToNumberInputField value={value} onChange={onChange} {...props}>
        {children}
      </ToNumberInputField>
    );
  }
  if (isToStringExpressionSpecification(value)) {
    return (
      <ToStringInputField value={value} onChange={onChange} {...props}>
        {children}
      </ToStringInputField>
    );
  }
  if (isTypeofExpressionSpecification(value)) {
    return (
      <TypeofInputField value={value} onChange={onChange} {...props}>
        {children}
      </TypeofInputField>
    );
  }

  if (isLetExpressionSpecification(value)) {
    return (
      <LetInputField value={value} onChange={onChange} {...props}>
        {children}
      </LetInputField>
    );
  }
  if (isVarExpressionSpecification(value)) {
    return (
      <VarInputField value={value} onChange={onChange} {...props}>
        {children}
      </VarInputField>
    );
  }
  if (isZoomExpressionSpecification(value)) {
    return (
      <ZoomInputField value={value} onChange={onChange} {...props}>
        {children}
      </ZoomInputField>
    );
  }
  return (
    <div {...props}>
      {JSON.stringify(value)}
      {children}
    </div>
  );
};
