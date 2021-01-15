import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot('mongodb://root:admin@localhost:27017/products-nest?authSource=admin',
    { useNewUrlParser: true, useFindAndModify: false },
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
