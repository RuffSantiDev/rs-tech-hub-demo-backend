import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ThrottlerModule } from "@nestjs/throttler";
import { ServiceFacilitatorModule } from "@rs-tech-hub/nestjs-service-operation";
import { TestStarterModule } from "@rs-tech-hub/nestjs-test-starter";

@Module({
  imports: [
    TestStarterModule,
    ServiceFacilitatorModule,

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
  ],
})
export class AppModule implements NestModule {
  configure() {
    // No middleware configured yet
  }
}
