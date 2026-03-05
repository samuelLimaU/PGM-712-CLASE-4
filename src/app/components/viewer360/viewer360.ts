import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GeometryComponent } from '../geometry/geometry';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewer360',
  standalone: true,
  imports: [GeometryComponent, CommonModule],
  templateUrl: './viewer360.html',
  styleUrls: ['./viewer360.scss']
})
export class Viewer360 implements AfterViewInit, OnDestroy {

  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;

  public scene: THREE.Scene = new THREE.Scene();
  public red = 0xff0000;
  public green = 0x00ff00;
  public blue = 0x0000ff;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private animationId!: number;

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
  }

  private initScene(): void {
    

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.set(0, 0, 0.1);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.nativeElement.appendChild(this.renderer.domElement);

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const loader = new THREE.TextureLoader();

    loader.load(
      'dronjpg.jpg',
      (texture) => {

        console.log('TEXTURA CARGADA');

        texture.colorSpace = THREE.SRGBColorSpace;

        const material = new THREE.MeshBasicMaterial({
          map: texture
        });

        const sphere = new THREE.Mesh(geometry, material);
        this.scene.add(sphere);

      },
      undefined,
      (error) => {
        console.error('ERROR AL CARGAR TEXTURA:', error);
      }
    );

    this.controls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );

    this.controls.enableZoom = false;
    this.controls.enablePan = false;

    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    this.controls.rotateSpeed = 0.4;

    this.controls.minPolarAngle = Math.PI / 3;
    this.controls.maxPolarAngle = Math.PI / 1.5;
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }
}