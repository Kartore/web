import type { FC } from 'react';

import type { EditorProps } from '@monaco-editor/react';
import { Editor, loader } from '@monaco-editor/react';
import { shikiToMonaco } from '@shikijs/monaco';
import * as monaco from 'monaco-editor';
// eslint-disable-next-line import-x/default
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// eslint-disable-next-line import-x/default
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import { createHighlighter } from 'shiki/bundle/web';

self.MonacoEnvironment = {
	getWorker(_, label) {
		if (label === 'json') {
			return new jsonWorker();
		}
		return new editorWorker();
	},
};

loader.config({ monaco });

export type MonacoEditorProps = {} & EditorProps;

export const MonacoEditor: FC<MonacoEditorProps> = ({
	options,
	onMount,
	...props
}) => {
	return (
		<Editor
			defaultLanguage={'json'}
			theme={'github-light'}
			options={{
				minimap: { enabled: false },
				scrollBeyondLastLine: false,
				...options,
			}}
			{...props}
			onMount={(editor, monaco) => {
				onMount?.(editor, monaco);
				(async () => {
					const highlighter = await createHighlighter({
						themes: ['github-light'],
						langs: ['json'],
					});
					monaco.languages.register({ id: 'json' });
					shikiToMonaco(highlighter, monaco);
				})();
			}}
		/>
	);
};

MonacoEditor.displayName = 'MonacoEditor';
