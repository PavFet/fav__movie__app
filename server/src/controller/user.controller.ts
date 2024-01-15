import {
  Body,
  Delete,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from 'src/service/user.service';
import * as bcrypt from 'bcrypt';
import { IMovie, LoginUser } from 'src/interface/user.interface';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

      const userExists = await this.userService.userExist(
        createUserDto.username,
      );

      if (userExists) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'User with the same name already exist',
          error: 'Bad request',
        });
      } else {
        const newUser = await this.userService.register({
          username: createUserDto.username,
          password: hashedPassword,
          movieList: createUserDto.movieList,
        });
        return response.status(HttpStatus.CREATED).json({
          message: 'User has been created successfully',
          newUser: newUser,
        });
      }
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }
  @Post('login')
  async loginUser(@Res() response, @Body() userData: LoginUser) {
    try {
      const user = await this.userService.login(userData.username);
      const comparedPass = await bcrypt.compare(
        userData.password,
        user.password,
      );

      if (comparedPass && user !== null) {
        return response.status(HttpStatus.OK).json({
          message: 'Login successfully',
          statusCode: HttpStatus.OK,
          user: {
            _id: user._id,
            username: user.username,
            movieList: user.movieList,
          },
        });
      } else {
        return response.status(HttpStatus.BAD_REQUEST).json({
          error: 'Wrong credentials',
        });
      }
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Patch('addMovie')
  async addFavoriteMovie(
    @Res() response,
    @Body()
    body: {
      userId: string;
      movieData: Array<IMovie>;
    },
  ) {
    try {
      const updatedUser = await this.userService.addFavoriteMovie(
        body.userId,
        body.movieData,
      );
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        user: {
          _id: updatedUser._id,
          movieList: updatedUser.movieList,
          username: updatedUser.username,
        },
      });
    } catch (err) {
      const statusCode = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const errorResponse = err.response || {
        message: 'Internal Server Error',
      };
      return response.status(statusCode).json(errorResponse);
    }
  }
  @Delete('deleteMovie')
  async deleteMovie(
    @Res() response,
    @Body()
    body: {
      userId: string;
      movieTitle: string;
    },
  ) {
    try {
      const updatedUser = await this.userService.deleteMovie(
        body.userId,
        body.movieTitle,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Movie has been successfully deleted',
        user: {
          _id: updatedUser._id,
          movieList: updatedUser.movieList,
          username: updatedUser.username,
        },
      });
    } catch (err) {
      const statusCode = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const errorResponse = err.response || {
        message: 'Internal Server Error',
      };
      return response.status(statusCode).json(errorResponse);
    }
  }

  @Delete('deleteUser')
  async deleteUser(
    @Res() response,
    @Body()
    body: {
      userId: string;
      password: string;
    },
  ) {
    try {
      const user = await this.userService.getUser(body.userId);
      const comparedPass = await bcrypt.compare(body.password, user.password);
      if (comparedPass) {
        await this.userService.deleteUser(body.userId);
        return response.status(HttpStatus.OK).json({
          message: 'User has been successfully deleted',
        });
      } else {
        return response.status(HttpStatus.BAD_REQUEST).json({
          error: 'Wrong credentials',
        });
      }
    } catch (err) {
      const statusCode = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const errorResponse = err.response || {
        message: 'Internal Server Error',
      };
      return response.status(statusCode).json(errorResponse);
    }
  }
}
