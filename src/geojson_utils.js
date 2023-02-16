// Remove the editing property hack
export function geojsonToSave(gjscheme) {
    console.log(gjscheme)
    const copy = JSON.parse(JSON.stringify(gjscheme));
    for (let feature of copy.features) {
        delete feature.properties.editing;
    }
    return copy;
}
