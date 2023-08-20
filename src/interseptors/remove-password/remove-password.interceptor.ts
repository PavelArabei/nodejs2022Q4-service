import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { User } from "@app/user/entities/user.entity";


const changeUserDateType = (user: User): User => {
  const newUser = new User();
  return Object.assign(newUser, { ...user, createdAt: +user.createdAt, updatedAt: +user.updatedAt });
};
const isUser = (user) => user && typeof user === "object" && "password" in user;

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const removePassword = (user) => {
      if (isUser(user)) {
        const newUser: User = changeUserDateType(user);
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
