import express from "express";
import Movie from "../model/movie.model.js";
import userAuth from "../middleware/userAuth.js"

const router = express.Router();

// Retrieve all movies.
router.get("/all", async (req, res) => {
  try {
    const allMovies = await Movie.find().sort({ createdAt: -1 });

    return res.status(200).json(allMovies)
  } catch (error) {
    console.log("Error in getAllMovies : ", error.message);
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Get sorted movies by rating, release date, or duration.
router.post("/sorted", async (req, res) => {
  try {
    const { rating, releaseDate, duration } = req.body;
    
    const filter = {};

    if (rating && !isNaN(rating)) {
      filter.rating = Number(rating);
    }

    if (releaseDate) {
      const parsedDate = new Date(releaseDate);
      if (!isNaN(parsedDate.getTime())) {
        filter.releaseDate = parsedDate.toISOString(); 
      } else {
        return res.status(400).json({ error: "Invalid release date format" });
      }
    }

    if (duration && !isNaN(duration)) {
      filter.duration = Number(duration);
    }

    const movies = await Movie.find(filter).lean();

    return res.status(200).json({
      message: "Movies fetched successfully based on the provided filters.",
      movies: movies,
    });

  } catch (error) {
    console.error("Error in fetching movies:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Search movies by name or description.
router.get("/", async (req, res) => {
  try {
    const { movieInput } = req.query;

    const movies = await Movie.find({
      $or: [
        { movieName: { $regex: movieInput, $options: "i" } },
        { movieDescription: { $regex: movieInput, $options: "i" } }
      ]
    })

    return res.status(201).json({
      message: "Movie fetched successfully",
      movies: movies
    })
  } catch (error) {
    console.log("Error in retrieve movie by name ", error.message);
    return res.status(500).json({ error: "Internal server error" })
  }
})

// fetch movie details
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const movie = await Movie.findById(id)
    if (!movie) {
      return res.status(400).json({ error: "Error while fetching data" })
    }

    return res.status(200).json({
      message: "Movied fetched successfully",
      movie
    })
  } catch (error) {
    console.log("Error fetchin movie: ", error.message);
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Add a new movie (admin only).
router.post("/create", userAuth, async (req, res) => {
  try {
    const { movieName, movieDescription, movieImageURL, rating, duration, releaseDate } = req.body;

    const user = req.user
    if (!user) {
      return res.status(400).json({ error: "Please sign up" })
    }

    const role = user.role
    if (role !== "admin") {
      return res.status(400).json({ error: "Only admin can use this feature" })
    }

    if (!movieName || !movieDescription || !movieImageURL || !rating || !duration || !releaseDate) {
      return res.status(401).json({ error: "All fields are required" })
    }

    const existedMovie = await Movie.find({ movieName })
    if (existedMovie.length > 0) {
      return res.status(401).json({ error: "Movie with same name already exist." })
    }
    const movie = await Movie.create({
      movieName, movieDescription, movieImageURL, rating, duration, releaseDate
    })

    return res.status(201).json({
      message: "Movie created successfully",
      movieId: movie._id,
      movie
    })

  } catch (error) {
    console.log("Error creating new movie: ", error.message);
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Edit movie details (admin only).
router.put("/update/:id", userAuth, async (req, res) => {
  try {
    const { movieName, movieDescription, movieImageURL, rating, duration, releaseDate } = req.body;

    const user = req.user
    if (!user) {
      return res.status(400).json({ error: "Please sign up" })
    }

    const id = req.params.id

    const role = user.role
    if (role !== "admin") {
      return res.status(400).json({ error: "Only admin can use this feature" })
    }

    if (!movieName || !movieDescription || !movieImageURL || !rating || !duration || !releaseDate) {
      return res.status(401).json({ error: "All fields are required" })
    }

    const updatedMovie = await Movie.findByIdAndUpdate(id, {
      movieName, movieDescription, movieImageURL, rating, duration, releaseDate
    }, { new: true })

    if (!updatedMovie) {
      return res.status(401).json({ error: "Error updating Movie." })
    }

    return res.status(200).json({
      message: "Movie updated successfully",
      movie: updatedMovie
    })

  } catch (error) {
    console.log("Error updating movie: ", error.message);
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Delete a movie (admin only).
router.delete("/delete/:id", userAuth, async (req, res) => {
  try {

    const id = req.params.id

    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(401).json({ error: "Error deleting Movie." })
    }

    return res.status(200).json({
      message: "Movie deleted successfully"
    })
  } catch (error) {
    console.log("Error deleting movie: ", error.message);
    return res.status(500).json({ error: "Internal server error" })
  }
})

export default router;