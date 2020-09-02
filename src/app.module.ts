import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductModule } from './product/product.module';
@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: './schema/schema.gql',
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const auth = `${configService.get<string>(
          'DB_ROOT_USER',
        )}:${configService.get<string>('DB_ROOT_PASS')}`;
        const host = `${configService.get<string>(
          'DB_HOST',
        )}:${configService.get<string>('DB_PORT')}`;
        // const db = configService.get<string>('DB_NAME');
        const uri = `mongodb://${auth}@${host}`;

        return {
          uri,
          // 连接字符串格式必须是mongodb：// user：password @ host：port / db
          // 默認為 true
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
