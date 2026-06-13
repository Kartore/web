# Kartore React Agent Notes

## このアプリケーションについて

Kartore WebUI は、MapLibre のスタイル JSON を地図上で確認しながら編集する React アプリケーションです。初期データとして `src/samples/osm-liberty.ts` の `osmLibertyMigrated` を読み込み、`localStorage` の `kartore:style` に保持します。

画面は大きく 3 つの領域で構成されています。

- 地図表示: `src/components/editor/MapPanel/MapPanel.tsx`
- レイヤー一覧と並び替え: `src/components/editor/NavigationPanel/NavigationPanel.tsx`
- 選択レイヤーのプロパティ編集: `src/components/editor/PropertiesPanel/PropertiesPanel.tsx`

主なユーザー操作は、MapLibre スタイルのレイヤーを選択し、レイヤー順序、source/source-layer、zoom 範囲、filter、paint/layout プロパティ、Raw JSON を編集することです。編集結果は React state 経由で MapLibre の `mapStyle` に渡され、地図表示へ即時反映されます。

## 技術スタック

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- MapLibre GL / react-map-gl
- `@maplibre/maplibre-gl-style-spec`
- React Aria / React Stately 系の UI 補助
- Monaco Editor / Shiki
- dnd-kit
- TanStack React Query
- Vitest / happy-dom
- oxlint / oxfmt
- pnpm

## 重要なファイル

- `src/App.tsx`: アプリ全体の状態管理。MapLibre スタイル、選択レイヤー、レイヤー順変更、プロパティ更新を接続する。
- `src/main.tsx`: React ルートと `QueryClientProvider`。
- `src/components/editor/MapPanel/MapPanel.tsx`: `id="backgroundMap"` の MapLibre インスタンスを表示する。
- `src/components/editor/NavigationPanel/NavigationPanel.tsx`: dnd-kit で `mapStyle.layers` をドラッグ並び替えする。
- `src/components/editor/PropertiesPanel/LayerPropertiesPanel/LayerPropertiesPanel.tsx`: レイヤー種別ごとのプロパティパネルへ分岐する。
- `src/components/editor/PropertiesPanel/LayerPropertiesPanel/utils/LayerUtil/LayerUtil.ts`: レイヤー型ガード、プロパティ分割、`replaceLayerData`。
- `src/components/editor/PropertiesPanel/LayerPropertiesPanel/common/RawDataProperties/RawDataProperties.tsx`: Monaco Editor によるレイヤー JSON 直接編集。
- `src/components/common/FilterInputField`: MapLibre expression/filter 入力 UI 群。
- `src/components/common`: 再利用 UI コンポーネント群。
- `src/samples`: サンプルレイヤーと OSM Liberty スタイル。

## データ更新の流れ

1. `App.tsx` が `useLocalStorage('kartore:style', osmLibertyMigrated)` でスタイルを保持する。
2. レイヤー選択は `selectedLayerId` で管理する。
3. 各プロパティパネルは `onChange(layer, group, key, value)` を呼ぶ。
4. `replaceLayerData` が該当レイヤーを探し、`paint`、`layout`、`metadata`、ルートプロパティ、または `all` を更新する。
5. 更新後の `mapStyle` が `MapPanel` に渡され、地図描画に反映される。

注意: `replaceLayerData` はスタイルオブジェクトを浅くコピーしますが、対象レイヤー内部は直接変更しています。周辺コードはこの前提で動いているため、更新処理を変更するときは MapLibre の再描画、React state の参照、テスト影響を確認してください。

## レイヤー対応状況

`LayerPropertiesPanel` は以下の MapLibre レイヤー種別に対応しています。

- `background`
- `fill`
- `line`
- `symbol`
- `raster`
- `circle`
- `heatmap`
- `hillshade`
- `fill-extrusion`

新しいレイヤー種別やプロパティを追加する場合は、型ガード、分岐、専用パネル、必要なら Raw JSON schema の参照を追加してください。

## 開発コマンド

- 依存関係: `pnpm install`
- 開発サーバー: `pnpm run dev`
- 型チェック付きビルド: `pnpm run build`
- Vite ビルドのみ: `pnpm run build-no-tscheck`
- 型チェック: `pnpm run typecheck`
- lint: `pnpm run lint`
- 自動 lint 修正: `pnpm run lint:fix`
- format: `pnpm run format`
- format check: `pnpm run format:check`
- unit test: `pnpm run test:unit`
- changed test: `pnpm run test:changed`
- Cloudflare Workers preview: `pnpm run preview`
- deploy: `pnpm run deploy`

## コーディング規約と作業メモ

- import alias は `~/*` が `src/*` を指します。
- 既存コードでは `.ts` / `.tsx` 拡張子付き import が使われています。近いコードの書き方に合わせてください。
- UI コンポーネントは `ComponentName/ComponentName.tsx` と `ComponentName/index.ts` の構成が基本です。`plopfile.js` に component/icon generator があります。
- スタイルは Tailwind CSS の utility class が中心です。class の結合には `src/utils/tailwindUtil.ts` の `cn` を使います。
- MapLibre の style spec 型を優先し、プロパティ名は style spec の正式名に合わせます。
- 式やデータドリブンスタイルの場合、単純なフォーム UI で扱えない値は `TextField` または Raw JSON editor にフォールバックしている箇所があります。
- `MapPanel` の map id は `backgroundMap` です。ズーム操作などは `useMap()` からこの id を参照します。
- テストは現状 `LayerUtil` の型ガード中心です。共有ロジックや style 更新処理を変える場合は Vitest の追加を検討してください。

## 変更時の確認ポイント

- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run test:unit`
- UI や MapLibre 表示に関わる変更では `pnpm run dev` で地図表示、レイヤー選択、プロパティ更新、レイヤー並び替えを確認する。

## 既知の実装上の特徴

- README は現状 `Kartore WebUI` と `wip` のみで、詳細な仕様はコードから読む必要があります。
- アプリは現時点ではサンプルスタイルを編集するクライアントサイド UI で、永続化先は localStorage です。
- MapLibre style の全プロパティを完全にフォーム化しているわけではなく、レイヤー種別ごとに主要項目を UI 化し、詳細編集は Raw JSON editor に委ねています。
