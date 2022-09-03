import { Body, Controller, Get, Post } from "@nestjs/common";
import { ParserService } from './parser.service';
import { ParserRequest } from "./dto/parser.request";

@Controller()
export class ParserController {
  constructor(private parserService: ParserService) {}

  @Get('parse')
  async getParse(@Body() request: ParserRequest):Promise<any> {
  return this.parserService.getParse(request);
  }
}
