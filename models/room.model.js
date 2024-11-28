import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema(
    {
        roomNo : {
            type: Number,
            unique: true,
            required: true,
            // index : true
        },
        images : {
            type: String,
            // required: true
        },
        facility: {
            type : {
                ac: {
                    type: Boolean,
                    required: true
                },
                geyser: {
                    type: Boolean,
                    required: true
                },
                lunch: {
                    type: Boolean,
                    required: true
                },
                brackfast: {
                    type: Boolean,
                    required: true
                },
                dinner: {
                    type: Boolean,
                    required: true
                }
            }
        },
        // userInfo: {
        //     type: [mongoose.Schema.Types.ObjectId],
        //     ref: "User"
        // }
    }, {timestamps: true}
)

const Room = mongoose.model("Room", roomSchema)

export default Room;