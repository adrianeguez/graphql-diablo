import { Module } from '@nestjs/common';
import { ManticoreLoggerService } from './logger.service';


@Module({
    providers: [ManticoreLoggerService],
    exports: [ManticoreLoggerService],
})
export class LoggerModule { };