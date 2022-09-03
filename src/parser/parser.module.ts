import { Module } from '@nestjs/common';
import { ParserController } from './parser.controller';
import { ParserService } from './parser.service';
import { FoxtrotParse } from "./entity/foxtrot-parse.entity";

@Module({
  imports:[FoxtrotParse],
  controllers: [ParserController],
  providers: [ParserService],
})
export class ParserModule {}
