import Room from "../models/User/room.model.js";
import { object, z } from "zod";

const getAllRoomList = async (req, res) => {
  const room = await Room.find({});
  if (room.length < 1) {
    return res.status(400).json({ status: "Error", message: "Room not found" });
  }
  // console.log(room,"room++++++++++++++")
  return res.status(200).json({ status: "success", message: room });
};

const getSpecificRoomList = async (req, res) => {
  const { id } = req?.params;
  // console.log(id,"id++++++++++++++++++")
  const room = await Room.findById(id);
  if (!room) {
    return res.status(400).json({ status: "error", message: "room not found" });
  }
  // console.log(room);
  return res.status(200).json({ status: "success", message: room });
};

const createNewRoom = async (req, res) => {
  const body = req.body;
  const roomSchema = z.object({
    roomNo: z.number(),
    facility: z.object({
      ac: z.boolean(),
      dinner: z.boolean(),
      lunch: z.boolean(),
      brackfast: z.boolean(),
      geyser: z.boolean(),
    }),
  });

  const validate = roomSchema.safeParse(req.body);
  if (!validate.success) {
    return res
      .status(400)
      .json({ error: "Bad Request", message: "Required field is missing" });
  }

  const room = await Room.create({
    roomNo: body.roomNo,
    facility: {
      ac: body.facility.ac,
      lunch: body.facility.lunch,
      dinner: body.facility.dinner,
      brackfast: body.facility.brackfast,
      geyser: body.facility.geyser,
    },
  });

  return res
    .status(200)
    .json({ status: "success", message: "Create New Room", room: room });

  // if(!body)
};

const updateRoomDetails = async (req, res) => {
  const { id } = req?.params;
  const body = req.body;
  const roomSchema = z.object({
    roomNo: z.number(),
    facility: z.object({
      ac: z.boolean(),
      dinner: z.boolean(),
      lunch: z.boolean(),
      brackfast: z.boolean(),
      geyser: z.boolean(),
    }),
  });

  const validate = roomSchema.safeParse(req.body);
  if (!validate.success) {
    return res
      .status(400)
      .json({ error: "Bad Request", message: "Required field is missing" });
  }

  const room = await Room.findByIdAndUpdate(
    id,
    {
      roomNo: body.roomNo,
      facility: {
        ac: body.facility.ac,
        lunch: body.facility.lunch,
        dinner: body.facility.dinner,
        brackfast: body.facility.brackfast,
        geyser: body.facility.geyser,
      },
    },
    { new: true }
  );

  if (!room) {
    return res.status(400).json({ status: "error", message: "Room not found" });
  }

  return res
    .status(200)
    .json({
      status: "success",
      message: `Update room no ${body.roomNo}`,
      room: room,
    });
};

const deleteSpecificRoomList = async (req, res) => {
  const { id } = req?.params;
  // console.log(id, "id++++++++++++");

  const room = await Room.findByIdAndDelete(id);
  // console.log(room.roomNo,"++++++++")

  if (!room) {
    return res.status(400).json({ status: "error", message: "Room not found" });
  }

  return res
    .status(200)
    .json({ status: "success", message: `Delete Room No ${room.roomNo}` });
};

export {
  getAllRoomList,
  createNewRoom,
  getSpecificRoomList,
  deleteSpecificRoomList,
  updateRoomDetails,
};
