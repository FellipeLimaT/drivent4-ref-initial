import { Booking, Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}
async function getRoomWithBookings(id: number): Promise<Room & { Booking: Booking[] }> {
  return prisma.room.findUnique({
    where: { id },
    include: { Booking: true },
  });
}

async function getHotelbyId(id: number): Promise<Hotel & { Rooms: Room[] }> {
  return prisma.hotel.findUnique({ where: { id }, include: { Rooms: true } });
}

export const hotelsRepository = {
  findHotels,
  findRoomsByHotelId,
  getRoomWithBookings,
  getHotelbyId,
};
