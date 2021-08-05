import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ConfigContainer} from "../model/ConfigContainer";

@Injectable({
    providedIn: 'root'
})
export class ConfigDataService {

    baseUrl = environment.baseUrl;

    constructor(private httpClient: HttpClient) {
    }

    createConfig(configContainer: ConfigContainer): Observable<ConfigContainer> {
        return this.httpClient.post<ConfigContainer>(`${this.baseUrl}/configs`, configContainer);
    }

    updateConfig(configContainer: ConfigContainer): Observable<ConfigContainer> {
        return this.httpClient.put<ConfigContainer>(`${this.baseUrl}/configs/${configContainer.configId}`, configContainer);
    }

    deleteConfig(configContainer: ConfigContainer): Observable<ConfigContainer> {
        return this.httpClient.delete<ConfigContainer>(`${this.baseUrl}/configs/${configContainer.configId}`);
    }

    getConfigs(): Observable<ConfigContainer[]> {
        return this.httpClient.get<ConfigContainer[]>(`${this.baseUrl}/configs`);
    }

    getConfigById(id: string): Observable<ConfigContainer> {
        return this.httpClient.get<ConfigContainer>(`${this.baseUrl}/configs/${id}`);
    }
}
