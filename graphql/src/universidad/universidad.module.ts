import { Module } from "@nestjs/common";
import { UniversidadController } from "./universidad.controller";
import { UniversidadService } from "./universidad.service";
import { UniversidadResolver } from "./universidad.resolver";



@Module({
    imports: [],
    controllers: [UniversidadController],
    providers: [UniversidadService, UniversidadResolver],
})

export class UniversidadModule { }