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
  HttpCode,
  Req,
} from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import {
  CreateUserRoleDto,
  CreateUserRoleSchema,
} from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { UserRoleParameterSchema } from './entities/user-role.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('userRole')
@UseGuards(JwtAuthGuard)
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserRoleSchema))
  create(@Body() createUserRoleDto: CreateUserRoleDto, @Req() req) {
    createUserRoleDto.enabledById = req.user.userId;
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  findAll() {
    return this.userRoleService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(UserRoleParameterSchema))
  search(@Body() query) {
    return this.userRoleService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRoleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRoleService.update(id, updateUserRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRoleService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.userRoleService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.userRoleService.disable(id, req.user.userId);
  }
}
