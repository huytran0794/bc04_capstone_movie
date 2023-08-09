export const bookingUtils = {
  renderSelectedSeat: (selectedSeatList) => {
    let selectedSeats = [];
    selectedSeatList.forEach((item) => {
      selectedSeats.push(item.tenGhe);
    });
    return selectedSeats.join(", ");
  },
};
