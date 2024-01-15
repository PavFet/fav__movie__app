import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { IUser, IMovie } from 'src/interface/user.interface';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<IUser>) {}

  async register(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.UserModel(createUserDto);
    return newUser.save();
  }

  async login(username: string): Promise<IUser> {
    const user = await this.UserModel.findOne({ username });
    return user;
  }

  async userExist(username: string): Promise<boolean> {
    const user = await this.UserModel.findOne({ username });
    return !!user;
  }

  async addFavoriteMovie(
    userId: string,
    movieData: Array<IMovie>,
  ): Promise<IUser> {
    const updatedUser = await this.UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { movieList: { $each: [movieData] } } },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return updatedUser;
  }

  async getUser(UserId: string): Promise<IUser> {
    const existingUser = await this.UserModel.findById(UserId).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return existingUser;
  }

  async deleteMovie(userId: string, movieTitle: string): Promise<IUser> {
    const updatedUser = await this.UserModel.findByIdAndUpdate(
      userId,
      { $pull: { movieList: { Title: movieTitle } } },
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException(`Movie #${movieTitle} not found`);
    }
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const updatedUser = await this.UserModel.findByIdAndDelete(userId);
    if (!updatedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
  }
}
