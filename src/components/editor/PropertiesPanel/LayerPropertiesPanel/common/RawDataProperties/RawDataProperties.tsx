import type { ComponentProps, FC } from 'react';

import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';
import { Editor } from '@monaco-editor/react';
import { shikiToMonaco } from '@shikijs/monaco';
import { createHighlighter } from 'shiki/bundle/web';

import type { onChangeType } from '~/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts';
import { cn } from '~/utils/tailwindUtil';

export type RawDataPropertiesProps = {
  layer: LayerSpecification;
  onChange?: onChangeType;
} & Omit<ComponentProps<'div'>, 'onChange'>;

export const RawDataProperties: FC<RawDataPropertiesProps> = ({
  layer,
  className,
  children,
  onChange,
  ...props
}) => {
  return (
    <div {...props} className={cn('flex flex-col gap-2 px-4', className)}>
      <h3 className={'font-montserrat text-sm font-semibold'}>Raw Data Editor (Advanced)</h3>

      <Editor
        className={cn('min-h-40', className)}
        value={JSON.stringify(layer, undefined, 2)}
        defaultLanguage={'json'}
        onChange={(value) => {
          if (onChange && value) onChange(layer, 'all', undefined, JSON.parse(value));
        }}
        options={{
          minimap: { enabled: false },
        }}
        onMount={(_, monaco) => {
          (async () => {
            const highlighter = await createHighlighter({
              themes: ['light_plus'],
              langs: ['json'],
            });
            monaco.languages.register({ id: 'json' });
            shikiToMonaco(highlighter, monaco);
          })();
        }}
      />
      {children}
    </div>
  );
};

RawDataProperties.displayName = 'RawDataProperties';
