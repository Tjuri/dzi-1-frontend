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
        if (!this.searchValue) {
            this.filteredConfigContainer = this.configContainers;
            return;
        }
        this.filteredConfigContainer = this.configContainers.filter(configContainer => {
                return (configContainer.deviceName?.includes(this.searchValue)
                    || configContainer.deviceBrand?.includes(this.searchValue)
                    || configContainer.configId?.includes(this.searchValue));
            }
        );
    }

    routeTo(path: string) {
        this.router.navigate([`/${path}`]);
    }

    deleteConfigById(configId: string) {
        this.configDataService.deleteConfig(configId)
            .subscribe(() => {
                this.initConfigs();
            })
    }
}
