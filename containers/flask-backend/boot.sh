#!/bin/sh
. venv/bin/activate

## DBコンテナが完成し、flask migrationが完了する(DBとテーブルができる)までリトライを繰り返す
while true; do
    venv/bin/flask deploy
    result=$?
    if [ $result = "0" ]; then 
        break
    fi
    echo 'DBの作成に失敗しました。5秒後に再試行します。'
    sleep 5
done

## アプリケーションの起動。こちらでもリトライしているが、しっかりとした理由はない
while true; do
    venv/bin/gunicorn --bind=0.0.0.0:5000 kilnwiki:app
    result=$?
    if [ $result = "0" ]; then
        break
    fi
    echo 'アプリケーションの開始に失敗しました。5秒後に再試行します。'
    sleep 5
done