import { AuthService } from '../services/auth.service';
import { Routing } from '../core/routing.service';


export class PaymentGuard {
    constructor() {
      this._authService = new AuthService();
      this._routing = new Routing(); 
    }
    
    canActivate() {
      if (!this._authService.isSubscribed) {
        console.log('You don"t have active subscription');
        this._routing.navigate('/');
        return false;
      }
  
      return true;
    }
  }