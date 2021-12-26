class DevelopmentConfig{
    static flask_host = process.env.REACT_APP_FLASK_HOST;
    static flask_port = 5000;
    static flask_url = `http://${this.flask_host}:${this.flask_port}`
}

class DockerContainerConfig{
    static flask_host = window.location.hostname;
    static flask_port = 80;
    static flask_url = `http://${this.flask_host}:${this.flask_port}`
}

export const config_dict = {
    'development': DevelopmentConfig,
    'docker-container': DockerContainerConfig,
}