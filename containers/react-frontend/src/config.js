class DevelopmentConfig{
    static flask_host = window.location.hostname;
    static flask_port = 5000;
    static flask_url = `http://${this.flask_host}:${this.flask_port}`
}

class DockerContainerConfig{
    // window.location.host は 現ページのURLなので このflask_hostは正確には nginxコンテナを指す。
    static flask_host = window.location.host;
    static flask_url = `http://${this.flask_host}`
}

export const config_dict = {
    'development': DevelopmentConfig,
    'docker-container': DockerContainerConfig,
}