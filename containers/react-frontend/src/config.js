/**
 * 設定値を定義するためのクラス群。HTTPリクエストに利用する、flaskのURLなど。
 * 環境変数REACT_APP_CONFIG_NAMEの値がdevelopmentであればDevelopmentConfigが採用される
 * 注：REACT_APP_CONFIG_NAMEは nginx 上で動いているときではなく、build時のホストで定義されている必要がある
 */

class DevelopmentConfig{
    static flask_host = window.location.hostname;
    static flask_port = 5000;
    static flask_url = `http://${this.flask_host}:${this.flask_port}`
}

class DockerContainerConfig{
    // window.location.host は 現ページのURLゆえ、flask_hostは正確には nginxコンテナのホスト名＆ポートと同値になる
    static flask_host = window.location.host;
    static flask_url = `http://${this.flask_host}`
}

export const config_dict = {
    'development': DevelopmentConfig,
    'docker-container': DockerContainerConfig,
}