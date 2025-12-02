import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor() { }
    private readonly users = [
        { userId: '1', email: 'aman@test.com', password: 'password' },
    ];

    async validateUser(username: string, password: string): Promise<any> {
        const user = this.users.find(user => user.email === username && user.password === password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return {
            success: true,
            isAuthenticated: true,
            user: user
        };
    }
}
