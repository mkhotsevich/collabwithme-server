import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { NetworksModule } from './networks/networks.module';
import { RolesModule } from './roles/roles.module';
import { RulesModule } from './rules/rules.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { RulesService } from './rules/rules.service';
import { RolesService } from './roles/roles.service';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { CollaborationsModule } from './collaborations/collaborations.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesService } from './categories/categories.service';
import { NetworksService } from './networks/networks.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: { rejectUnauthorized: false },
      // synchronize: process.env.NODE_ENV === 'development',
      autoLoadEntities: true,
    }),
    UsersModule,
    CategoriesModule,
    NetworksModule,
    RulesModule,
    RolesModule,
    SubscriptionsModule,
    CollaborationsModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(
    private rulesService: RulesService,
    private rolesService: RolesService,
    private subscriptionService: SubscriptionsService,
    private categoriesService: CategoriesService,
    private networksService: NetworksService,
  ) {}

  async onModuleInit() {
    await this.rulesService.init();
    await this.rolesService.init();
    await this.subscriptionService.init();
    await this.categoriesService.init();
    await this.networksService.init();
  }
}
