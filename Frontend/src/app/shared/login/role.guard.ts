import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/customer/user.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const userService=inject(UserService);
  const location=inject(Location);
  const helper = new JwtHelperService();
  const s=localStorage.getItem('token');
  const decodedToken = helper.decodeToken(s!);
  userService.setRole(decodedToken.role.authority);
  if(userService.getRole()===route.data['role']){
    return true;
  }
  console.log(route.data['role']);
  alert("Not Accessable");
  console.log('false');
  location.back();
  return false;
};
