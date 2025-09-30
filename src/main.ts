import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // CORS configuration
  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Task Management API")
    .setDescription(
      "API REST para gestión de tareas con autenticación por API Key"
    )
    .setVersion("1.0")
    .addApiKey(
      {
        type: "apiKey",
        name: "x-api-key",
        in: "header",
        description: "API Key para autenticación",
      },
      "api-key"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  // console.log(`🚀 Application is running on: http://localhost:${port}`);
  // console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
