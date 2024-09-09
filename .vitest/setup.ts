import { createSerializer } from '@emotion/jest';
import { setProjectAnnotations } from '@storybook/react';

import globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations([globalStorybookConfig]);

expect.addSnapshotSerializer(createSerializer());
