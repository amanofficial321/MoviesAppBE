import * as fs from 'fs';
import * as path from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { ensureFileSync, readJson, writeJson } from 'fs-extra';

const MoviesDB = 'data/movies.json';

@Injectable()
export class MoviesService {

    constructor() {
        ensureFileSync(MoviesDB);
    }

    private deletePosterFile(filename: string) {
        const filePath = path.join(process.cwd(), 'uploads', filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }


    async getAllMovies() {
        try {
            const data = await readJson(MoviesDB);
            return data;
        } catch (error) {
            return [];
        }
    };

    async getMoviesByUserId(userId: string) {
        try {
            const data = await readJson(MoviesDB);
            const userMovies = data.filter((movie: any) => movie.userId === userId);
            return userMovies;
        } catch (error) {
            return [];
        }

    };

    async postMovie(data: { userId: string; title: string; publishingYear: number; poster: string; }) {
        const movies = await this.getAllMovies();
        const newMovie = {
            id: uuid(),
            ...data,
        };
        movies.push(newMovie);
        await writeJson(MoviesDB, movies, { spaces: 2 });
        return {
            success: true,
            message: 'Movie added successfully',
            movie: newMovie,
        };
    }

    async updateMovie(
        id: string,
        updateData: Partial<{ title: string; publishingYear: number; poster: string; }>
    ) {
        const movies = await this.getAllMovies();
        const movieIndex = movies.findIndex(m => m.id === id);

        if (movieIndex === -1) {
            throw new NotFoundException('Movie not found');
        }

        const oldPoster = movies[movieIndex].poster;

        // If a new poster is uploaded → delete old one
        if (updateData.poster && oldPoster) {
            this.deletePosterFile(oldPoster);
        }

        movies[movieIndex] = {
            ...movies[movieIndex],
            ...updateData,
        };

        await writeJson(MoviesDB, movies, { spaces: 2 });

        return {
            success: true,
            message: 'Movie updated successfully',
            movie: movies[movieIndex],
        };
    }

    async deleteMovie(id: string) {
        const movies = await this.getAllMovies();

        const movieIndex = movies.findIndex(movie => movie.id === id);

        if (movieIndex === -1) {
            throw new NotFoundException('Movie not found');
        }

        const movie = movies[movieIndex];

        // Delete poster file as well
        if (movie.poster) {
            this.deletePosterFile(movie.poster);
        }

        movies.splice(movieIndex, 1);

        await writeJson(MoviesDB, movies, { spaces: 2 });

        return {
            success: true,
            message: 'Movie deleted successfully',
        };
    }
}
