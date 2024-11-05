# webpro_06
## このプログララムについて
## ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
views/jyanken.ejs | じゃんけんのテンプレートファイル

```javascript
console.log( 'Hello' );
```
## 実行方法
1. app5.js を起動する
1. Webブラウザでlocalhost:8080/public/janken.htmlにアクセスする
1. 自分の手を入力する

## 1.フローチャート
```mermaid
flowchart TD;
開始 --> 終了;
```
## 2.フローチャート

```mermaid 
flowchart TD;

start["開始"];
end1["終了"]
if{"条件に合うか"}
win["勝ち"]
loose["負け"]

start --> if
if -->|yes| win
win --> end1
if -->|no| loose
loose --> end1
```