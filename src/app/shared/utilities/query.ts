import { HttpParams } from '@angular/common/http';

export const setRequestParams = (query = {}): HttpParams | {} => {
    return new HttpParams().appendAll(query);
};
