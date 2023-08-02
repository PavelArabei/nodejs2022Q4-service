import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isUser = (user) => user && typeof user === "object" && "password" in user;
    const removePassword = (user) => {
      if (isUser(user)) {
        const newUser = { ...user };
        delete newUser.password;
        return newUser;
      }
      return user;

    };

    return next.handle().pipe(
      map((user) => {
        if (user instanceof Array && !!user.length) {
          user = user.map(user => removePassword(user));
        }
        user = removePassword(user);
        return user;
      })
    );
  }
}
