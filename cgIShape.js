//
// fill in code that creates the triangles for a cube with dimensions 1x1x1
// on each side (and the origin in the center of the cube). with an equal
// number of subdivisions along each cube face as given by the parameter
//subdivisions
//
function makeCube (subdivisions)  {

    // fill in your code here.
    // delete the code below first.
    //   new THREE.Vector3(-1, -1,  1),  // 0
//         new THREE.Vector3( 1, -1,  1),  // 1
//         new THREE.Vector3(-1,  1,  1),  // 2
//         new THREE.Vector3( 1,  1,  1),  // 3
//         new THREE.Vector3(-1, -1, -1),  // 4
//         new THREE.Vector3( 1, -1, -1),  // 5
//         new THREE.Vector3(-1,  1, -1),  // 6
//         new THREE.Vector3( 1,  1, -1),  // 7
    addTriangle (-0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5); // 032
    addTriangle (-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5); // 013

    addTriangle (0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5); // 173
    addTriangle (0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5); // 157

    addTriangle (-0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5); // 657
    addTriangle (0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5); // 564

    addTriangle (-0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5); // 246
    addTriangle (-0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5); // 420

    addTriangle (-0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5); // 632
    addTriangle (0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5); // 367

    addTriangle (-0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5); // 410
    addTriangle (-0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5); // 145


}


//
// fill in code that creates the triangles for a cylinder with diameter 1
// and height of 1 (centered at the origin) with the number of subdivisions
// around the base and top of the cylinder (given by radialdivision) and
// the number of subdivisions along the surface of the cylinder given by
//heightdivision.
//
function makeCylinder (radialdivision,heightdivision) {
    // fill in your code here.
    var theta = 2 * Math.PI / radialdivision;
    var x_lst = []
    var y_lst = [];
    var radius = 0.5;
    var height = 1;
    var z_top = height/2;
    var z_bottom = -z_top;

    // top
    for (let i = 0; i < radialdivision; i++) {
        var x = Math.cos(i * theta) * radius;
        var y = Math.sin(i * theta) * radius;
        x_lst.push(x);
        y_lst.push(y);
    }

    for (let i = 0; i < x_lst.length - 1; i++) {
        //bottom
        addTriangle(0, 0, -height/2, x_lst[i], y_lst[i], z_bottom, x_lst[i+1], y_lst[i+1], z_bottom);
        //top
        addTriangle(0, 0, height/2, x_lst[i], y_lst[i], z_top, x_lst[i+1], y_lst[i+1], z_top);
        //surface
        addTriangle(x_lst[i], y_lst[i], z_bottom, x_lst[i], y_lst[i], z_top, x_lst[i+1], y_lst[i+1], z_top);
        addTriangle(x_lst[i], y_lst[i], z_bottom, x_lst[i+1], y_lst[i+1], z_top, x_lst[i+1], y_lst[i+1], z_bottom);
    }
}


//
// fill in code that creates the triangles for a cone with diameter 1
// and height of 1 (centered at the origin) with the number of
// subdivisions around the base of the cone (given by radialdivision)
// and the number of subdivisions along the surface of the cone
//given by heightdivision.
//
function makeCone (radialdivision, heightdivision) {

    // fill in your code here.
    var theta = 2 * Math.PI / radialdivision;
    var x_lst = []
    var y_lst = [];
    var radius = 0.5;
    var half_height = 0.5;

    // top & bottom
    for (let i = 0; i < radialdivision; i++) {
        var x = Math.cos(i * theta) * radius;
        var y = Math.sin(i * theta) * radius;
        x_lst.push(x);
        y_lst.push(y);
    }
    for (let i = 0; i < x_lst.length - 1; i++) {
        //bottom
        addTriangle(0, 0, -height/2, x_lst[i], y_lst[i], z_bottom, x_lst[i+1], y_lst[i+1], z_bottom);
        //surface
        addTriangle(0, 0, height, x_lst[i], y_lst[i], z_bottom, x_lst[i+1], y_lst[i+1], z_bottom);
    }

}

//
// fill in code that creates the triangles for a sphere with diameter 1
// (centered at the origin) with number of slides (longitude) given by
// slices and the number of stacks (lattitude) given by stacks.
// For this function, you will implement the tessellation method based
// on spherical coordinates as described in the video (as opposed to the
//recursive subdivision method).
//
function makeSphere (slices, stacks) {
    // fill in your code here.
    var z_gap = 1 / (stacks + 1);
    var theta = 2 * Math.PI / (slices + 1);
    var pi = 90 - theta;
    var radius = 0.5;
    var ver_lst = []
    var y_lst = [];


    for (let i = 0; i < stacks; i++)
    {
        for (let j = 0; j < slices; j++)
        {
            var x = radius * cos_stack[i] * cos_stack[j];
            var y = radius * sin_stack[i];
            var z = radius * cos_stack[i] * sin_stack[j];
            ver_lst.push([x, y, z])
        }
    }

}


////////////////////////////////////////////////////////////////////
//
//  Do not edit below this line
//
///////////////////////////////////////////////////////////////////

function radians(degrees)
{
    var pi = Math.PI;
    return degrees * (pi/180);
}


function addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {


    var nverts = points.length / 4;

    // push first vertex
    points.push(x0);  bary.push (1.0);
    points.push(y0);  bary.push (0.0);
    points.push(z0);  bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;

    // push second vertex
    points.push(x1); bary.push (0.0);
    points.push(y1); bary.push (1.0);
    points.push(z1); bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;

    // push third vertex
    points.push(x2); bary.push (0.0);
    points.push(y2); bary.push (0.0);
    points.push(z2); bary.push (1.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
}

