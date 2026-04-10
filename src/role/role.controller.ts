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
import { RoleService } from './role.service';
import { CreateRoleDto, CreateRoleSchema } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { RoleParameterSchema } from './entities/role.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateRoleSchema))
  create(@Body() createRoleDto: CreateRoleDto, @Req() req) {
    createRoleDto.enabledById = req.user.userId;
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Post('/search')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(RoleParameterSchema))
  search(@Body() query) {
    return this.roleService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }

  @Patch(':id/enable')
  enable(@Param('id') id: string) {
    return this.roleService.enable(id);
  }

  @Patch(':id/disable')
  disable(@Param('id') id: string, @Req() req) {
    return this.roleService.disable(id, req.user.userId);
  }
}
