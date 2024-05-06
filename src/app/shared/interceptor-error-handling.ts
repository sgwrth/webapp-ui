import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { SetMyHttpError } from "../ngxs-store/http-error.actions";
import { Store } from "@ngxs/store";

@Injectable()
export class InterceptorErrorHandling implements HttpInterceptor {

  myHttpError$: Observable<any>

  constructor(private store: Store) {
    this.myHttpError$ = this.store.select(state => state.myHttpError.myHttpError)
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(err => this.handleErrors(err))
      )
  }
      
  handleErrors(err: HttpErrorResponse) {
    if (0 === err.status) {
      console.error('Client error:', err.error)
    } else {
      console.error(`Server error: ${err.status}: ${err.error}`)
    }
    this.store.dispatch(new SetMyHttpError(err.status))
    return throwError(() => new Error('Something just happened'))
  }

}