pipeline {
    agent any
    environment {
        ali_url = "registry.cn-shenzhen.aliyuncs.com"
        ali_project_name = "vk-25"
        ali_credentialsId = "2bbf117e-0bfd-406d-95e1-9d9d593474c7"
        git_auth_id = "2b317317-386b-4924-90e3-b3c78eb83c4d"
        k8s_auth="9b8dc7ae-5f04-4172-b148-e7822e397c6a"
    }

    tools {
        nodejs 'node22.2'
        dockerTool 'docker:stable'

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

                    echo "开始拉取:${service}"

                    git credentialsId: git_auth_id, url: "https://gitee.com/tsitsiharry/${service}.git"

                    def tag = env.BUILD_NUMBER



                    // yarn打包
                    sh "yarn install --frozen-lockfile "
                    sh "yarn build"

                    def imageName = "${service}:${tag}"
                    def pushImage = "${ali_url}/${ali_project_name}/${imageName}"

                    echo "处理image:${imageName}"
                    echo "push 路径检查:${pushImage}"
     
                    sh "pwd"


                    sh """
                        echo "图像开始构建"
                        # 构建新镜像
                        nerdctl --namespace=k8s.io build --no-cache -t ${imageName} -f Dockerfile . 
                         echo "图像构建完成。"
                    """

                    // 打标签
                    sh "echo '标记图像： ${imageName} with ${pushImage}'"
                    sh "nerdctl --namespace=k8s.io tag ${imageName} ${pushImage}"
                    echo "标记完成： ${imageName} -> ${pushImage}"

                    // 登录到阿里云 Registry
                    withCredentials([usernamePassword(credentialsId: ali_credentialsId, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh '''
                            echo "$DOCKER_PASSWORD" | nerdctl login -u=$DOCKER_USERNAME --password-stdin registry.cn-shenzhen.aliyuncs.com
                        '''
                    }

                    echo "Login to Aliyun registry successful."

                    // 推送镜像
                    echo "推送镜像: ${pushImage}"
                    sh "nerdctl --namespace=k8s.io push ${pushImage}"
                    echo "推送完成: ${pushImage}"


                    // 删除本地镜像
                    sh "echo '删除本地镜像: ${imageName} and ${pushImage}'"
                    sh "nerdctl --namespace=k8s.io rmi -f ${imageName} ${pushImage}"
                    sh "echo '删除本地镜像完成'"


                    sh """
                        echo "使用新的图像标签更新 deploy.yml: ${tag}"
                        sed -i 's#\${IMAGE_TAG}#${tag}#' 'deploy.yaml'
                        echo "deploy.yml 使用新标签更新: ${tag}"

                    """
                    
                    
                   sh "kubectl apply -f deploy.yaml"


                }
            }
        }

    }

    post {
        always {
                // 清理 containerd 镜像
            sh 'nerdctl --namespace=k8s.io image prune -f'  // 清理无用的 containerd 镜像
        }

        success {
            echo "部署成功: ${env.JOB_NAME} [${env.BUILD_NUMBER}]"
        }

        failure {
            echo "部署失败: ${env.JOB_NAME} [${env.BUILD_NUMBER}]"
        }
    }
}
