import { Component } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { AnimationEvent } from '@angular/animations'

export enum SideBarViewMode {
  OFF = 'off',
  RIGHT = 'right',
  BOTTOM = 'bottom',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('expand', [
      state('rcollapsed', style({ width: '0' }), {
        params: { size: '0px' },
      }),
      state('rexpanded', style({ width: '{{size}}' }), {
        params: { size: '0px' },
      }),
      state('bcollapsed', style({ height: '0' }), {
        params: { size: '0px' },
      }),
      state('bexpanded', style({ height: '{{size}}' }), {
        params: { size: '0px' },
      }),
      transition('* => bexpanded', [style({ height: '0' }), animate('0.3s')]),
      transition('* => rexpanded', [style({ width: '0' }), animate('0.3s')]),
      transition('* <=> *', animate('0.3s')),
    ]),
  ],
})
export class AppComponent {
  selectedSideBar: SideBarViewMode = SideBarViewMode.OFF
  isRightSideBar = false
  expandedRight = false
  expandedBottom = false
  nextSideBarViewMode: SideBarViewMode

  panelSize = 300

  switch() {
    switch (this.selectedSideBar) {
      case SideBarViewMode.OFF:
        this.selectedSideBar = SideBarViewMode.RIGHT
        this.expandedRight = false
        this.expandedBottom = false
        break
      case SideBarViewMode.RIGHT:
        this.nextSideBarViewMode = SideBarViewMode.BOTTOM
        this.selectedSideBar = SideBarViewMode.OFF
        this.expandedRight = true
        this.expandedBottom = false
        break
      default:
        this.selectedSideBar = SideBarViewMode.OFF
        this.expandedRight = false
        this.expandedBottom = true
        break
    }
  }

  get sideBarHeight() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.isRightSideBar) {
      return '100%'
    }
    return `${this.panelSize}px`
  }

  get sideBarWidth() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.isRightSideBar) {
      return `${this.panelSize}px`
    }
    return '100%'
  }

  get sideBarTop() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.isRightSideBar) {
      return `${this.panelSize}px`
    }
    return 'auto'
  }

  get sideBarBottom() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.isRightSideBar) {
      return '0'
    }
    return '0'
  }

  get sideBarRight() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.isRightSideBar) {
      return '0'
    }
    return 'auto'
  }

  get sideBarLeft() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.isRightSideBar) {
      return 'auto'
    }
    return '0'
  }

  onAnimationStart(event: AnimationEvent) {
    this.isRightSideBar = event.toState === 'rexpanded' || event.toState === 'rcollapsed'
  }

  onAnimationDone(event: AnimationEvent) {
    this.isRightSideBar = false
    this.expandedRight = event.toState === 'rexpanded'
    this.expandedBottom = event.toState === 'bexpanded'

    if (
      !event.toState &&
      this.nextSideBarViewMode &&
      this.nextSideBarViewMode !== SideBarViewMode.OFF
    ) {
      this.selectedSideBar = this.nextSideBarViewMode
      this.nextSideBarViewMode = SideBarViewMode.OFF
    }
  }

  get currentAnimation() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.expandedRight) {
      return this.selectedSideBar === SideBarViewMode.OFF ? 'rcollapsed' : 'rexpanded'
    }

    if (this.selectedSideBar === SideBarViewMode.BOTTOM || this.expandedBottom) {
      return this.selectedSideBar === SideBarViewMode.OFF ? 'bcollapsed' : 'bexpanded'
    }

    return null
  }

  get animationParams() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.expandedRight) {
      return this.sideBarWidth
    }

    if (this.selectedSideBar === SideBarViewMode.BOTTOM || this.expandedBottom) {
      return this.sideBarHeight
    }

    return null
  }

  get animatedSideBarWidth() {
    if (this.selectedSideBar === SideBarViewMode.BOTTOM || this.expandedBottom) {
      return this.sideBarWidth
    }
    return null
  }

  get animatedSideBarHeight() {
    if (this.selectedSideBar === SideBarViewMode.RIGHT || this.expandedRight) {
      return this.sideBarHeight
    }
    return null
  }
}
