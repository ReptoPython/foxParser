import { IsNumber, IsString } from "class-validator";


export class ParserRequest {
  @IsString({ each: true })
  links: string[];

  @IsNumber()
  pageNumbers: number;

  @IsString()
  fileName: string;
}