import { setProjectAnnotations } from '@storybook/react';

import globalStorybookConfig from '../.storybook/preview';
import { createSerializer } from '@emotion/jest';
setProjectAnnotations([globalStorybookConfig]);

expect.addSnapshotSerializer(createSerializer());
