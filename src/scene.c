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

    scene->angle = -2.0f;
    scene->animation_flag = false;
    scene->guide_flag = false;
    scene->counter = 0;
}

void load_models_init_scene(Scene *scene) {
    load_model(&(scene->cube), "assets/models/cube.obj");
    load_model(&(scene->duck), "assets/models/duck.obj");
}

void load_textures_init_scene(Scene *scene) {
    scene->skybox_texture = load_texture("assets/textures/skybox/skybox.png");
    scene->cube_texture = load_texture("assets/textures/cube.png");
    scene->duck_texture = load_texture("assets/textures/duck.jpg");
    scene->guide_texture = load_texture("assets/textures/guide.png");
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
    glBindTexture(GL_TEXTURE_2D, scene.cube_texture);
    glTranslatef(5.0f,5.0f,0.0f);
    glRotatef(45.0f, 0.0f, 1.0f, 0.0f);
    draw_model(&(scene.cube));
    glPopMatrix();

    glPushMatrix();
    glBindTexture(GL_TEXTURE_2D, scene.duck_texture);
    glTranslatef(scene.angle,-3.0f,0.0f);
    glScalef(0.25f, 0.25f, 0.25f);
    draw_model(&(scene.duck));
    glPopMatrix();
}

void set_lighting() {
    float ambient_light[] = {0.0f, 0.0f, 0.0f, 1.0f};
    float diffuse_light[] = {1.0f, 1.0f, 1.0f, 1.0f};
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

void update_scene(Scene *scene, double time) {
    if(scene->animation_flag){
        if(scene->counter % 2 == 0){
            scene->angle += 1.5f * (float) time;
            if(scene->angle >= 8.0f){
                scene->animation_flag = false;
                scene->counter += 1;
            }
        }
        else{
            scene->angle -= 1.5f * (float) time;
            if(scene->angle <= -2.0f){
                scene->animation_flag = false;
                scene->counter += 1;
            }
        }
    }
}

void render_scene(const Scene *scene) {
    set_material(&(scene->material));
    set_lighting();
    draw_origin();
    load_skybox(*scene);
    load_objects(*scene);
}

void draw_origin() {
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
    glVertex3d(-2.0f, 1.5f, -3.0f);
    glTexCoord2f(1.0f, 0.0f);
    glVertex3d(2.0f, 1.5f, -3.0f);
    glTexCoord2f(1.0f, 1.0f);
    glVertex3d(2.0f, -1.5f, -3.0f);
    glTexCoord2f(0.0f, 1.0f);
    glVertex3d(-2.0f, -1.5f, -3.0f);
    glEnd();


    glDisable(GL_COLOR_MATERIAL);
    glEnable(GL_LIGHTING);
    glEnable(GL_DEPTH_TEST);
    glEnable(GL_CULL_FACE);

}

void setBrightness(Scene *scene, float brightness) {
    scene->brightness = brightness;
}