import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);

    // Usa await para esperar la respuesta de la función findByEmail
    const existingUser = await this.findByEmail(createUserDto.email);

    console.log(existingUser);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Asigna un UUID aleatorio
    createUserDto.id = randomUUID();

    // Encripta la contraseña
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);

    console.log(createUserDto);

    // Crea y guarda el usuario
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
