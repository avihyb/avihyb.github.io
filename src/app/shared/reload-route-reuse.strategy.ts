import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from '@angular/router';

/** Default reuse, except that one navigation can be told to rebuild its target component. */
@Injectable({ providedIn: 'root' })
export class ReloadRouteReuseStrategy extends BaseRouteReuseStrategy {
  /** Set for a single navigation; the caller clears it when that navigation settles. */
  forceReload = false;

  override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return this.forceReload ? false : super.shouldReuseRoute(future, curr);
  }
}
