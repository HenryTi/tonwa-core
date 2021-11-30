import { User } from "../tool";
export interface Login {
    showLogin(callback?: (user: User) => Promise<void>, withBack?: boolean): void;
    showLogout(callback?: () => Promise<void>): void;
    showChangePassword(): void;
    showUserQuit(): void;
}
