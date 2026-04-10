import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserSchema } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { UserParameterSchema } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  // @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    // createUserDto.enabledById = req.user.userId;
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(UserParameterSchema))
  @UseGuards(JwtAuthGuard)
  search(@Body() query) {
    return this.userService.filter(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req) {
    // console.log(req.user);
    return this.userService.current(req.user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('/update-password')
  @UseGuards(JwtAuthGuard)
  updatePassword(@Body() data) {
    return this.userService.updatePassword(data);
  }

  @Patch(':id/enable')
  @UseGuards(JwtAuthGuard)
  enable(@Param('id') id: string) {
    return this.userService.enable(id);
  }

  @Patch(':id/disable')
  @UseGuards(JwtAuthGuard)
  disable(@Param('id') id: string, @Req() req) {
    return this.userService.disable(id, req.user.userId);
  }
}
