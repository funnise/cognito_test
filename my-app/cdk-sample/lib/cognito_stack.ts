import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { CfnOutput, RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';

export class CognitoStack extends Stack {

    private readonly removalPolicy: RemovalPolicy;
    public readonly userPool: cognito.CfnUserPool;
    public readonly  userPoolClient: cognito.CfnUserPoolClient;

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        // Envファイルにて環境を設定しておくと便利です
        //this.removalPolicy = props.stackEnv == Env.STAGE ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY
        /*
        // cfnUserPoolの作成
        this.userPool = new cognito.CfnUserPool(this, 'my-user-pool', {
            userPoolName: `test-user-pool`,
            adminCreateUserConfig: {
                allowAdminCreateUserOnly: true,
                // サインインしていない新しいアカウントが使用できなくなるまでのユーザーアカウントの有効期限
                unusedAccountValidityDays: 30
            },
            // 今回はサンプルの為OFFで設定していますが、セキュリティ要件に応じて適切に設定してください
            mfaConfiguration: 'OFF',
            // User名の大文字、小文字を区別するように変更
            usernameConfiguration: {
                caseSensitive: true
            },
            policies: {
                passwordPolicy: {
                    // 設定するパスワードのポリシーの設定
                    minimumLength: 10,
                    requireNumbers: true,
                    requireSymbols: false
                }
            },
            // アカウント復旧の設定
            accountRecoverySetting: {
                recoveryMechanisms: [{
                    // 管理者のみが復旧できるように設定
                    name: 'admin_only',
                    priority: 1
                }]
            },
        });
        // リソースのアップデートタイミングで前のバージョンを残すように設定
        this.userPool.applyRemovalPolicy(this.removalPolicy);

        // cfnUserPoolClientの作成
        /*this.userPoolClient = new cognito.CfnUserPoolClient(this, 'my-user-pool-client', {
            // 上記で作成したUserPoolと連携
            userPoolId: this.userPool.ref,
            clientName: `my-user-pool-client`,
            generateSecret: false,
            // OAuth プロトコルの設定(OAuthを用いた認証を許可しない)
            allowedOAuthFlowsUserPoolClient: false,
            // 認証フローについての設定
            explicitAuthFlows: ['ALLOW_ADMIN_USER_PASSWORD_AUTH', 'ALLOW_USER_PASSWORD_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH'],
            // ユーザーの存在に関連するエラー設定
            preventUserExistenceErrors: 'ENABLED',
            // 各トークンの時間制限設定
            accessTokenValidity: 10,
            refreshTokenValidity: 20,
            idTokenValidity: 10,
            tokenValidityUnits: {
                accessToken: 'minutes',
                refreshToken: 'minutes',
                idToken: 'minutes'
            },
            // カスタム属性の設定
            readAttributes: ['name'],
            writeAttributes: ['name'],
        });
        this.userPoolClient.applyRemovalPolicy(this.removalPolicy);

        // 外部参照させたいパラメータをエクスポートする設定
        new CfnOutput(this, 'userPoolArnOutput', {
            value: this.userPool.attrArn,
            exportName: `${props.stackEnv}UserPoolArn`,
        });
        */
        const userPool = new cognito.UserPool(this, "userpool", {
          userPoolName: "sample-user-pool",
          selfSignUpEnabled: true,
          signInAliases: {
            email: true,
          },
          accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
        });
        
        // User Pool Client
        const userPoolClient = new cognito.UserPoolClient(this, "userpool-client", {
          userPool,
          authFlows: {
            adminUserPassword: true,
            custom: true,
            userSrp: true,
          },
          supportedIdentityProviders: [
            cognito.UserPoolClientIdentityProvider.COGNITO,
          ],
        });
}
}
