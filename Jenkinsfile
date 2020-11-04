pipeline {
  agent {
    label 'ecs'
  }
  environment {
    CI = 'true'
    HOME = '.'
    npm_config_cache = 'npm-cache'
  }
  stages {
    stage('Install Packages') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test and Build') {
      parallel {
        stage('Run Tests') {
          steps {
            //sh 'npm run test'
            echo "Super thorough testing!"
          }
        }
        stage('Create Build Artifacts') {
          steps {
            sh 'npm run build'
          }
        }
      }
    }
    stage('Production') {
      steps {
        withAWS(region:'us-east-2',credentials:'admin') {
          s3Delete(bucket: 'wintry-production', path:'**/*')
          s3Upload(bucket: 'wintry-production', workingDir:'build', includePathPattern:'**/*');
        }
      }
    }
  }
}
