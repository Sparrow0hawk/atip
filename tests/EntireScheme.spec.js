import { describe, expect, it, test } from 'vitest';
import { cleanup, render, } from '@testing-library/svelte'
import { geojsonToSave } from '../src/geojson_utils.js';
import { test_scheme } from './test_data';

describe('EntireScheme', () => {

    console.log(JSON.parse(test_scheme).features[0].properties.name)

    let test_json = JSON.parse(test_scheme)

    test_json.features[0].properties.editing = true;

    test("test geojson to save", () => {
        let out = geojsonToSave(test_json);
        expect(out.features[0].properties.editing).toBeUndefined;
    })

})
