const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true

    },
    lastName:{
        type: String,
        required: true,
        trim: true

    },
    email:{
        type: String,
        required: true,
        
    },

    password:{
        type: String,
        

    },
    accountType:{
        type: String,
        enum: ['Admin', 'Student','Instructor'],
        required: true
    },

    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Profile"
    },
    courses:[
        {
            type: mongoose.Schema.Types.ObjectId,
           
            ref: "Course", 
        }
    ],
    image:{
        type: String,
        required: true
    },
    token:{
        type: String,
        
    },
    resetPasswordExpries:{
        type: Date,
       
    },
     lastSeen: {
        type: Date,
        default: Date.now,
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courseProgress"
    }],

})

module.exports = mongoose.model('user', userSchema);