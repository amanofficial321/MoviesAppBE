import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MoviesModule, ServeStaticModule.forRoot({
    rootPath: 'uploads',
    serveRoot: '/uploads',
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
