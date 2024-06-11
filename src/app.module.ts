import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EmblemsModule } from './emblems/emblems.module';
import { UserModule } from './user/user.module';
import { JwtMiddleware } from './middleware/middleware.service';

@Module({
  imports: [EmblemsModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
