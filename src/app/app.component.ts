import { Component } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { AnimationEvent } from '@angular/animations'

export enum SideBarViewMode {
  OFF = 'off',
  RIGHT = 'right',
  LEFT = 'left',
  BOTTOM = 'bottom',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('expand', [
      state('rcollapsed', style({ width: '0' }), { params: { size: '0px' } }),
      state('rexpanded', style({ width: '{{size}}' }), { params: { size: '0px' } }),
      state('bcollapsed', style({ height: '0' }), { params: { size: '0px' } }),
      state('bexpanded', style({ height: '{{size}}' }), { params: { size: '0px' } }),
      state('lcollapsed', style({ width: '0' }), { params: { size: '0px' } }),
      state('lexpanded', style({ width: '{{size}}' }), { params: { size: '0px' } }),
      transition('* => bexpanded', [style({ height: '0' }), animate('0.3s')]),
      transition('* => rexpanded', [style({ width: '0' }), animate('0.3s')]),
      transition('* => lexpanded', [style({ width: '0' }), animate('0.3s')]),
      transition('* <=> *', animate('0.3s')),
    ]),
  ],
})
export class AppComponent {
  selectedSideBar: SideBarViewMode = SideBarViewMode.OFF
  nextSideBarViewMode: SideBarViewMode

  currentSideBar: SideBarViewMode
  transitionFrom: SideBarViewMode

  panelSize = 300

  switch(viewMode: SideBarViewMode) {
    const oldValue = this.selectedSideBar
    this.transitionFrom = oldValue
    if (oldValue !== SideBarViewMode.OFF) {
      this.selectedSideBar = SideBarViewMode.OFF
      this.nextSideBarViewMode = viewMode
    } else {
      this.selectedSideBar = viewMode
    }
  }

  get sideBarHeight() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.currentSideBar === SideBarViewMode.RIGHT) {
      return '100%'
    }
    if (this.selectedSideBar === SideBarViewMode.LEFT || this.currentSideBar === SideBarViewMode.LEFT) {
      return '100%'
    }
    return `${this.panelSize}px`
  }

  get sideBarWidth() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.currentSideBar === SideBarViewMode.RIGHT) {
      return `${this.panelSize}px`
    }
    if (this.selectedSideBar === SideBarViewMode.LEFT || this.currentSideBar === SideBarViewMode.LEFT) {
      return `${this.panelSize}px`
    }
    return '100%'
  }

  get sideBarTop() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.currentSideBar === SideBarViewMode.RIGHT) {
      return `${this.panelSize}px`
    }
    if (this.selectedSideBar === SideBarViewMode.LEFT || this.currentSideBar === SideBarViewMode.LEFT) {
      return `${this.panelSize}px`
    }
    return 'auto'
  }

  get sideBarBottom() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.currentSideBar === SideBarViewMode.RIGHT) {
      return '0'
    }
    if (this.selectedSideBar === SideBarViewMode.LEFT || this.currentSideBar === SideBarViewMode.LEFT) {
      return '0'
    }
    return '0'
  }

  get sideBarRight() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.currentSideBar === SideBarViewMode.RIGHT) {
      return '0'
    }
    return 'auto'
  }

  get sideBarLeft() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.currentSideBar === SideBarViewMode.RIGHT) {
      return 'auto'
    }
    return '0'
  }

  onAnimationStart(event: AnimationEvent) {
    if (event.toState === 'rexpanded' || event.toState === 'rcollapsed') {
      this.currentSideBar = SideBarViewMode.RIGHT
    }
    if (event.toState === 'bexpanded' || event.toState === 'bcollapsed') {
      this.currentSideBar = SideBarViewMode.BOTTOM
    }
    if (event.toState === 'lexpanded' || event.toState === 'lcollapsed') {
      this.currentSideBar = SideBarViewMode.LEFT
    }
  }

  onAnimationDone(event: AnimationEvent) {
    this.currentSideBar = SideBarViewMode.OFF

    if (event.toState === 'rexpanded') {
      this.transitionFrom = SideBarViewMode.RIGHT
    } else if (event.toState === 'bexpanded') {
      this.transitionFrom = SideBarViewMode.BOTTOM
    } else if (event.toState === 'lexpanded') {
      this.transitionFrom = SideBarViewMode.LEFT
    } else {
      this.transitionFrom = SideBarViewMode.OFF
    }

    if (!event.toState && this.nextSideBarViewMode && this.nextSideBarViewMode !== SideBarViewMode.OFF) {
      this.selectedSideBar = this.nextSideBarViewMode
      this.nextSideBarViewMode = SideBarViewMode.OFF
    }
  }

  get currentAnimation() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.transitionFrom === SideBarViewMode.RIGHT) {
      return this.selectedSideBar === SideBarViewMode.OFF ? 'rcollapsed' : 'rexpanded'
    }

    if (this.selectedSideBar === SideBarViewMode.BOTTOM || this.transitionFrom === SideBarViewMode.BOTTOM) {
      return this.selectedSideBar === SideBarViewMode.OFF ? 'bcollapsed' : 'bexpanded'
    }

    if (this.selectedSideBar === SideBarViewMode.LEFT || this.transitionFrom === SideBarViewMode.LEFT) {
      return this.selectedSideBar === SideBarViewMode.OFF ? 'lcollapsed' : 'lexpanded'
    }

    return null
  }

  get animationParams() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.transitionFrom === SideBarViewMode.RIGHT) {
      return this.sideBarWidth
    }

    if (this.selectedSideBar === SideBarViewMode.BOTTOM || this.transitionFrom === SideBarViewMode.BOTTOM) {
      return this.sideBarHeight
    }

    if (this.selectedSideBar === SideBarViewMode.LEFT || this.transitionFrom === SideBarViewMode.LEFT) {
      return this.sideBarWidth
    }

    return null
  }

  get animatedSideBarWidth() {
    if (this.selectedSideBar === SideBarViewMode.BOTTOM || this.transitionFrom === SideBarViewMode.BOTTOM) {
      return this.sideBarWidth
    }
    return null
  }

  get animatedSideBarHeight() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.transitionFrom === SideBarViewMode.RIGHT) {
      return this.sideBarHeight
    }
    if (this.selectedSideBar === SideBarViewMode.LEFT || this.transitionFrom === SideBarViewMode.LEFT) {
      return this.sideBarHeight
    }
    return null
  }
}
