import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true
  },
  movieDescription: {
    type: String,
    required: true
  },
  movieImageURL: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    enum: [1,2,3,4,5],
    default: 1
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  releaseDate: {
    type: Date,
    required: true
  }
}, {timestamps: true})

const Movie = mongoose.model("Movie", movieSchema)

export default Movie;