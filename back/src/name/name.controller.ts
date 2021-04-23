import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NameService } from './name.service';
import { CreateNameDto } from './dto/create-name.dto';
import { UpdateNameDto } from './dto/update-name.dto';

@Controller('name')
export class NameController {
  constructor(private readonly nameService: NameService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Welcome home ${id} !`;
  }
}
