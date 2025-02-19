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
import type { RequestsPerSecondSchema } from './RequestsPerSecondSchema';
import {
    RequestsPerSecondSchemaFromJSON,
    RequestsPerSecondSchemaFromJSONTyped,
    RequestsPerSecondSchemaToJSON,
} from './RequestsPerSecondSchema';

/**
 * 
 * @export
 * @interface RequestsPerSecondSegmentedSchema
 */
export interface RequestsPerSecondSegmentedSchema {
    /**
     * 
     * @type {RequestsPerSecondSchema}
     * @memberof RequestsPerSecondSegmentedSchema
     */
    clientMetrics?: RequestsPerSecondSchema;
    /**
     * 
     * @type {RequestsPerSecondSchema}
     * @memberof RequestsPerSecondSegmentedSchema
     */
    adminMetrics?: RequestsPerSecondSchema;
}

/**
 * Check if a given object implements the RequestsPerSecondSegmentedSchema interface.
 */
export function instanceOfRequestsPerSecondSegmentedSchema(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function RequestsPerSecondSegmentedSchemaFromJSON(json: any): RequestsPerSecondSegmentedSchema {
    return RequestsPerSecondSegmentedSchemaFromJSONTyped(json, false);
}

export function RequestsPerSecondSegmentedSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestsPerSecondSegmentedSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'clientMetrics': !exists(json, 'clientMetrics') ? undefined : RequestsPerSecondSchemaFromJSON(json['clientMetrics']),
        'adminMetrics': !exists(json, 'adminMetrics') ? undefined : RequestsPerSecondSchemaFromJSON(json['adminMetrics']),
    };
}

export function RequestsPerSecondSegmentedSchemaToJSON(value?: RequestsPerSecondSegmentedSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'clientMetrics': RequestsPerSecondSchemaToJSON(value.clientMetrics),
        'adminMetrics': RequestsPerSecondSchemaToJSON(value.adminMetrics),
    };
}

