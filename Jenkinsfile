pipeline {
    agent any
    environment {
        ali_url = "registry.cn-shenzhen.aliyuncs.com"
        ali_project_name = "vk-25"
        ali_credentialsId = "2bbf117e-0bfd-406d-95e1-9d9d593474c7"
        git_auth_id = "2b317317-386b-4924-90e3-b3c78eb83c4d"
    }

    tools {
        nodejs 'node22.2'
    }

    stages {
        stage('Check Node.js') {
            steps {
                script {
                    // 打印 Node.js 版本
                    sh 'node -v'
                    // 打印 npm 版本
                    sh 'npm -v'
                }
            }
        }

       stage('Install Specific Yarn Version') {
            steps {
                script {
                    // 确保安装 1.22.22 版本的 Yarn
                    sh 'npm install -g yarn@1.22.22'
                }
            }
        }

        stage('构建并部署服务') {
            steps {
                script {

                    // 服务名称@访问端口 admin-ui |  ui | wemedia-ui
                    if (!server_name || server_name.trim().isEmpty()) {
                        error "server_name 不能为空"
                    }

                    def service = "vast-knowledge-${server_name}"

                    git credentialsId: git_auth_id, url: "https://gitee.com/tsitsiharry/${service}.git"

                    def tag = env.BUILD_NUMBER

                    // yarn打包
                    sh "yarn build"

                    // Containerd构建镜像
                    def full_image_name = "${ali_url}/${ali_project_name}/${service}:${tag}"
                    sh """
                        echo "开始构建镜像: ${full_image_name}"
                        ctr image rm ${full_image_name} || true
                        ctr image build -t ${full_image_name} \
                            --build-arg JAR_FILE=target/*.jar \
                            -f Dockerfile .
                    """

                    // 推送镜像
                    withCredentials([usernamePassword(
                        credentialsId: ali_credentialsId,
                        usernameVariable: 'USERNAME',
                        passwordVariable: 'PASSWORD')]) {
                        sh """
                            ctr images rm \$(ctr images ls | grep ${ali_url} | awk '{print \$1}')
                            ctr images pull --user \$USERNAME:\$PASSWORD ${full_image_name}
                            ctr images push ${full_image_name} --skip-verify
                        """
                    }

                  sh """
                      sed -i 's#\${IMAGE_TAG}#${tag}#' './deploy.yml'
                  """

                  kubernetesDeploy(
                      configs: "./deploy.yml",
                      kubeconfigId: "${k8s_auth}"
                  )

                }
            }
        }

    }

    post {
        always {
            // 清理containerd镜像
            sh 'ctr images ls -q | xargs -I{} ctr images rm {} || true'
        }

        success {
            slackSend color: 'good', message: "部署成功: ${env.JOB_NAME} [${env.BUILD_NUMBER}]"
        }

        failure {
            slackSend color: 'danger', message: "部署失败: ${env.JOB_NAME} [${env.BUILD_NUMBER}]"
        }
    }
}
