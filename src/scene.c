#include "scene.h"

#include <obj/load.h>
#include <obj/draw.h>

#include <GL/glu.h>
#include <math.h>

void init_scene(Scene *scene) {
    load_models_init_scene(scene);
    load_textures_init_scene(scene);

    scene->material.ambient.red = 0.0f;
    scene->material.ambient.green = 0.0f;
    scene->material.ambient.blue = 0.0f;

    scene->material.diffuse.red = 1.0f;
    scene->material.diffuse.green = 1.0f;
    scene->material.diffuse.blue = 0.0f;

    scene->material.specular.red = 0.0f;
    scene->material.specular.green = 0.0f;
    scene->material.specular.blue = 0.0f;

    scene->material.shininess = 0.0f;
    scene->brightness = 0.0f;

    scene->animation_path = -2.0f;
    scene->lever_rotate = 110.0f;
    scene->animation_flag = false;
    scene->animation_direction = true;

    scene->manual_movement_flag = false;

    scene->guide_flag = false;

    scene->teleportation_flag = false;
    scene->darkness_flag = false;
    scene->black_duration_time = 0;
    scene->cart_path = -20.0f;

    scene->diffuse[0] = 1.0f;
    scene->diffuse[1] = 1.0f;
    scene->diffuse[2] = 1.0f;
}

void load_models_init_scene(Scene *scene) {
    load_model(&(scene->column), "assets/models/column.obj");
    load_model(&(scene->lever), "assets/models/lever.obj");
    load_model(&(scene->dock_crane), "assets/models/dockcrane.obj");
    load_model(&(scene->terrain), "assets/models/terrain.obj");
    load_model(&(scene->cart), "assets/models/cart.obj");
    load_model(&(scene->gate), "assets/models/gate.obj");
    load_model(&(scene->character), "assets/models/character.obj");
}

void load_textures_init_scene(Scene *scene) {
    scene->skybox_texture = load_texture("assets/textures/skybox/skybox.png");
    scene->column_texture = load_texture("assets/textures/metal.jpg");
    scene->guide_texture = load_texture("assets/textures/guide.jpg");
    scene->dock_crane_texture = load_texture("assets/textures/dockcrane.jpg");
    scene->terrain_texture = load_texture("assets/textures/sand.jpg");
    scene->black_texture = load_texture("assets/textures/blackscreen.png");
    scene->text_texture = load_transparent_texture("assets/textures/heyyou.png");
}

void load_skybox(Scene scene) {
    glDisable(GL_LIGHTING);

    glBindTexture(GL_TEXTURE_2D, scene.skybox_texture);

    double theta, phi1, phi2;
    double x1, y1, z1;
    double x2, y2, z2;
    double u, v1, v2;
    int n_slices, n_stacks;
    double radius;
    int i, k;
    n_slices = 15;
    n_stacks = 15;
    radius = 70;

    glPushMatrix();

    glScaled(radius, radius, radius);

    glColor3f(1, 1, 1);

    glBegin(GL_TRIANGLE_STRIP);

    for (i = 0; i < n_stacks; ++i) {
        v1 = (double) i / n_stacks;
        v2 = (double) (i + 1) / n_stacks;
        phi1 = v1 * M_PI / 2.0;
        phi2 = v2 * M_PI / 2.0;
        for (k = 0; k <= n_slices; ++k) {
            u = (double) k / n_slices;
            theta = u * 2.0 * M_PI;
            x1 = cos(theta) * cos(phi1);
            y1 = sin(theta) * cos(phi1);
            z1 = sin(phi1) - 0.25;
            x2 = cos(theta) * cos(phi2);
            y2 = sin(theta) * cos(phi2);
            z2 = sin(phi2) - 0.25;
            glTexCoord2d(u, 1.0 - v1);
            glVertex3d(x1, y1, z1);
            glTexCoord2d(u, 1.0 - v2);
            glVertex3d(x2, y2, z2);
        }
    }

    glEnd();

    glPopMatrix();

    glEnable(GL_LIGHTING);
}

void load_objects(Scene scene) {
    glPushMatrix();
    glBindTexture(GL_TEXTURE_2D, scene.dock_crane_texture);
    glRotatef(90.0f, 1.0f, 0.0f, 0.0f);
    glRotatef(90.0f, 0.0f, 1.0f, 0.0f);
    glTranslatef(-30.0f, 0.0f, scene.animation_path);
    draw_model(&(scene.dock_crane));
    glPopMatrix();

    glEnable(GL_COLOR_MATERIAL);
    glPushMatrix();
    glBindTexture(GL_TEXTURE_2D, scene.column_texture);
    glRotatef(90.0f, 1.0f, 0.0f, 0.0f);
    glScalef(6.0f, 6.0f, 6.0f);
    glTranslatef(0.0f, -0.06f, 2.0f);
    draw_model(&(scene.column));
    glPopMatrix();

    glPushMatrix();
    glScalef(6.0f, 6.0f, 6.0f);
    glTranslatef(0.0f, -1.96f, -0.06f);
    glRotatef(scene.lever_rotate, 1.0f, 0.0f, 0.0f);
    draw_model(&(scene.lever));
    glPopMatrix();

    glPushMatrix();
    glBindTexture(GL_TEXTURE_2D, scene.terrain_texture);
    glRotatef(90.0f, 1.0f, 0.0f, 0.0f);
    glTranslatef(0.0f, -3.5f, 0.0f);
    glScalef(4.0f, 4.0f, 4.0f);
    draw_model(&(scene.terrain));
    glPopMatrix();

    glPushMatrix();
    glTranslatef(26.0f, 38.0f, -3.55f);
    glRotatef(90.0f, 1.0f, 0.0f, 0.0f);
    glRotatef(45.0f, 0.0f, 1.0f, 0.0f);
    draw_model(&(scene.gate));
    glPopMatrix();
}

void load_objects_alternative(Scene scene) {
    glEnable(GL_COLOR_MATERIAL);
    glPushMatrix();
    glBindTexture(GL_TEXTURE_2D, scene.terrain_texture);
    glRotatef(90.0f, 1.0f, 0.0f, 0.0f);
    glTranslatef(0.0f, -3.5f, 0.0f);
    glScalef(4.0f, 4.0f, 4.0f);
    draw_model(&(scene.terrain));
    glPopMatrix();

    glPushMatrix();
    glScalef(3.0f, 3.0f, 3.0f);
    glRotatef(90.0f, 1.0f, 0.0f, 0.0f);
    glTranslatef(scene.cart_path, 1.0f, 0.0f);
    draw_model(&(scene.cart));
    glPopMatrix();

    glPushMatrix();
    glTranslatef(scene.cart_path * 3 + 4, 2.2f, 4.67f);
    glRotatef(90.0f, 1.0f, 0.0f, 0.0f);
    glRotatef(180.0f, 0.0f, 1.0f, 0.0f);
    draw_model(&(scene.character));
    glPopMatrix();
}

void set_lighting(const Scene *scene) {
    float ambient_light[] = {0.0f, 0.0f, 0.0f, 1.0f};
    float diffuse_light[] = {scene->diffuse[0], scene->diffuse[1], scene->diffuse[2], 1.0f};
    float specular_light[] = {0.0f, 0.0f, 0.0f, 1.0f};
    float position[] = {0.0f, 0.0f, 50.0f, 1.0f};

    glLightfv(GL_LIGHT0, GL_AMBIENT, ambient_light);
    glLightfv(GL_LIGHT0, GL_DIFFUSE, diffuse_light);
    glLightfv(GL_LIGHT0, GL_SPECULAR, specular_light);
    glLightfv(GL_LIGHT0, GL_POSITION, position);
}

void set_material(const Material *material) {
    float ambient_material_color[] = {
            material->ambient.red,
            material->ambient.green,
            material->ambient.blue
    };

    float diffuse_material_color[] = {
            material->diffuse.red,
            material->diffuse.green,
            material->diffuse.blue
    };

    float specular_material_color[] = {
            material->specular.red,
            material->specular.green,
            material->specular.blue
    };

    glMaterialfv(GL_FRONT_AND_BACK, GL_AMBIENT, ambient_material_color);
    glMaterialfv(GL_FRONT_AND_BACK, GL_DIFFUSE, diffuse_material_color);
    glMaterialfv(GL_FRONT_AND_BACK, GL_SPECULAR, specular_material_color);

    glMaterialfv(GL_FRONT_AND_BACK, GL_SHININESS, &(material->shininess));
}

void set_mist(void) {
    glEnable(GL_FOG);
    glFogf(GL_FOG_MODE, GL_EXP);   // Set fog mode to linear
    glFogf(GL_FOG_START, 5.0f);       // Set fog start distance
    glFogf(GL_FOG_END, 15.0f);        // Set fog end distance
    GLfloat fogColor[4] = {0.5f, 0.5f, 0.5f, 1.0f}; // Set fog color
    glFogfv(GL_FOG_COLOR, fogColor);
    glFogf(GL_FOG_DENSITY, 0.05f);
}

void update_scene(Scene *scene, double time) {
    if (scene->animation_flag) {
        if (scene->lever_rotate >= 45.0f) {
            scene->lever_rotate -= 40.0f * (float) time;
        }
        if (scene->animation_direction) {
            scene->animation_path += 1.5f * (float) time;
            if (scene->animation_path >= 15.0f) {
                scene->animation_flag = false;
                scene->animation_direction = false;
            }
        } else {
            scene->animation_path -= 1.5f * (float) time;
            if (scene->animation_path <= -3.0f) {
                scene->animation_flag = false;
                scene->animation_direction = true;
            }
        }
    } else {
        if (scene->lever_rotate <= 126.0f) {
            scene->lever_rotate += 40.0f * (float) time;
        }
    }
    if (scene->teleportation_flag && scene->black_duration_time == 150) {
        scene->cart_path += 0.004f;
    }

    if (scene->teleportation_flag) {
        if (!scene->darkness_flag) {
            scene->diffuse[0] = 0.02f;
            scene->diffuse[1] = 0.02f;
            scene->diffuse[2] = 0.02f;
            scene->darkness_flag = true;
        }
    }

    scene->diffuse[0] += scene->brightness * (float) time;
    scene->diffuse[1] += scene->brightness * (float) time;
    scene->diffuse[2] += scene->brightness * (float) time;
}

void render_scene(const Scene *scene) {
    set_material(&(scene->material));
    set_lighting(scene);
    load_skybox(*scene);
    if (!scene->teleportation_flag) {
        load_objects(*scene);
        draw_water();
    } else {
        load_objects_alternative(*scene);
        draw_text(*scene);
        set_mist();
    }
}

void draw_origin(void) {
    glBegin(GL_LINES);

    glColor3f(1, 0, 0);
    glVertex3f(0, 0, 0);
    glVertex3f(100, 0, 0);

    glColor3f(0, 1, 0);
    glVertex3f(0, 0, 0);
    glVertex3f(0, 100, 0);

    glColor3f(0, 0, 1);
    glVertex3f(0, 0, 0);
    glVertex3f(0, 0, 100);

    glEnd();
}

void show_guide(GLuint texture) {
    glDisable(GL_CULL_FACE);
    glDisable(GL_LIGHTING);
    glDisable(GL_DEPTH_TEST);
    glEnable(GL_COLOR_MATERIAL);

    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();

    glColor3f(1.0f, 1.0f, 1.0f);
    glBindTexture(GL_TEXTURE_2D, texture);

    glBegin(GL_QUADS);
    glTexCoord2f(0.0f, 0.0f);
    glVertex3d(-2.5f, 1.8f, -3.0f);
    glTexCoord2f(1.0f, 0.0f);
    glVertex3d(2.5f, 1.8f, -3.0f);
    glTexCoord2f(1.0f, 1.0f);
    glVertex3d(2.5f, -1.8f, -3.0f);
    glTexCoord2f(0.0f, 1.0f);
    glVertex3d(-2.5f, -1.8f, -3.0f);
    glEnd();


    glDisable(GL_COLOR_MATERIAL);
    glEnable(GL_LIGHTING);
    glEnable(GL_DEPTH_TEST);
    glEnable(GL_CULL_FACE);

}

void setBrightness(Scene *scene, float brightness) {
    scene->brightness = brightness;
}

void draw_water(void) {
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    glColor4f(0.0f, 0.4f, 0.8f, 0.5f);

    glBegin(GL_QUADS);
    glTexCoord2f(0.0f, 0.0f);
    glVertex3f(-62.0f, 57.0f, -5.0f);

    glTexCoord2f(1.0f, 0.0f);
    glVertex3f(-62.0f, 22.0f, -5.0f);

    glTexCoord2f(1.0f, 1.0f);
    glVertex3f(-22.0f, 22.0f, -5.0f);

    glTexCoord2f(0.0f, 1.0f);
    glVertex3f(-22.0f, 65.0f, -5.0f);
    glEnd();

    glBlendFunc(GL_ONE, GL_ZERO);
    glDisable(GL_BLEND);
}

void draw_text(Scene scene) {
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    glDisable(GL_CULL_FACE);
    glBindTexture(GL_TEXTURE_2D, scene.text_texture);
    glBegin(GL_QUADS);
    glTexCoord2f(0.0f, 0.0f);
    glVertex3f(scene.cart_path * 3 + 10, -1.0f, 8.0f);

    glTexCoord2f(1.0f, 0.0f);
    glVertex3f(scene.cart_path * 3, -1.0f, 8.0f);

    glTexCoord2f(1.0f, 1.0f);
    glVertex3f(scene.cart_path * 3, -1.0f, 6.0f);

    glTexCoord2f(0.0f, 1.0f);
    glVertex3f(scene.cart_path * 3 + 10, -1.0f, 6.0f);
    glEnd();
    glBlendFunc(GL_ONE, GL_ZERO);
    glDisable(GL_BLEND);
    glEnable(GL_CULL_FACE);
}

void setMovement(Scene *scene, float value) {
    scene->animation_path += value;
}
