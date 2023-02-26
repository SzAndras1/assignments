#include "texture.h"

#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>

GLuint load_texture(char *filename) {
    SDL_Surface *surface;
    GLuint texture_name;

    surface = IMG_Load(filename);

    glGenTextures(1, &texture_name);

    glBindTexture(GL_TEXTURE_2D, texture_name);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, surface->w, surface->h, 0, GL_RGB, GL_UNSIGNED_BYTE,
                 (Pixel *) (surface->pixels));

    glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP);
    glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP);

    glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);

    return texture_name;
}

GLuint load_skybox() {
    SDL_Surface *surface;
    GLuint texture_name;

    glGenTextures(1, &texture_name);
    glBindTexture(GL_TEXTURE_CUBE_MAP, texture_name);

    char *skybox_paths[] = {"assets/textures/skybox/right.jpg",
                            "assets/textures/skybox/left.jpg",
                            "assets/textures/skybox/top.jpg",
                            "assets/textures/skybox/bottom.jpg",
                            "assets/textures/skybox/front.jpg",
                            "assets/textures/skybox/back.jpg"};
    for (int i = 0; i < 6; i++) {
        surface = IMG_Load(skybox_paths[i]);
        glTexImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + i,0, GL_RGB, surface->w, surface->h, 0, GL_RGB,
                     GL_UNSIGNED_BYTE, (Pixel *) (surface->pixels));
    }
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_R, GL_CLAMP_TO_EDGE);

    return texture_name;
}
