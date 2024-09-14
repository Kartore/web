import type { FC } from 'react';
import { useState, useRef } from 'react';

import type { Color } from '@react-stately/color';
import { Item, useOverlayTriggerState } from 'react-stately';

import { Button } from '~/components/common/Button';
import { ColorArea } from '~/components/common/ColorField/ColorPicker/ColorArea';
import { ColorChannelField } from '~/components/common/ColorField/ColorPicker/ColorChannelField';
import { ColorChannelSlider } from '~/components/common/ColorField/ColorPicker/ColorChannelSlider';
import { EyeDropperButton } from '~/components/common/ColorField/ColorPicker/EyeDropperButton';
import { ColorSwatch } from '~/components/common/ColorField/ColorSwatch';
import { Popover } from '~/components/common/Popover';
import { Select } from '~/components/common/Select';
import { CloseIcon } from '~/components/icons';
import { cn } from '~/utils/tailwindUtil.ts';

export type ColorPickerProps = {
  value?: Color | null;
  onChange?: (color: Color | null) => void;
  className?: string;
};

export const ColorPicker: FC<ColorPickerProps> = ({ className, onChange, value, ...props }) => {
  const triggerRef = useRef(null);
  const triggerState = useOverlayTriggerState({
    defaultOpen: false,
  });
  const [colorFormat, setColorFormat] = useState<'Hex' | 'RGB' | 'HSL' | 'HSB'>('RGB');
  return (
    <div {...props} className={cn('h-4 w-4', className)}>
      <Button
        buttonRef={triggerRef}
        onPress={() => {
          triggerState.open();
        }}
        className={'h-full w-full border border-gray-300 focus:outline-0'}
      >
        <ColorSwatch color={value ? value : undefined} className={'h-full w-full'} />
      </Button>
      {triggerState.isOpen ? (
        <Popover state={triggerState} triggerRef={triggerRef} placement="left">
          <div className={cn('mr-2 flex w-64 flex-col border border-gray-300 bg-white shadow-xl')}>
            <div
              className={'flex flex-row items-center justify-end border-b border-b-gray-300 p-1'}
            >
              <Button
                className={'rounded p-1'}
                onPress={() => {
                  triggerState.close();
                }}
              >
                <CloseIcon className={'h-4 w-4'} />
              </Button>
            </div>
            <ColorArea
              value={value ? value.toFormat(colorFormat === 'HSL' ? 'hsl' : 'hsb') : undefined}
              xChannel={'saturation'}
              yChannel={colorFormat === 'HSL' ? 'lightness' : 'brightness'}
              onChange={onChange}
            />
            <div className={'flex flex-row items-center gap-3 pt-4 px-3 pb-2'}>
              <EyeDropperButton onChange={onChange} className={'h-7 min-w-7 rounded p-1'} />
              <div className={'flex w-full flex-col gap-3'}>
                <ColorChannelSlider
                  label={'Hue'}
                  channel={'hue'}
                  value={value ? value.toFormat('hsl') : undefined}
                  onChange={onChange}
                />
                <ColorChannelSlider
                  label={'Alpha'}
                  channel={'alpha'}
                  value={value ? value.toFormat('rgba') : undefined}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className={'flex flex-row pt-2 px-3 pb-4'}>
              <Select
                className={'text-xs'}
                triggerClassName={'h-8 bg-gray-100 hover:bg-gray-200 rounded-none'}
                selectedKey={colorFormat}
                onSelectionChange={(value) => {
                  setColorFormat(value as 'Hex' | 'RGB' | 'HSL' | 'HSB');
                }}
              >
                {/*<Item key={'Hex'}>Hex</Item>*/}
                <Item key={'RGB'}>RGB</Item>
                <Item key={'HSL'}>HSL</Item>
                <Item key={'HSB'}>HSB</Item>
              </Select>
              {colorFormat === 'RGB' ? (
                <div className={'flex flex-1 flex-row'}>
                  <ColorChannelField
                    className={'h-8 w-10 flex-1'}
                    channel={'red'}
                    value={value?.toFormat('rgb')}
                    onChange={onChange}
                  />
                  <ColorChannelField
                    className={'h-8 w-10 flex-1'}
                    channel={'green'}
                    value={value?.toFormat('rgb')}
                    onChange={onChange}
                  />
                  <ColorChannelField
                    className={'h-8 w-10 flex-1'}
                    channel={'blue'}
                    value={value?.toFormat('rgb')}
                    onChange={onChange}
                  />
                </div>
              ) : null}
              {colorFormat === 'HSL' ? (
                <div className={'flex flex-1 flex-row'}>
                  <ColorChannelField
                    className={'h-8 w-11 flex-1'}
                    channel={'hue'}
                    value={value?.toFormat('hsl')}
                    onChange={onChange}
                  />
                  <ColorChannelField
                    className={'h-8 w-11 flex-1'}
                    channel={'saturation'}
                    value={value?.toFormat('hsl')}
                    onChange={onChange}
                  />
                  <ColorChannelField
                    className={'h-8 w-11 flex-1'}
                    channel={'lightness'}
                    value={value?.toFormat('hsl')}
                    onChange={onChange}
                  />
                </div>
              ) : null}
              {colorFormat === 'HSB' ? (
                <div className={'flex flex-1 flex-row'}>
                  <ColorChannelField
                    className={'h-8 w-11 flex-1'}
                    channel={'hue'}
                    value={value?.toFormat('hsb')}
                    onChange={onChange}
                  />
                  <ColorChannelField
                    className={'h-8 w-11 flex-1'}
                    channel={'saturation'}
                    value={value?.toFormat('hsb')}
                    onChange={onChange}
                  />
                  <ColorChannelField
                    className={'h-8 w-11 flex-1'}
                    channel={'brightness'}
                    value={value?.toFormat('hsb')}
                    onChange={onChange}
                  />
                </div>
              ) : null}
              <ColorChannelField
                className={'h-8 w-12'}
                channel={'alpha'}
                value={value?.toFormat('rgb')}
                onChange={onChange}
              />
            </div>
          </div>
        </Popover>
      ) : null}
    </div>
  );
};

ColorPicker.displayName = 'ColorPicker';
