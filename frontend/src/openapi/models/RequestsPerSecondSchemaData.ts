/* tslint:disable */
/* eslint-disable */
/**
 * Unleash API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 4.19.0-beta.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { RequestsPerSecondSchemaDataResultInner } from './RequestsPerSecondSchemaDataResultInner';
import {
    RequestsPerSecondSchemaDataResultInnerFromJSON,
    RequestsPerSecondSchemaDataResultInnerFromJSONTyped,
    RequestsPerSecondSchemaDataResultInnerToJSON,
} from './RequestsPerSecondSchemaDataResultInner';

/**
 * 
 * @export
 * @interface RequestsPerSecondSchemaData
 */
export interface RequestsPerSecondSchemaData {
    /**
     * 
     * @type {string}
     * @memberof RequestsPerSecondSchemaData
     */
    resultType?: string;
    /**
     * An array of values per metric. Each one represents a line in the graph labeled by its metric name
     * @type {Array<RequestsPerSecondSchemaDataResultInner>}
     * @memberof RequestsPerSecondSchemaData
     */
    result?: Array<RequestsPerSecondSchemaDataResultInner>;
}

/**
 * Check if a given object implements the RequestsPerSecondSchemaData interface.
 */
export function instanceOfRequestsPerSecondSchemaData(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function RequestsPerSecondSchemaDataFromJSON(json: any): RequestsPerSecondSchemaData {
    return RequestsPerSecondSchemaDataFromJSONTyped(json, false);
}

export function RequestsPerSecondSchemaDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestsPerSecondSchemaData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'resultType': !exists(json, 'resultType') ? undefined : json['resultType'],
        'result': !exists(json, 'result') ? undefined : ((json['result'] as Array<any>).map(RequestsPerSecondSchemaDataResultInnerFromJSON)),
    };
}

export function RequestsPerSecondSchemaDataToJSON(value?: RequestsPerSecondSchemaData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'resultType': value.resultType,
        'result': value.result === undefined ? undefined : ((value.result as Array<any>).map(RequestsPerSecondSchemaDataResultInnerToJSON)),
    };
}

