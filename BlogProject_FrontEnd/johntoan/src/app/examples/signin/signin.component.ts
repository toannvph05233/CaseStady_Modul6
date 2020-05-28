import {Component, DoCheck, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
    userLoginForm: FormGroup;
    message: string;
    test : Date = new Date();
    focus;
    focus1;
    constructor(private userService: UserService,private router: Router) {

    }

    ngOnInit() {
        this.userLoginForm = new FormGroup({
            userName: new FormControl(),
            password: new FormControl()
        });
    }

    save() {
        this.userService.getMessage().subscribe(m => this.message = m);
        this.userService.login(this.userLoginForm.value.userName,this.userLoginForm.value.password);
    }
}
