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
import { LinksModule } from './links/links.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';
import { ResponsesModule } from './responses/responses.module';
import { ChatModule } from './chat/chat.module';
import { User } from './users/users.entity';
import { Category } from './categories/categories.entity';
import { Collaboration } from './collaborations/collaborations.entity';
import { Link } from './links/links.entity';
import { Message } from './messages/messages.entity';
import { Network } from './networks/networks.entity';
import { Response } from './responses/responses.entity';
import { Role } from './roles/roles.entity';
import { Room } from './rooms/rooms.entity';
import { Rule } from './rules/rules.entity';
import { Subscription } from './subscriptions/subscriptions.entity';
import { UsersService } from './users/users.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      entities: [
        User,
        Category,
        Collaboration,
        Link,
        Message,
        Network,
        Response,
        Role,
        Room,
        Rule,
        Subscription,
      ],
      synchronize: true,
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
    LinksModule,
    RoomsModule,
    MessagesModule,
    ResponsesModule,
    ChatModule,
    AdminModule,
  ],
})
export class AppModule {
  constructor(
    private rulesService: RulesService,
    private rolesService: RolesService,
    private subscriptionService: SubscriptionsService,
    private categoriesService: CategoriesService,
    private networksService: NetworksService,
    private usersService: UsersService,
  ) {}

  async onModuleInit() {
    await this.rulesService.init();
    await this.rolesService.init();
    await this.subscriptionService.init();
    await this.categoriesService.init();
    await this.networksService.init();
    await this.usersService.init();
  }
}
