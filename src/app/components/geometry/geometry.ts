import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-geometry',
  standalone: true,
  template: '',
})
export class GeometryComponent implements OnChanges {

  @Input() scene!: THREE.Scene;
  @Input() width: number = 2;
  @Input() height: number = 0.8;
  @Input() depth: number = 0.2;
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() z: number = -50;
  @Input() color: number = 16711680;

  private mesh!: THREE.Mesh;

  ngOnChanges(changes: SimpleChanges): void {

    if (!this.scene) return;

    const geometry = new THREE.BoxGeometry(
      this.width,
      this.height,
      this.depth
    );

    const material = new THREE.MeshBasicMaterial({
      color: this.color
    });

    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.set(this.x, this.y, this.z);

    this.scene.add(this.mesh);

    console.log("GEOMETRY CREADA");
  }
}