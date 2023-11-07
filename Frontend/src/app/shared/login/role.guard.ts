import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from 'src/app/customer/user.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const userService=inject(UserService);
  userService.getUser();
  const location=inject(Location);
  console.log(route.data['role']);
  console.log(userService.getRole())

  if(userService.getRole()===route.data['role']){
    return true;
  }
  console.log(route.data['role']);
  alert("Not Accessable");
  console.log('false');
  location.back();
  return false;
};
