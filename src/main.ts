import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Nexus Stock API')
    .setDescription('Sistema de gestión de inventarios y control de stock')
    .setVersion('1.0')
    .addTag('products')
    .addTag('categories')
    .addTag('inventory')
    .build();
  
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
