const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   description: {
      type: String,
   },
   // --- THIS IS THE CORRECTED PART ---
   // 1. Rename "course" to "courses"
   // 2. Make it an array by adding square brackets [ ... ]
   courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'  // This links to your Course model
   }],
   tags: {
      type: String,
   }
});

// It's also a standard practice to name the model with a capital letter
module.exports = mongoose.model('Category', categorySchema);