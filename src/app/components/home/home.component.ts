import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ConfigContainer} from "../../model/ConfigContainer";
import {ConfigDataService} from "../../services/config-data.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    configContainers: ConfigContainer[] = [];
    filteredConfigContainer: ConfigContainer[] = [];

    searchValue = '';
    isLoading = true;
    isError = false;

    constructor(private router: Router,
                private configDataService: ConfigDataService) {
    }

    ngOnInit(): void {
        this.initConfigs();
    }

    initConfigs() {
        this.configDataService
            .getConfigs()
            .subscribe(data => {
                this.configContainers = data;
                this.filteredConfigContainer = data;
                this.isLoading = false;
            }, error => {
                this.isLoading = false;
                this.isError = true;
            });
    }

    filterConfigs() {
        console.log(this.searchValue)
        if (!this.searchValue) {
            this.filteredConfigContainer = this.configContainers;
            return;
        }
        this.filteredConfigContainer = this.configContainers.filter(configContainer => {
                return (configContainer.deviceName?.toLowerCase()?.includes(this.searchValue.toLowerCase())
                    || configContainer.deviceBrand?.toLowerCase()?.includes(this.searchValue.toLowerCase())
                    || configContainer.configId?.toLowerCase()?.includes(this.searchValue.toLowerCase()));
            }
        );
    }

    routeTo(path: string) {
        this.router.navigate([`/${path}`]);
    }

    deleteConfigById(configId: string) {
        this.isLoading = true;
        this.configDataService.deleteConfig(configId)
            .subscribe(() => {
                console.log('foo')
                this.initConfigs();
            }, error => {
                this.initConfigs();
            })
    }
}
