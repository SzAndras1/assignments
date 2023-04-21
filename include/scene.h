#ifndef SCENE_H
#define SCENE_H

#include "camera.h"
#include "texture.h"

#include <obj/model.h>

typedef struct Scene
{
    Model cube;
    Model duck;
    Material material;
    GLuint skybox_texture_id;
    GLuint cube_texture_id;
    GLuint duck_texture_id;
    float brightness;
    float angle;
    bool flag;
    int counter;
} Scene;

/**
 * Initialize the scene by loading models.
 */
void init_scene(Scene* scene);

/**
 * Set the lighting of the scene.
 */
void set_lighting();

/**
 * Set the current material.
 */
void set_material(const Material* material);

/**
 * Update the scene.
 */
void update_scene(Scene* scene, double time);

/**
 * Render the scene objects.
 */
void render_scene(const Scene* scene);

/**
 * Draw the origin of the world coordinate system.
 */
void draw_origin();

/**
 * Set the scene's brightness
 */
void setBrightness(Scene *scene, float brightness);
/**
 * Load skybox
 */
void load_skybox(Scene scene);
/**
 * Load models for init_scene function
 */
void load_models_init_scene(Scene *scene);
/**
 * Load textures for init_scene function
 */
void load_textures_init_scene(Scene *scene);
/**
 * Load objects
 */
void load_objects(Scene scene);
/**
 * Change flag so update_scene can active a while loop
 */
void change_flag(Scene *scene);

#endif /* SCENE_H */
