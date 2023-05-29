#ifndef SCENE_H
#define SCENE_H

#include "camera.h"
#include "texture.h"

#include <obj/model.h>

typedef struct Scene
{
    Model column;
    Model lever;
    Model terrain;
    Model dock_crane;
    Model cart;
    Model gate;
    Model character;
    Material material;
    GLuint skybox_texture;
    GLuint guide_texture;
    GLuint column_texture;
    GLuint terrain_texture;
    GLuint dock_crane_texture;
    GLuint black_texture;
    GLuint text_texture;
    float cart_path;
    float brightness;
    float animation_path;
    float lever_rotate;
    int black_duration_time;
    float diffuse[3];
    bool animation_flag;
    bool guide_flag;
    bool animation_direction;
    bool teleportation_flag;
    bool darkness_flag;
    bool manual_movement_flag;
} Scene;

/**
 * Initialize the scene by loading models.
 */
void init_scene(Scene* scene);

/**
 * Set the lighting of the scene.
 */
void set_lighting(const Scene* scene);

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
 * Open a guide which contain the keyboard settings
 */
void show_guide(GLuint texture);

/**
 * Load objects in the alternative world
 */
void load_objects_alternative(Scene scene);

/**
 * Set mist in the alternative world
 */
void set_mist(void);

/**
 * Draw water in the corner
 */
void draw_water(void);

/**
 * Draw text in alternative world
 */
void draw_text(Scene scene);

/**
 * Set dock crane's movement position
 */
void setMovement(Scene* scene, float value);

/**
 * Set diffuse values for lightning
 */
void set_diffuse_values(Scene *scene, float value);

#endif /* SCENE_H */
