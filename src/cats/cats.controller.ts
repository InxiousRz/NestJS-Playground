import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CatsService } from './cats.service';
import { Cats } from './cats.model';

@Controller('cats')
export class CatsController {
  constructor(private cat_service: CatsService) {}

  @Get()
  getAll(): any {
    const cats = this.cat_service.get();
    return {
      message: 'Success',
      data: cats,
    };
  }

  @Get(':id')
  getByID(@Param('id') id: number): any {
    const cat = this.cat_service.getByID(id);

    if (cat) {
      return {
        message: 'Success',
        data: cat,
      };
    } else {
      throw new NotFoundException();
    }
  }

  @Post()
  create(
    @Body('Name') name: string,
    @Body('Age') age: number,
    @Body('Race') race: string,
  ): any {
    this.cat_service.add(name, age, race);
    return {
      message: 'Success',
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body('Name') name: string,
    @Body('Age') age: number,
    @Body('Race') race: string,
  ): any {
    const record_found = this.cat_service.update(id, name, age, race);

    if (record_found) {
      return {
        message: 'Success',
      };
    } else {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number): any {
    const record_found = this.cat_service.delete(id);

    if (record_found) {
      return {
        message: 'Success',
      };
    } else {
      throw new NotFoundException();
    }
  }
}
