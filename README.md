# cheat_day_master

# チートデイマスター

### サービス概要

ダイエット中のチートデイの時に
食事のルートや食に関する情報を提供することで
気持ちよく食事を楽しんでもらうサービス

### メインのターゲット

チートデイと割り切れずに食べすぎることに対して罪悪感を覚えてしまう人たち

### ユーザーの抱える問題

ダイエットを頑張る中でチートデイで食べすぎてしまうことに罪悪感を感じて目の前の食事を楽しめない

### 解決方法

- 罪悪感を減らす
  - 表示されるカロリーをすべて０キロカロリーにする
  - 徒歩で消費されるカロリーを記載する
- 食欲を刺激する
  - 周辺の飲食店を含むルートを表示する
  - 食に関する情報を様々な手段で提供する

### 実装予定の機能

- ユーザー（ログインなし）
  - 外食する場合
    - 地図上で現在地と行きたい店舗を指定
    - 行きたいお店までのルートプラスおすすめの店舗（ジャンル別の 4 店舗ほどを想定）をつないだルートを表示させる
    - 徒歩での総移動時間から計算した消費カロリーの算出
    - 周辺の飲食店 UberEats，スーパー，通販サイトのレコメンドを表示する
    - レコメンドされた食べ物のジャンルによってカロリー０である理由を変更する
  - 自宅で食べたい場合
    - 現在地を指定
    - UberEats，通販サイト、テイクアウトのレコメンドを表示
    - レコメンドされた食べ物のジャンルによってカロリー０である理由を変更する
- ログインユーザー（本番リリース後）
  - 気になったお店（飲食店、スーパー）と食べ物（UberEats,通販サイト）を保存する機能

### なぜこのサービスを作りたいのか？

自分自身がダイエット中でチートデイを設定しても、いままで頑張った食事制限や運動が水の泡になると思い実行できないことがあった。
そんな時にカロリーが０なので食べましょうという馬鹿げたことを言ったり、執拗に食べ物をおすすめしてくるアプリがあれば今日は何も気にせず食べようという気持ちになると思いこのサービスを作りたいと思った。

### スケジュール

- README 作成： 3/20 〆切
- 画面遷移図＆ER 図作成： 3/28 〆切
- メイン機能実装： 4/29 〆切
- β 版を RUNTEQ 内リリース（MVP）： 4/29 〆切
- 本番リリース： 5/22 〆切

### 画面遷移図

https://www.figma.com/file/inSsQE78Xi9HSZgu9045Bk/CheatDayMaster?node-id=0%3A1

### ER 図

https://drive.google.com/file/d/1PRnnQv8_cSyaJ0Yy8K6q89Ojf3PUZao4/view?usp=sharing

### 環境構築手順

- バージョン
  - Ruby 3.1.1
  - Ruby on Rails 6.1.5
- コマンド

```
$ git clone https://github.com/ky0613/cheat_day_master.git
$ rbenv install 3.1.1
$ rbenv local 3.1.1
$ bundle install
$ yarn
```
