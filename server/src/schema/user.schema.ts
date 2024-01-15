import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IMovie } from 'src/interface/user.interface';

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  movieList: IMovie[];
}

export const UserSchema = SchemaFactory.createForClass(User);
