import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ThrottlerModule } from "@nestjs/throttler";
import { AccountStarterModule } from "@rs-tech-hub/nestjs-account-starter";
import {
  JwtGlobalModule,
  PassportGlobalModule,
} from "@rs-tech-hub/nestjs-auth-core";
import {
  AuthStarterModule,
  AuthStarterSchedulerModule,
} from "@rs-tech-hub/nestjs-auth-starter";
import { ProfileModule } from "@rs-tech-hub/nestjs-profile";
import { ServiceFacilitatorModule } from "@rs-tech-hub/nestjs-service-operation";
import { TestStarterModule } from "@rs-tech-hub/nestjs-test-starter";
import { UserModule } from "@rs-tech-hub/nestjs-user";

@Module({
  imports: [
    TestStarterModule,
    ServiceFacilitatorModule,
    AuthStarterSchedulerModule,
    PassportGlobalModule,
    JwtGlobalModule,
    ConfigModule.forRoot({
      // load .env, etc.
      isGlobal: true, // optional, so you can use ConfigService in any module
      envFilePath: ".env",
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        const isProduction = process.env.NODE_ENV === "production";
        return {
          autoSchemaFile: true,
          playground: !isProduction,
          introspection: true,
        };
      },
    }),

    UserModule,
    AuthStarterModule,
    AccountStarterModule,
    ProfileModule,
  ],
})
export class AppModule implements NestModule {
  configure() {
    // No middleware configured yet
  }
}
