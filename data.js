'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const taskbookConfigFileName = '.taskbook.json';
const taskbookArchiveFileName = '.taskbook/archive/archive.json';
const taskbookStorageFileName = '.taskbook/storage/storage.json';

const getPaths = () => {
    const homedir = os.homedir();
    const configFile = path.join(homedir, taskbookConfigFileName);
    const taskbookDirectory = readAsJson(configFile).taskbookDirectory.replace('~', homedir);

    const taskbookArchiveFile = path.join(taskbookDirectory, taskbookArchiveFileName);
    const taskbookStorageFile = path.join(taskbookDirectory, taskbookStorageFileName);

    return {
        archive: taskbookArchiveFile,
        storage: taskbookStorageFile
    };
};

const readAsJson = (filepath) => {
    return JSON.parse(fs.readFileSync(filepath));
};

const write = (filepath, data) => {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 4));
};

const readArchive = () => {
    const paths = getPaths();
    return readAsJson(paths.archive);
};

const trimArchive = () => {
    const paths = getPaths();
    write(paths.archive, {});
};

const readStorage = () => {
    const paths = getPaths();
    return readAsJson(paths.storage);
};

const writeStorage = (storage) => {
    const paths = getPaths();
    write(paths.storage, storage);
};

const normalizeStorage = () => {
    const storage = readStorage();
    let normalizedStorage = idNormalizer(storage);
    writeStorage(normalizedStorage);
};

const idNormalizer = (data) => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    const keys = Object.keys(dataCopy).sort((x, y) => Number(x) - Number(y));

    const normalized = {};

    keys.forEach((key, index) => {
        const id = index + 1;
        const value = dataCopy[key];

        value["_id"] = id;
        normalized["" + id] = value;
    });

    return normalized;
};

module.exports = {
    readArchive,
    trimArchive,
    readStorage,
    normalizeStorage,
    idNormalizer
};
