import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService) { }

    private static fileUploadOptions = {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                cb(null, uuid() + ext);
            },
        }),
    };

    // ----------------------------
    // GET /movies/:userId
    // ----------------------------
    @Get('/:userId')
    getMoviesByUserId(@Param('userId') userId: string) {
        return this.movieService.getMoviesByUserId(userId);
    }

    // ----------------------------
    // POST /movies   (with file upload)
    // ----------------------------
    @Post()
    @UseInterceptors(
        FileInterceptor('poster', MoviesController.fileUploadOptions)
    )
    postMovie(
        @UploadedFile() file: Express.Multer.File,
        @Body()
        body: {
            userId: string;
            title: string;
            publishingYear: string; // ⬅ comes as string in multipart/form-data
        }
    ) {
        return this.movieService.postMovie({
            userId: body.userId,
            title: body.title,
            publishingYear: Number(body.publishingYear),
            poster: file.filename,
        });
    }

    // ----------------------------
    // PUT /movies/:id
    // ----------------------------
    @Put('/:id')
    @UseInterceptors(
        FileInterceptor('poster', MoviesController.fileUploadOptions)
    )
    updateMovie(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body()
        body: Partial<{
            title: string;
            publishingYear: string;
            userId: string;
        }>
    ) {
        return this.movieService.updateMovie(id, {
            ...body,
            publishingYear: body.publishingYear
                ? Number(body.publishingYear)
                : undefined,
            poster: file ? file.filename : undefined,
        });
    }

    // ----------------------------
    // DELETE /movies/:id
    // ----------------------------
    @Delete('/:id')
    deleteMovie(@Param('id') id: string) {
        return this.movieService.deleteMovie(id);
    }
}
