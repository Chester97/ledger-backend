import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoicesController } from './invoices/invoices.controller';
import { InvoicesService } from './invoices/invoices.service';
import { InvoicesModule } from './invoices/invoices.module';
import { BodyMiddleware } from './invoices/body.middleware';

@Module({
  imports: [InvoicesModule],
  controllers: [AppController, InvoicesController],
  providers: [AppService, InvoicesService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BodyMiddleware).forRoutes('invoices/add');
  }
}
