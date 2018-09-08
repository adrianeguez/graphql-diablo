import { Logger } from '@nestjs/common';
import * as winston from 'winston';
export class ManticoreLoggerService extends Logger {

    private readonly winstonLogger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log` 
            // - Write all logs error (and below) to `error.log`.
            //
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
            new winston.transports.File({ filename: 'info.log', level: 'info' }),
            new winston.transports.File({ filename: 'verbose.log', level: 'verbose' }),
            new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
            new winston.transports.File({ filename: 'silly.log', level: 'silly' }),
        ]
    });



    log(message: string, trace: string) {
        this.winstonLogger.log({
            level: 'info',
            message: `Mensaje: ${message} \n Trace:${trace}`
        });
        super.log(message, trace);
    }
    warn(message: string, trace: string) {
        this.winstonLogger.log({
            level: 'warn',
            message: `Mensaje: ${message} \n Trace:${trace}`
        });
        super.warn(message, trace);
    }
    error(message: string, trace: string) {
        this.winstonLogger.log({
            level: 'error',
            message: `Mensaje: ${message} \n Trace:${trace}`
        });
        super.error(message, trace);
    }
}