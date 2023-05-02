import { notFoundError } from '@/errors';
// import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import { enrollmentRepository, ticketsRepository, hotelsRepository } from '@/repositories';

async function listHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw notFoundError();
  }
}

async function getHotels(userId: number) {
  await listHotels(userId);

  const hotels = await hotelsRepository.findHotels();
  if (!hotels || hotels.length === 0) {
    throw notFoundError();
  }
  return hotels;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await listHotels(userId);

  const hotel = await hotelsRepository.findRoomsByHotelId(hotelId);

  if (!hotel || hotel.Rooms.length === 0) {
    throw notFoundError();
  }
  return hotel;
}

export const hotelsService = {
  getHotels,
  getHotelsWithRooms,
};
