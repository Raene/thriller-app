import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      clientID: configService.get('CLIENT_ID'),
      clientSecret: configService.get('CLIENT_SECRET'),
      callbackURL: 'http://localhost:3001/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any) {
   
    const user = await this.usersService.getUser({
        email: profile.emails[0].value
    })

    if(user){
      console.log("returning null", user)
        return user;
    }
    
    const password = Math.random().toString(36).substring(2); // Random alphanumeric password

    // Hash the password
  
    let newUser = await this.usersService.createUser({
        email: profile.emails[0].value,
        password
    })

    console.log("newt",newUser)
    return newUser || null;
  }
}