

// Cup Shape
color([1.0,1.0,1.0])
cylinder(12, 4, 5, true);

// Hand-hold Shape
color([0.6, 0.4, 0.0])
intersection() {
    cylinder(12, 4.1, 5.1, true);
    cube([10, 10, 6], true);
}

// Lid Shape
{
    // Lip
    color([0.1,0.1,0.1])
    translate([0,0,6])
    cylinder(1, 5.6, 5.5, true);
    
    // Primary Lid
    color([0.1,0.1,0.1]) difference(){
        translate([0,0,7])
        cylinder(3, 5.2, 5, true);
        
        // Central Cutout
        translate([0,0,8])
        cylinder(2.5, 3.5, 3.7, true);
        
        // Lid Shaping
        polyhedron(
        points = [
            [0, 6, 7.5],  // 0
            [0, -6, 7.5], // 1
            [6, 6, 7.5],  // 2
            [6, -6, 7.5], // 3
            [-5, 6, 9],  // 4
            [-5, -6, 9], // 5
            [6, 6, 9],  // 6
            [6, -6, 9]  // 7
        ],
        faces = [
            [0,1,3,2], // Bottom
            [1,5,7,3], // Left
            [0,2,6,4], // Right
            [0,4,5,1], // Back
            [2,3,7,6], // Front
            [4,6,7,5]  // Top
        ]);
        
    }
}