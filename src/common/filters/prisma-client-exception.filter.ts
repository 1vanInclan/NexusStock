import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError) // Solo atrapa errores de Prisma
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002': { // Error de valor único duplicado (SKU, Name)
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: `Ya existe un registro con ese valor único.`,
        });
        break;
      }
      case 'P2025': { // Registro no encontrado
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: 'Registro no encontrado.',
        });
        break;
      }
      case 'P2003': { // Error de llave foránea (Integridad)
        const status = HttpStatus.BAD_REQUEST;
        response.status(status).json({
          statusCode: status,
          message: 'No se puede realizar la acción por una restricción de relación (FK).',
        });
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}