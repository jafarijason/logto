import type { Resource, CreateResource, Scope } from '@logto/schemas';
import { conditionalString } from '@silverhand/essentials';
import { type Options } from 'ky';

import { generateResourceIndicator, generateResourceName } from '#src/utils.js';

import { authedAdminApi } from './api.js';

export const createResource = async (name?: string, indicator?: string) =>
  authedAdminApi
    .post('resources', {
      json: {
        name: name ?? generateResourceName(),
        indicator: indicator ?? generateResourceIndicator(),
      },
    })
    .json<Resource>();

export const getResources = async (query?: string) =>
  authedAdminApi.get(`resources${conditionalString(query && `?${query}`)}`).json<
    Array<
      Resource & {
        scopes?: Scope[];
      }
    >
  >();

export const getResource = async (resourceId: string, options?: Options) =>
  authedAdminApi.get(`resources/${resourceId}`, options).json<Resource>();

export const updateResource = async (
  resourceId: string,
  payload: Partial<Omit<CreateResource, 'id'>>
) =>
  authedAdminApi
    .patch(`resources/${resourceId}`, {
      json: {
        ...payload,
      },
    })
    .json<Resource>();

export const deleteResource = async (resourceId: string) =>
  authedAdminApi.delete(`resources/${resourceId}`);

export const setDefaultResource = async (resourceId: string, isDefault = true) =>
  authedAdminApi
    .patch(`resources/${resourceId}/is-default`, { json: { isDefault } })
    .json<Resource>();
