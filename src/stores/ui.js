import { observable, autorun } from 'mobx';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/lib/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

export default class UIStore {

  mui = {};

  @observable appNavIsOpen = true;
  @observable appNavIsDocked = false;
  @observable appBarMenuAccountIsOpen = false;
  @observable layoutIsShifted = true;

  @observable breakpoints = {
    xs: '(max-width: 767px)',
    su: '(min-width: 768px)',
    sm: '(min-width: 768px) and (max-width: 991px)',
    md: '(min-width: 992px) and (max-width: 1199px)',
    mu: '(min-width: 992px)',
    lg: '(min-width: 1200px)',
  };

  constructor(ui) {
    Object.assign(this, ui);

    // open and close the nav automatically
    // when the "xs" breakpoint changes
    autorun(() => this.breakpoints.xs
      ? this.toggleAppNav('close')
      : this.toggleAppNav('open')
    );

    // dock/undock the nav automatically
    // when the "su" breakpoint changes
    autorun(() => this.breakpoints.su
      ? this.dockAppNav('on')
      : this.dockAppNav('off')
    );

    // shift the layout on "su" breakpoint when appbar is open
    autorun(() => this.breakpoints.su && this.appNavIsOpen
      ? this.shiftLayout('yes')
      : this.shiftLayout('no')
    );
  }

  getMui() {
    const mui = global.CLIENT ? { userAgent: navigator.userAgent } : {};
    Object.assign(mui, lightBaseTheme);
    return getMuiTheme(this.mui, mui);
  }

  injectTapEv() {
    // Material-UI components use react-tap-event-plugin to listen for touch events
    // This dependency is temporary and will go away once react v1.0
    injectTapEventPlugin();
  }

  toggleAppNav(flag = null) {
    if (flag === 'open') this.appNavIsOpen = true;
    if (flag === 'close') this.appNavIsOpen = false;
    if (!flag) this.appNavIsOpen = !this.appNavIsOpen;
  }

  dockAppNav(flag = null) {
    if (flag === 'on') this.appNavIsDocked = true;
    if (flag === 'off') this.appNavIsDocked = false;
  }

  shiftLayout(flag = null) {
    if (flag === 'yes') this.layoutIsShifted = true;
    if (flag === 'no') this.layoutIsShifted = false;
  }

  toggleAppBarMenuAccount(flag = null) {
    if (flag === 'open') this.appBarMenuAccountIsOpen = true;
    if (flag === 'close') this.appBarMenuAccountIsOpen = false;
    if (!flag) this.appBarMenuAccountIsOpen = !this.appBarMenuAccountIsOpen;
  }
}