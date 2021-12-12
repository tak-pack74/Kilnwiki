#!/bin/sh
. venv/bin/activate

while true; do
    venv/bin/flask deploy
    result=$?
    if [ $result = "0" ]; then 
        break
    fi
    echo 'DBの作成に失敗しました。5秒後に再試行します。'
    sleep 5
done

while true; do
    venv/bin/flask run --host=0.0.0.0
    result=$?
    if [ $result = "0" ]; then
        break
    fi
    echo 'アプリケーションの開始に失敗しました。5秒後に再試行します。'
    sleep 5
done
