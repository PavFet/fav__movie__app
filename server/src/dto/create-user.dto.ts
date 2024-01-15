import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IMovie } from 'src/interface/user.interface';
export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;
  @IsString()
  @IsNotEmpty()
  readonly password: string;
  @IsArray()
  readonly movieList: IMovie[];
}
