import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { NetworksModule } from './networks/networks.module';
import { RolesModule } from './roles/roles.module';
import { RulesModule } from './rules/rules.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: { rejectUnauthorized: false },
      synchronize: process.env.NODE_ENV === 'development',
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    NetworksModule,
    RolesModule,
    RulesModule,
  ],
})
export class AppModule {}
