import { Component } from '@angular/core';
import { Viewer360 } from './components/viewer360/viewer360';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Viewer360],
  template: `<app-viewer360></app-viewer360>`
})
export class App {}