import faker from '@faker-js/faker';
import { Room } from '@prisma/client';
import { prisma } from '@/config';

//Sabe criar objetos - Hotel do banco
export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRoomWithHotelId(hotelId: number) {
  return prisma.room.create({
    data: {
      name: '1020',
      capacity: 3,
      hotelId: hotelId,
    },
  });
}

export async function createRoomWithLimit(hotelId: number, limit: number): Promise<Room> {
  return prisma.room.create({
    data: { name: faker.name.findName(), capacity: limit, hotelId },
  });
}

export async function createRoom(hotelId: number): Promise<Room> {
  return prisma.room.create({
    data: { name: faker.name.findName(), capacity: faker.datatype.number(), hotelId },
  });
}
