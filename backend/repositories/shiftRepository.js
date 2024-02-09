const Shift = require("../models/Shift");

const getAllShifts = async (filters) => {
  return await Shift.find(filters);
};

const getShiftById = async (id) => {
  return await Shift.findById(id);
};

const createShift = async (shift) => {
  const newShift = new Shift(shift);
  await newShift.save();
  return newShift;
};

const updateShift = async (id, shift) => {
  return await Shift.findByIdAndUpdate(id, shift);
};

const deleteShift = async (id) => {
  return await Shift.findByIdAndDelete(id);
};

module.exports = {
  getAllShifts,
  getShiftById,
  createShift,
  updateShift,
  deleteShift,
};
