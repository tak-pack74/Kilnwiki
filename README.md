# kilnwiki
ReactとFlaskの学習用に作成したゴミです。

![kilnwiki_capture1](https://user-images.githubusercontent.com/47418442/147879785-3758007d-c624-4639-af93-8a04ecbcee1d.png)
![kilnwiki_capture2](https://user-images.githubusercontent.com/47418442/147879761-c09890bf-e211-4782-9cf9-7e74fda291fc.png)


## できること

- Markdownで編集した記事を投稿することができます。
- 記事にはタグをつけることができ、検索に利用できます。
- コンテナイメージが公開されており、docker-composeとEKSでのデプロイができます

## できないこと

- 画像アップロードができません
- ユーザ認証機能もありません。

## Overview
![image](https://user-images.githubusercontent.com/47418442/147878995-a4f51c8f-8b43-45a1-b963-36687502992f.png)



## デプロイ
### docker-composeで

```
curl \
-O https://raw.githubusercontent.com/yamada-tak07/kilnwiki/v1.1/deploy_docker-compose/.env_sample \
-O https://raw.githubusercontent.com/yamada-tak07/kilnwiki/v1.1/deploy_docker-compose/docker-compose.yml

# MYSQLのユーザ名とパスワード用の環境変数を記入 
vi .env_sample

# リネーム
mv .env_sample .env

# 作成
docker-compose up
```

### EKS上で
```
kubectl create namespace kilnwiki
kubectl create secret generic -n kilnwiki --from-literal=mysql_user_name=<YOUR_MYSQL_USERNAME> --from-literal=mysql_password=<YOUR_MYSQL_PASSWORD> mysql-auth
kubectl apply --kustomize=https://raw.githubusercontent.com/yamada-tak07/kilnwiki/v1.1/deploy_eks/kustomization.yaml
```

## 参考にした情報

### Webページ

- [React公式 getting started](https://ja.reactjs.org/docs/getting-started.html)
- [Connecting a React Frontend to a Flask backend.](https://dev.to/dev_elie/connecting-a-react-frontend-to-a-flask-backend-h1o)

### 書籍

- [Kubernetes完全ガイド 第2版 impress top gearシリーズ](https://www.amazon.co.jp/gp/product/B08FZX8PYW)<br> 神本
- [Flask Web Development: Developing Web Applications with Python](https://www.amazon.co.jp/gp/product/B07B8DCCN7)
