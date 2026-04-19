# Handoff: FIP Academy — 学習ゲーム Web アプリ

## Overview

**FIP Academy** は、日本のFIP制度（Feed-in Premium：再生可能エネルギーの市場連動型支援制度）を学ぶための、Duolingo風の学習ゲーム Web アプリのデザインです。電力会社の社員研修、業界に新しく入った人、専門家のリスキリングを主な対象としています。

主な機能：
- ホーム画面（ヒーロー / 4つの学習モード入口 / 進捗 / 学習パス）
- 用語クイズ（4択、Duolingo風の浮き上がるボタン）
- フラッシュカード（用語の暗記）
- 実績・進捗（XP、レベル、バッジ、週間アクティビティ、分野別スキル）

---

## About the Design Files

**このバンドル内のファイルは "デザインリファレンス" であり、本番コードとしてそのまま使用するものではありません。** HTML + React (Babel-in-browser) + プレーンCSS で作られたプロトタイプで、目指すべき見た目・レイアウト・インタラクションを示すために作成されています。

**実装タスク**は、これらのデザインを **対象コードベースが採用しているフレームワーク（React / Next.js / Vue / SwiftUI / Flutter など）と既存のパターン・ライブラリで再現すること** です。コードベースがまだ存在しない場合は、プロジェクトに最も適したフレームワークを選んで実装してください。

特に以下はそのまま流用しないでください：
- `<script type="text/babel">` でブラウザ内変換しているJSX → 各環境のビルドシステム経由でトランスパイル
- グローバルスコープでの window 経由のコンポーネント共有 → ES Module の import/export に置き換え
- `localStorage` 直書き込みの状態管理 → 必要に応じてフレームワーク標準のストア（Zustand, Pinia, Redux等）へ

---

## Fidelity

**High-fidelity（ハイファイ）です。** 色、タイポグラフィ、スペーシング、コンポーネントの形状、インタラクションは最終形に近い意図で作られています。実装時は、対象コードベースの既存ライブラリ（Tailwind / styled-components / CSS Modules / SwiftUI Modifierなど）を使いながら、ピクセルレベルで本デザインに揃えてください。

---

## Design System

### Color Tokens（OKLCH ベース）

すべての色は `styles.css` の `:root` で定義されています。OKLCH形式を使っていますが、対象環境がOKLCHをサポートしない場合は `hex` / `rgb` に変換してください（同等のsRGB近似値を併記）。

#### Brand
| Token | OKLCH | 用途 |
|---|---|---|
| `--grass` | `oklch(0.62 0.15 155)` ≈ `#2E9F62` | プライマリ（再エネのグリーン） |
| `--grass-bright` | `oklch(0.72 0.17 150)` ≈ `#41C77E` | ホバー、ヒーロー |
| `--grass-deep` | `oklch(0.42 0.12 160)` ≈ `#1B6E47` | グリーン背景上のテキスト |
| `--grass-soft` | `oklch(0.94 0.045 155)` ≈ `#E0F4E7` | 薄いグリーン背景 |
| `--grass-shade` | `oklch(0.30 0.08 160)` ≈ `#1F4A33` | 最濃グリーン |
| `--solar` | `oklch(0.78 0.16 85)` ≈ `#E8B53C` | XP / アクセント（ソーラーゴールド） |
| `--solar-soft` | `oklch(0.95 0.06 85)` ≈ `#F8EBC8` | ソーラー薄背景 |
| `--solar-deep` | `oklch(0.55 0.14 75)` ≈ `#A87822` | ソーラーテキスト |
| `--grid` | `oklch(0.62 0.15 230)` ≈ `#2D8FCC` | 送電網ブルー（補助色） |
| `--grid-soft` | `oklch(0.94 0.04 230)` | グリッド薄背景 |
| `--grid-deep` | `oklch(0.40 0.13 240)` | グリッド濃 |
| `--ember` | `oklch(0.64 0.19 32)` ≈ `#DD6B3B` | エラー / ストリーク炎 |
| `--violet` | `oklch(0.58 0.17 295)` | 二次アクセント |

#### Neutrals (Ink scale)
| Token | OKLCH | 用途 |
|---|---|---|
| `--ink-900` | `oklch(0.18 0.015 180)` | 本文テキスト |
| `--ink-700` | `oklch(0.32 0.02 180)` | 強調以外の文字 |
| `--ink-500` | `oklch(0.52 0.02 180)` | 補助テキスト |
| `--ink-400` | `oklch(0.65 0.018 180)` | プレースホルダ |
| `--ink-300` | `oklch(0.82 0.012 180)` | 区切り線、薄い枠 |
| `--ink-200` | `oklch(0.92 0.01 150)` | 背景区切り |
| `--ink-100` | `oklch(0.96 0.008 150)` | 最薄背景 |

#### Surfaces
| Token | 用途 |
|---|---|
| `--bg` | アプリ全体の背景（薄いミント白） |
| `--bg-elev` | カード、サイドバー、トップバー |
| `--bg-subtle` | サンクン要素 |
| `--bg-sunken` | 入れ子の凹み |
| `--border` / `--border-strong` | 区切り線 |

### Typography

```
--font-sans:    "Inter", "Noto Sans JP", -apple-system, "Hiragino Sans", "Yu Gothic UI", sans-serif
--font-display: "Space Grotesk", "Inter", sans-serif       /* 数字・見出し */
--font-mono:    "JetBrains Mono", "SF Mono", monospace
```

スケール: `--t-xs:11 / sm:13 / base:14 / md:16 / lg:18 / xl:22 / 2xl:28 / 3xl:36 / 4xl:48 / 5xl:64`

### Radius
`--radius-xs:6 / sm:10 / md:14 / lg:20 / xl:28 / full:9999`

### Shadows
`--shadow-xs / sm / md / lg / glow`（OKLCH の暗色を低アルファで重ねる軽量な影）

### Spacing
8px ベースのソフトな倍数。CSS は `gap`、`padding` をハードコードしているので、実装時は対象コードベースのスペーシングスケール（例：Tailwind の `space-*`）にマッピングしてください。

### Theme Variants
3つのバリアントを `body` クラスで切り替えています（Tweaks パネルで切替可）：

| Variant | body class | 説明 |
|---|---|---|
| Green Pro（デフォルト） | （なし） | 再エネ × プロフェッショナル |
| Solar Duo | `variant-solar-duo` | Duolingo風に明るく遊び心 |
| Tech Dark | `variant-tech-dark` | 未来的・高コントラスト（ダーク） |

オーバーライドは `FIP Academy.html` 末尾の `<style>` ブロック参照。本番ではテーマプロバイダ + CSS変数の差し替えで実装するのが推奨です。

---

## Screens / Views

### 1. Sidebar（共通：デスクトップ）

- **幅**: 260px、`position: sticky; top: 0; height: 100dvh`
- **背景**: `var(--bg-elev)`、右側 `1px solid var(--border)`
- **パディング**: `20px 14px`
- **構成**:
  1. **Brand**: 52×52px のロゴマーク（`linear-gradient(135deg, --grass 0%, --grid 100%)`、`border-radius: 14px`）+ 中に白い稲妻SVG（28×28、stroke 2.2px）。右に `FIP Academy`（Space Grotesk 700 / 20px）と `POWER · LEARNING`（10px / letter-spacing 0.14em / uppercase / `--ink-500`）
  2. **LEARN セクションラベル**: 11px / uppercase / `--ink-500`
  3. **ナビ項目** × 7: ホーム / 学習パス(24) / フラッシュカード / 用語クイズ(128) / クエスト / 制度フロー / 実績・進捗
  4. **ACCOUNT セクションラベル**
  5. **ナビ項目** × 2: お知らせ / 設定
  6. **ユーザーカード（最下部 sticky）**: アバター + 「鈴木 悠希 / 東京電力 / 研修中」
- **Nav item**:
  - パディング `10px 12px`、`gap: 12px`、`border-radius: --radius-sm`
  - アイコン 18px、ラベル 14px / 500
  - count バッジが右端（`--ink-100` 背景、11px、丸角ピル）
  - **active**: 左に 3px のグリーンアクセントバー（`::before`）、背景 `--grass-soft`、テキスト `--grass-deep`
  - **hover**: 背景 `--ink-100`

### 2. Topbar（共通）

- **高さ**: 64px、`position: sticky; top: 0`、背景 `--bg-elev/95` + `backdrop-filter: blur(12px)`
- **左**: パンくず、または現在のセクションタイトル
- **中央**: 検索ピル（プレースホルダ「用語・クイズを検索」、右端に `⌘K` バッジ）。トップバー幅に応じて段階的に縮小・非表示
- **右**: 連続日数バッジ（炎アイコン + 数字）、レベルバー（Lv.7 + プログレスバー）、XPバッジ（★ + 数字）、ユーザーアバター（円、グラデ）

### 3. Mobile Nav（モバイル <768px）

- 画面下部 fixed、5タブ（ホーム / 学習 / クイズ / クエスト / 進捗）
- アイコン + ラベル、active 時 `--grass`

### 4. Home Screen

レイアウト: 縦 1 カラム、`max-width: 1080px`、`gap: 28px`

#### a. ヒーローカード
- 高さ ~280px、`border-radius: --radius-xl`
- 背景: `radial-gradient` でハイライト + `linear-gradient(135deg, --grass-bright, --grass-deep)`
- **左**: バッジ「FIP制度・2026年度版」、見出し「再エネの未来を、ゲームで学ぶ。」（Space Grotesk 700 / 36-48px / 行間 1.05 / 白）、説明文（白の不透明度 0.85）、CTA × 2（「今日の学習を始める →」白背景・グリーン文字 / 「カリキュラムを見る」アウトライン白）
- **右**: `<HeroEnergyArt/>`（風車・太陽光パネル・送電線の幾何学SVGイラスト）。`max-width: 520px`、`scale(1.4)` で表示

#### b. 学習モード（4タイル）
- セクションタイトル「学習モード」+ サブ「あなたの習熟度に合わせて4つの学び方から選べます」
- 4列グリッド（モバイル時 2列）、`gap: 16px`
- 各タイル: 白背景、`border-radius: --radius-lg`、`padding: 20px`、ホバーで持ち上がる
- 内部: 48px の色付きアイコンチップ → 見出し → 説明 → 下部メタ（「24 レッスン →」など）
- 4種: **学習パス**（緑）/ **用語クイズ**（青）/ **実践クエスト**（ソーラー）/ **制度フロー**（バイオレット）

#### c. 統計カード（3カード）
- 「今週のXP」「正答率」「最強ストリーク」
- 大きな数字（Space Grotesk 700 / 36px）+ ラベル + ミニグラフ

#### d. 学習パス（Duolingo風）
- 「あなたの学習パス」見出し
- 縦スクロールの蛇行ノード列、サークル型ステップ（`done` / `current` / `locked`）
- 完了 = `--grass` 塗り + チェック / 現在 = グラデ + 脈動アニメ / ロック = `--ink-200` + 鍵
- ノード間は曲線または点線で接続

### 5. Quiz Screen（用語クイズ）

- 上部: 進捗バー（横長、グリーン充填）+ 残り問題数 + ライフ（♡×3）
- 中央カード: 質問文（22-28px）
- 4つの選択肢ボタン: フル幅、左にアイコン枠、右にテキスト
  - **Duolingo風ボタン**: 上面と「底面（2-4px下にずれた濃い色の影）」で立体感
  - 選択時: 枠が `--grass`、背景が `--grass-soft`
  - 正解 / 不正解後: 緑 / 赤の塗り潰し + 解説パネル
- 下部: 「確認する」CTA（無効時グレー、選択時グリーン）

### 6. Flashcard Screen

- 中央配置、最大幅 640px
- カード: 白、`border-radius: --radius-xl`、`shadow-md`、`min-height: 360px`
- 表: 用語（Space Grotesk 700 / 36px）+ ヒント
- 裏: 定義 + 例文 + 関連用語チップ
- 下部: ←前 / フリップ / 次→ ボタン、「覚えた / 復習 / もう一度」のレーティング

### 7. Progress Screen（実績・進捗）

- 上段3カード:
  - **ドーナツチャート**: カテゴリ別習熟度（SVG circle stroke-dasharray）
  - **週間アクティビティ**: 7日 × 縦バー
  - **分野別スキル**: 横バー × 6（基礎/市場/価格決定/リスク/制度/実務）
- 下段: バッジグリッド（6-8個、エネルギー系アイコン）
  - 取得済み: フルカラー、未取得: グレースケール + ロックアイコン

---

## Interactions & Behavior

- **ナビゲーション**: サイドバー / モバイルナビどちらも `setScreen(key)` で SPA 切替。ルーティングは React Router 等に置き換え
- **クイズ**: 選択 → 確認 → 結果表示（解説）→ 次へ。間違えるとライフ -1
- **フラッシュカード**: クリックで flip（CSS `transform: rotateY(180deg)` + `transform-style: preserve-3d`）
- **ホバー**: `transform: translateY(-2px)` + `shadow-md` への昇格、`transition: 180ms ease`
- **学習パスノード current**: `@keyframes pulse` で `box-shadow` を脈動（1.4-1.8s）
- **トップバー**: スクロール時に `box-shadow` 出現（コンテナクエリ or `IntersectionObserver`）
- **モバイル**: <768px でサイドバー → モバイルナビ、グリッドは2列に
- **検索ピル**: コンテナ幅 < threshold で段階的にアイコンのみへ縮小

---

## State Management

最小構成：
- `currentScreen`: 表示中の画面キー
- `tweaks`: { variant, theme, screen } — 永続化先 `localStorage("fip_tweaks")`
- 各画面ローカル: クイズの選択 / 結果、フラッシュカードの flip / index、フィルタ等

実アプリでは追加で：
- ユーザープロフィール（XP、レベル、ストリーク、取得バッジ）
- レッスン進捗（lessonId → completed/current/locked）
- 用語マスター（用語ID、定義、例、習熟度）

→ **Zustand / Pinia / Riverpod** など軽量ストアで十分。サーバ同期が必要なら React Query / SWR + REST/GraphQL を推奨。

---

## Tweaks Panel（開発時のみ）

このプロトタイプには `Tweaks` パネル（右下フローティング）があり、3つのバリアントと画面を切り替えられます。本番アプリでは不要。**ただしダークモード切替（Tech Dark）は実装に組み込む価値あり**。

`/*EDITMODE-BEGIN*/` … `/*EDITMODE-END*/` のマーカーは Genie 環境専用なので削除してください。

---

## Assets

- **アイコン**: `components/icons.jsx` に全アイコンを `stroke-based` SVG コンポーネントとして定義（Lucide風）。本番では Lucide React / Heroicons / 自前 SVG スプライトに置き換え可
- **イラスト**: `components/illustrations.jsx` の `<HeroEnergyArt/>` は風車 + 太陽光パネル + 送電線の幾何学SVG。本番ではこれをベースに同等のオリジナルSVGを作成
- **フォント**: Google Fonts から Inter / Noto Sans JP / Space Grotesk / JetBrains Mono。商用利用可（OFL）
- **画像**: 写真素材は使っていません

---

## Files

```
design_handoff_fip_academy/
├── README.md                      ← この文書
├── FIP Academy.html               ← エントリーポイント、ルーティング、Tweaks
├── styles.css                     ← デザインシステム + 全コンポーネントCSS
└── components/
    ├── icons.jsx                  ← 全アイコン（SVG コンポーネント）
    ├── illustrations.jsx          ← ヒーローイラスト等
    ├── shell.jsx                  ← Sidebar / Topbar / MobileNav
    └── screens.jsx                ← Home / Quiz / Flashcard / Progress
```

---

## 実装の進め方（推奨）

1. まず `styles.css` の `:root` をプロジェクトのトークンシステムに移植（Tailwind config / CSS変数 / Theme Provider）
2. `shell.jsx` のレイアウトを実装（Sidebar / Topbar / MobileNav）
3. Home → Quiz → Flashcard → Progress の順で画面実装
4. アイコンとイラストは Lucide / Heroicons + オリジナル SVG に置き換え
5. ダミーデータをサーバ API / 実データに接続
6. 本番では Tweaks パネルを削除

---

## ライセンス・注意

- フォント、アイコンの参考実装は OFL / MIT / 自作。本番採用時は各ライブラリのライセンスを確認
- OKLCH 色空間: 主要モダンブラウザ対応済み（Safari 15.4+, Chrome 111+）。古い環境では `@supports` フォールバックを
- 日本語の改行は `text-wrap: pretty` を使用。長い見出しは BudouX で文節区切りを推奨

不明点があれば、`FIP Academy.html` をブラウザで開けばすぐに動くインタラクティブなリファレンスとして確認できます。
